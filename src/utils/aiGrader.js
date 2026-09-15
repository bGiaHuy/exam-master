/**
 * Multi-provider AI Grader for Essay Answers
 * Supports DeepSeek API (sk-...) and Google Gemini API (AIzaSy...)
 * Includes intelligent local heuristic fallback.
 */
import { detectProvider } from '../data/apiConfig';

export async function gradeEssayAnswer({
  question,
  userAnswer,
  apiKey = ''
}) {
  if (!userAnswer || userAnswer.trim().length < 5) {
    return {
      score: 0,
      strengths: "Chưa có nội dung trả lời đủ ý.",
      weaknesses: "Câu trả lời quá ngắn hoặc để trống.",
      feedback: "Hãy trình bày tối thiểu một vài câu giải thích suy nghĩ của bạn về câu hỏi này để hệ thống và AI có thể chấm điểm nhé.",
      modelAnswer: question.explanation || question.options[question.correctAnswer]
    };
  }

  const key = apiKey && apiKey.trim().length > 8 ? apiKey.trim() : '';
  const provider = detectProvider(key);

  if (key) {
    try {
      if (provider === 'deepseek') {
        return await callDeepSeekAPI({ question, userAnswer, apiKey: key });
      } else if (provider === 'gemini') {
        return await callGeminiAPI({ question, userAnswer, apiKey: key });
      }
    } catch (err) {
      console.warn(`Gọi API ${provider} gặp trục trặc, sử dụng bộ chấm từ khóa dự phòng:`, err);
      const fallbackResult = localHeuristicGrading(question, userAnswer);
      fallbackResult.notice = `(Lưu ý: Gọi AI ${provider} báo lỗi: ${err.message}. Hệ thống chuyển sang chấm tự động nội bộ).`;
      return fallbackResult;
    }
  }

  // Local fallback
  const fallbackResult = localHeuristicGrading(question, userAnswer);
  fallbackResult.notice = "Chấm bằng bộ đánh giá từ khóa thông minh nội bộ.";
  return fallbackResult;
}

