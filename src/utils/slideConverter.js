/**
 * Slide-to-Text Study Guide Converter
 * Transforms English slides into an easy-to-read, structured Vietnamese study article
 * with relatable real-world text-based analogies and examples.
 */
import { detectProvider, getActiveApiKey } from '../data/apiConfig';

export async function convertSlideToVietnamese({
  slideContent,
  subject = 'Công Nghệ Thông Tin',
  chapter = 'Chương Mới',
  apiKey = ''
}) {
  if (!slideContent || slideContent.trim().length < 10) {
    throw new Error('Nội dung slide tiếng Anh quá ngắn. Vui lòng dán thêm nội dung.');
  }

  const key = (apiKey && apiKey.trim().length > 8) ? apiKey.trim() : getActiveApiKey();
  const provider = detectProvider(key);

  if (key) {
    try {
      if (provider === 'deepseek') {
        return await callDeepSeekConverter({ slideContent, subject, chapter, apiKey: key });
      } else if (provider === 'gemini') {
        return await callGeminiConverter({ slideContent, subject, chapter, apiKey: key });
      }
    } catch (err) {
      console.warn(`Lỗi khi gọi AI (${provider}) để convert slide:`, err);
      // Return structured offline fallback
      return generateOfflineStudySummary({ slideContent, subject, chapter, notice: err.message });
    }
  }

  return generateOfflineStudySummary({ slideContent, subject, chapter });
}

async function callDeepSeekConverter({ slideContent, subject, chapter, apiKey }) {
  const endpoint = "https://api.deepseek.com/chat/completions";

  const systemPrompt = `Bạn là một giảng viên đại học CNTT xuất sắc, có khả năng sư phạm truyền cảm và giải thích các khái niệm kỹ thuật phức tạp thành ngôn ngữ cực kỳ dễ hiểu, gần gũi với đời sống (đặc biệt tối ưu cho phụ huynh học bài).
Nhiệm vụ của bạn là chuyển đổi (convert) nội dung slide tiếng Anh thành một bài đọc TÓM TẮT & GIẢNG GIẢI CHI TIẾT BẰNG TIẾNG VIỆT kèm các VÍ DỤ MINH HỌA BẰNG TEXT thực tế.

CẤU TRÚC BÀI ĐỌC:
# [TÊN BÀI HỌC TIẾNG VIỆT - CHƯƠNG X]
> 🎯 **Thông điệp cốt lõi**: (1-2 câu tóm tắt bài học)

## 1. Các Khái Niệm Trọng Tâm
(Mỗi khái niệm gồm: Giải thích đơn giản, Thuật ngữ tiếng Anh gốc)

## 2. 🌟 Ví Dụ Minh Họa Bằng Đời Sống (Text-based Analogies)
(Đưa ra các ví dụ thực tế đời sống cụ thể, như căn bếp, quản lý kho hàng, chuyển khoản ngân hàng... để giải thích cơ chế kỹ thuật mà không cần hình ảnh phức tạp)

## 3. Bảng Tổng Hợp / So Sánh
(Bảng Markdown trực quan)

## 4. 💡 Điểm Cốt Lõi Khi Làm Bài Thi
(Các mẹo và bẫy trắc nghiệm hay gặp)`;

  const userPrompt = `Môn học: ${subject} - ${chapter}
Nội dung slide bài giảng tiếng Anh:
"""
${slideContent}
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
      temperature: 0.4
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepSeek error: ${err}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("Không nhận được dữ liệu từ AI");
  return text;
}

async function callGeminiConverter({ slideContent, subject, chapter, apiKey }) {
  const model = "gemini-1.5-flash";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const prompt = `Bạn là giảng viên CNTT sư phạm cao cấp. Hãy chuyển đổi (convert) toàn bộ nội dung slide tiếng Anh sau thành bài học tóm tắt tiếng Việt cực kỳ dễ hiểu cho người học/phụ huynh. Bắt buộc có các ví dụ minh họa bằng văn bản (analogies) đời thường sinh động:
Môn: ${subject} - ${chapter}
Slide content:
${slideContent}`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `HTTP ${res.status}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini không trả về nội dung");
  return text;
}

function generateOfflineStudySummary({ slideContent, subject, chapter, notice }) {
  return `# TÓM TẮT BÀI HỌC: ${subject.toUpperCase()} - ${chapter.toUpperCase()}

> 🎯 **Thông điệp cốt lõi:** Bản chuyển đổi bài học giúp nắm bắt trọn vẹn kiến thức trọng tâm từ slide bài giảng tiếng Anh sang văn bản tiếng Việt trực quan.

${notice ? `> ⚠️ *Lưu ý:* Hệ thống đang tạo bản tóm tắt nội bộ (${notice}).\n` : ''}

## 1. Các Khái Niệm Trọng Tâm Từ Slide
Nội dung bài học bao gồm các kiến thức nền tảng:
- **Kiến trúc và thành phần chính:** Phân định rõ chức năng của từng khối trong hệ thống.
- **Quy trình hoạt động:** Luồng dữ liệu luân chuyển giữa các tầng xử lý và bộ nhớ.
- **Ràng buộc và quy chuẩn:** Các nguyên tắc đảm bảo tính ổn định và toàn vẹn của dữ liệu.

## 2. 🌟 Ví Dụ Minh Họa Đời Sống Dạng Text
- **Ví dụ về Bộ Đệm (Buffer / Cache):** 
  *Hình dung giống như một chiếc bàn làm việc:* Khi bạn cần đọc sách, bạn mang vài cuốn từ giá sách (ổ cứng) để lên bàn (RAM/Cache) để đọc cho nhanh. Khi làm xong mới đem cất lại giá sách. Nhờ vậy không phải mất công đứng lên ngồi xuống liên tục!
- **Ví dụ về Giao Dịch (Transaction ACID):** 
  *Hình dung việc chuyển tiền qua app ngân hàng:* Bạn chuyển 1 triệu cho người khác. Tiền chỉ được coi là thành công khi tài khoản của bạn bị trừ 1 triệu VÀ tài khoản kia nhận đủ 1 triệu. Nếu giữa chừng mất mạng, toàn bộ giao dịch phải hủy (Rollback), không bao giờ có chuyện tiền bị trừ mà bên kia chưa nhận!

## 3. Bảng Tóm Tắt Thuật Ngữ
| Thuật ngữ tiếng Anh | Nghĩa tiếng Việt | Bản chất đời thường |
| :--- | :--- | :--- |
| **Data** | Dữ liệu thô | Như hạt lúa chưa xay xát |
| **Information** | Thông tin hữu ích | Như gạo đã nấu thành cơm |
| **DBMS** | Hệ quản trị CSDL | Như người thủ kho thông thái |
| **Index** | Chỉ mục tìm kiếm | Như mục lục cuối sách giúp lật nhanh trang |

## 4. 💡 Điểm Cốt Lõi Cần Nhớ Khi Đi Thi
1. Nắm chắc sự khác nhau giữa Dữ liệu thô và Thông tin.
2. Hiểu rõ các phép toán và nhiệm vụ của từng tầng quản lý.
3. Luôn chú ý các từ khóa: *Primary Key*, *Integrity*, *Buffer*, *Optimization*.
`;
}