async function callDeepSeekAPI({ question, userAnswer, apiKey }) {
  const endpoint = "https://api.deepseek.com/chat/completions";

  const systemPrompt = `Bạn là một giảng viên đại học chuyên ngành Công nghệ Thông tin tận tâm và giàu kinh nghiệm.
Học viên đang ôn tập lại một câu hỏi trắc nghiệm đã làm sai, bằng cách viết câu trả lời TỰ LUẬN để hiểu sâu bản chất vấn đề.

Nhiệm vụ: Chấm bài công tâm, ngắn gọn, sư phạm và trả về ĐÚNG 1 ĐỐI TƯỢNG JSON thuần túy (không bọc code block, không thêm văn bản ngoài):
{
  "score": <số thực từ 0.0 đến 10.0>,
  "strengths": "<ý chính, thuật ngữ học viên đã hiểu đúng>",
  "weaknesses": "<ý còn thiếu hoặc nhầm lẫn>",
  "feedback": "<lời động viên và hướng dẫn sư phạm dễ hiểu>",
  "modelAnswer": "<lời giải mẫu chuẩn xác, súc tích>",
  "distractorAnalysis": "<phân tích tại sao các phương án trắc nghiệm khác lại gây bẫy nhầm lẫn>",
  "mnemonicTip": "<mẹo ghi nhớ nhanh, ví dụ đời thường để nhớ sâu kiến thức này>"
}`;

  const userPrompt = `
- Đề bài: ${question.questionText}
- Các phương án:
  ${Object.entries(question.options || {}).map(([k, v]) => `  ${k}. ${v}`).join('\n')}
- Đáp án đúng trắc nghiệm: [${question.correctAnswer}] ${question.options[question.correctAnswer] || ''}
- Lời giải thích chuẩn: ${question.explanation || 'Không có'}

BÀI LÀM TỰ LUẬN CỦA HỌC VIÊN:
"""
${userAnswer}
"""`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`DeepSeek API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const rawText = data.choices?.[0]?.message?.content || '{}';
  const cleanJson = rawText.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
  const parsed = JSON.parse(cleanJson);

  return {
    score: typeof parsed.score === 'number' ? Math.min(10, Math.max(0, parsed.score)) : 7.5,
    strengths: parsed.strengths || "Đã nêu được ý cơ bản.",
    weaknesses: parsed.weaknesses || "Cần bổ sung thêm ví dụ cụ thể.",
    feedback: parsed.feedback || "Bài làm có cố gắng.",
    modelAnswer: parsed.modelAnswer || question.explanation,
    distractorAnalysis: parsed.distractorAnalysis || generateLocalDistractorAnalysis(question),
    mnemonicTip: parsed.mnemonicTip || generateLocalMnemonicTip(question)
  };
}

async function callGeminiAPI({ question, userAnswer, apiKey }) {
  const model = "gemini-1.5-flash";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const prompt = `
Bạn là giảng viên đại học CNTT kỳ cựu. Hãy chấm bài tự luận ôn tập câu sai của học viên.
- Đề bài: ${question.questionText}
- Các phương án:
  ${Object.entries(question.options || {}).map(([k, v]) => `  ${k}. ${v}`).join('\n')}
- Đáp án đúng: [${question.correctAnswer}] ${question.options[question.correctAnswer] || ''}
- Giải thích: ${question.explanation || 'Không có'}
- Bài làm của học viên: "${userAnswer}"

Trả về duy nhất JSON:
{
  "score": <số thực 0.0-10.0>,
  "strengths": "<ý đúng>",
  "weaknesses": "<ý thiếu/sai>",
  "feedback": "<nhận xét sư phạm>",
  "modelAnswer": "<lời giải mẫu ngắn gọn>",
  "distractorAnalysis": "<phân tích tại sao các phương án khác lại gây bẫy nhầm lẫn>",
  "mnemonicTip": "<mẹo nhớ nhanh, ví dụ đời thường để nhớ sâu>"
}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2, responseMimeType: "application/json" }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Mã lỗi HTTP ${response.status}`);
  }

  const data = await response.json();
  const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
  const cleanJson = (textContent || '{}').replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
  const parsed = JSON.parse(cleanJson);

  return {
    score: typeof parsed.score === 'number' ? Math.min(10, Math.max(0, parsed.score)) : 7.5,
    strengths: parsed.strengths || "Đã nắm được một số ý cơ bản.",
    weaknesses: parsed.weaknesses || "Cần bổ sung thêm kiến thức.",
    feedback: parsed.feedback || "Bài làm khá tốt.",
    modelAnswer: parsed.modelAnswer || question.explanation,
    distractorAnalysis: parsed.distractorAnalysis || generateLocalDistractorAnalysis(question),
    mnemonicTip: parsed.mnemonicTip || generateLocalMnemonicTip(question)
  };
}

function generateLocalDistractorAnalysis(question) {
  const incorrectOptions = Object.entries(question.options || {})
    .filter(([k]) => k !== question.correctAnswer);
  
  if (incorrectOptions.length === 0) return "Không có phương án gây nhiễu.";

  const items = incorrectOptions.map(([k, v]) => 
    `- **Phương án [${k}]** ("${v}"): Thường là bẫy đánh vào việc nhớ nhầm khái niệm tương tự hoặc đảo ngược quan hệ logic (nguyên nhân - kết quả).`
  ).join('\n');

  return `🎯 **Bẫy trong câu hỏi này:**\n${items}\n\n👉 *Điểm then chốt để không bị lừa:* Hãy chú ý từ khóa cốt lõi của đáp án **[${question.correctAnswer}]** để loại trừ ngay các phát biểu ngụy tạo.`;
}

function generateLocalMnemonicTip(question) {
  const subj = (question.subject || '').toUpperCase();
  const correctText = question.options?.[question.correctAnswer] || '';

  if (subj.includes('CEA') || question.questionText?.toLowerCase().includes('von neumann') || question.questionText?.toLowerCase().includes('cpu')) {
    return `💡 **Mẹo liên tưởng đời thường (Dành cho bạn):**\n` +
      `Hãy tưởng tượng CPU như "Người đầu bếp trưởng", Bộ nhớ RAM như "Chiếc thớt chế biến", và Ổ cứng như "Nhà kho dự trữ". ` +
      `Khi chế biến món ăn, đầu bếp chỉ lấy nguyên liệu ra thớt (RAM) để làm việc thật nhanh, sau khi xong mới cất lại kho. Nhớ nguyên tắc: *Lệnh và dữ liệu cùng nằm chung trên thớt để nấu liên tục!*`;
  } else if (subj.includes('DBI') || question.questionText?.toLowerCase().includes('sql') || question.questionText?.toLowerCase().includes('khóa')) {
    return `💡 **Mẹo liên tưởng đời thường (Dành cho bạn):**\n` +
      `Hãy hình dung Căn cước công dân (CCCD) chính là "Khóa chính (Primary Key)" - mỗi người chỉ có duy nhất 1 số và không bao giờ trùng lặp hay để trống! Mọi giấy tờ khác tham chiếu đến CCCD chính là "Khóa ngoại".`;
  } else {
    return `💡 **Bí quyết nhớ lâu:**\n` +
      `Gắn khái niệm của đáp án **[${question.correctAnswer}]** với từ khóa: *"${correctText.slice(0, 40)}..."*. Hãy nhẩm lại từ khóa này 2 lần cùng ngữ cảnh thực tế!`;
  }
}

function localHeuristicGrading(question, userAnswer) {
  const correctOptionText = question.options[question.correctAnswer] || '';
  const explanation = question.explanation || '';
  const referenceText = `${correctOptionText} ${explanation}`.toLowerCase();

  const stopWords = new Set(['của', 'và', 'các', 'những', 'trong', 'được', 'cho', 'với', 'khi', 'một', 'này', 'đó', 'thì', 'là', 'để']);
  const words = referenceText
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 3 && !stopWords.has(w));

  const uniqueKeywords = Array.from(new Set(words));
  const userLower = userAnswer.toLowerCase();

  let matchedKeywords = 0;
  uniqueKeywords.forEach(kw => {
    if (userLower.includes(kw)) matchedKeywords++;
  });

  const coverageRatio = uniqueKeywords.length > 0 ? (matchedKeywords / Math.min(uniqueKeywords.length, 12)) : 0.5;
  const lengthBonus = Math.min(userAnswer.trim().split(/\s+/).length / 30, 1.0);

  let rawScore = (coverageRatio * 6.5) + (lengthBonus * 2.5) + 1.0;
  rawScore = Math.round(Math.min(9.8, Math.max(2.5, rawScore)) * 10) / 10;

  let strengths = "Học viên đã nêu được một số thuật ngữ và khái niệm liên quan đến nội dung câu hỏi.";
  let weaknesses = "Chưa làm nổi bật được toàn bộ các yếu tố then chốt như trong đáp án chuẩn.";
  let feedback = "Bài giải thích khá tốt! Đọc thêm đáp án chuẩn bên dưới để củng cố các định nghĩa quan trọng nhé.";

  if (rawScore >= 8.0) {
    strengths = "Hiểu rất sát bản chất vấn đề, diễn đạt mạch lạc và bao quát được các ý chính của đáp án.";
    weaknesses = "Có thể bổ sung thêm thuật ngữ kỹ thuật chuyên ngành để câu trả lời hoàn hảo hơn.";
    feedback = "Rất tuyệt vời! Bạn đã nắm chắc kiến thức của câu hỏi này rồi.";
  } else if (rawScore < 5.5) {
    strengths = "Có nỗ lực diễn đạt theo cách hiểu cá nhân.";
    weaknesses = "Còn thiếu nhiều từ khóa cốt lõi và nội dung chưa sát với kiến thức trọng tâm.";
    feedback = "Bạn hãy đọc kỹ lời giải thích chi tiết bên dưới, sau đó viết lại để khắc sâu kiến thức nhé!";
  }

  return {
    score: rawScore,
    strengths,
    weaknesses,
    feedback,
    modelAnswer: explanation || correctOptionText,
    distractorAnalysis: generateLocalDistractorAnalysis(question),
    mnemonicTip: generateLocalMnemonicTip(question)
  };
}

export async function askAIFollowUp({ question, userQuery, apiKey = '' }) {
  if (!userQuery || userQuery.trim().length === 0) {
    throw new Error('Vui lòng nhập câu hỏi của bạn.');
  }

  const key = apiKey && apiKey.trim().length > 8 ? apiKey.trim() : '';
  const provider = detectProvider(key);

  const prompt = `Câu hỏi trắc nghiệm gốc: "${question.questionText}"
Đáp án đúng là [${question.correctAnswer}]: "${question.options[question.correctAnswer]}"
Giải thích chi tiết: "${question.explanation}"

Học viên đặt câu hỏi thắc mắc: "${userQuery}"

Nhiệm vụ của bạn: Hãy trả lời ân cần, sư phạm, súc tích và dễ hiểu nhất, tập trung tháo gỡ đúng thắc mắc của học viên.`;

  if (key) {
    try {
      if (provider === 'deepseek') {
        const resp = await fetch("https://api.deepseek.com/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${key}`
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
              { role: "system", content: "Bạn là giảng viên đại học CNTT giải thích cho học viên dễ hiểu, súc tích." },
              { role: "user", content: prompt }
            ],
            temperature: 0.3
          })
        });
        const data = await resp.json();
        return data.choices?.[0]?.message?.content || "Không nhận được phản hồi từ DeepSeek.";
      } else if (provider === 'gemini') {
        const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.3 }
          })
        });
        const data = await resp.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "Không nhận được phản hồi từ Gemini.";
      }
    } catch (err) {
      console.warn("Lỗi khi gọi API hỏi đáp AI:", err);
    }
  }

  // Local heuristic fallback
  return `💡 **Giải đáp cốt lõi:**\n\nĐối với câu hỏi này, điểm mấu chốt là đáp án **[${question.correctAnswer}]**: *${question.options[question.correctAnswer]}*.\n\n**Lời giải:** ${question.explanation}\n\n*(Cài đặt API Key DeepSeek/Gemini để trò chuyện hỏi đáp sâu hơn cùng AI)*`;
}

