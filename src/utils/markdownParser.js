/**
 * Enhanced Parser for Exam Markdown files.
 * Handles single-line and multi-line options, answer tables, answer lists, and detailed explanations.
 */
export function parseExamMarkdown(markdownText, fallbackTitle = "Đề Kiểm Tra") {
  if (!markdownText || typeof markdownText !== 'string') {
    throw new Error('Nội dung Markdown không hợp lệ hoặc đang trống.');
  }

  const lines = markdownText.split(/\r?\n/);
  
  let title = fallbackTitle;
  let subject = "Cơ sở dữ liệu";
  
  // Extract Title and Subject from initial lines
  for (let i = 0; i < Math.min(lines.length, 30); i++) {
    const line = lines[i].trim();
    if (line.startsWith('#') && (line.includes('ĐỀ KIỂM TRA') || line.includes('ĐỀ THI') || line.includes('TRẮC NGHIỆM'))) {
      title = line.replace(/^#+\s*\**/, '').replace(/\**\s*$/, '').replace(/\*\*/g, '').trim();
    } else if (line.match(/^Môn\s*[:：]/i)) {
      subject = line.replace(/^Môn\s*[:：]\s*/i, '').replace(/\*\*/g, '').trim();
    }
  }

  // 1. Extract Answer Key from "BẢNG ĐÁP ÁN" or lists like "1. A" or "Câu 1: A"
  const answersMap = {};
  let inAnswerSection = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.includes('BẢNG ĐÁP ÁN') || (line.includes('ĐÁP ÁN') && !line.includes('GIẢI THÍCH'))) {
      inAnswerSection = true;
      continue;
    }

    if (inAnswerSection) {
      if (line.includes('GIẢI THÍCH CHI TIẾT') || (line.startsWith('#') && !line.includes('ĐÁP ÁN'))) {
        inAnswerSection = false;
        continue;
      }

      // Case A: Markdown Table format (| 1 | A | 2 | B | ...)
      // Skip header rows: lines containing 'câu', 'đa', 'đáp án', ':---', 'answer'
      const isHeaderRow = line.toLowerCase().includes('câu') ||
        line.toLowerCase().includes('đa') ||
        line.toLowerCase().includes('đáp') ||
        line.toLowerCase().includes('answer') ||
        line.includes(':---') ||
        line.includes('---:');
      if (line.startsWith('|') && !line.includes('---') && !isHeaderRow) {
        const parts = line.split('|').map(p => p.trim()).filter(Boolean);
        for (let p = 0; p < parts.length; p += 2) {
          const qNum = parseInt(parts[p], 10);
          const ans = parts[p + 1];
          if (!isNaN(qNum) && ans && /^[A-D]$/i.test(ans)) {
            answersMap[qNum] = ans.toUpperCase();
          }
        }
      }

      // Case B: List format (1. A, 1 - A, Câu 1: A, 1: A)
      const listMatch = line.match(/^(?:[\*\-]\s*)?(?:Câu\s+)?(\d+)[\.\:\-\s]+([A-D])(?:\b|$)/i);
      if (listMatch) {
        const qNum = parseInt(listMatch[1], 10);
        const ans = listMatch[2].toUpperCase();
        answersMap[qNum] = ans;
      }
    }
  }

  // 2. Extract Explanations from "GIẢI THÍCH CHI TIẾT"
  const explanationsMap = {};
  let inExplanation = false;
  let currentExplQuestion = null;
  let currentExplContent = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.includes('GIẢI THÍCH CHI TIẾT') || line.includes('HƯỚNG DẪN GIẢI')) {
      inExplanation = true;
      continue;
    }
    if (inExplanation) {
      // Matches "* **Câu 1 (A):** text" or "**Câu 1 (A):** text" or "Câu 1: text" or "1. text"
      const match = line.match(/^[\*\-]?\s*\**Câu\s+(\d+)\s*(?:\([A-D]\))?\**\s*[:：\-]\s*\**\s*(.*)$/i);
      if (match) {
        if (currentExplQuestion !== null) {
          explanationsMap[currentExplQuestion] = cleanText(currentExplContent.join('\n'));
        }
        currentExplQuestion = parseInt(match[1], 10);
        currentExplContent = [match[2] || ''];
      } else if (currentExplQuestion !== null) {
        if (line.startsWith('#') && !line.includes('GIẢI THÍCH') && !line.includes('HƯỚNG DẪN')) {
          inExplanation = false;
        } else {
          currentExplContent.push(lines[i]);
        }
      }
    }
  }
  if (currentExplQuestion !== null && inExplanation) {
    explanationsMap[currentExplQuestion] = cleanText(currentExplContent.join('\n'));
  }

  // 3. Extract Questions and Options
  const questions = [];
  let currentLevel = "Thông thường";
  let currentQuestion = null;
  let currentOptionKey = null;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // Stop question parsing when reaching Answer Key / Explanations section
    if (line.includes('BẢNG ĐÁP ÁN') || line.includes('GIẢI THÍCH CHI TIẾT') || line.includes('HƯỚNG DẪN GIẢI')) {
      break;
    }

    // Check level headers
    if (line.includes('PHẦN') && (line.includes('MỨC ĐỘ') || line.includes('NHẬN BIẾT') || line.includes('THÔNG HIỂU') || line.includes('VẬN DỤNG'))) {
      if (line.includes('NHẬN BIẾT')) currentLevel = "Nhận biết";
      else if (line.includes('THÔNG HIỂU')) currentLevel = "Thông hiểu";
      else if (line.includes('VẬN DỤNG CAO')) currentLevel = "Vận dụng cao";
      else if (line.includes('VẬN DỤNG')) currentLevel = "Vận dụng";
      continue;
    }

    // Question start: "Câu 1. ..." or "Câu 1: ..." or "Câu 1) ..." or "**Câu 1.**" or "Câu 1 -"
    const qMatch = line.match(/^(?:#+\s*)?(?:\*\*|\*)?Câu\s+(\d+)(?:\*\*|\*)?\s*(?:\\?[\.:\-\)]|\s[-–])\s*(.*)$/i);
    if (qMatch) {
      if (currentQuestion) {
        questions.push(finalizeQuestion(currentQuestion, answersMap, explanationsMap));
      }
      currentQuestion = {
        id: parseInt(qMatch[1], 10),
        level: currentLevel,
        textLines: [qMatch[2]],
        options: { A: [], B: [], C: [], D: [] }
      };
      currentOptionKey = null;
      continue;
    }

    if (!currentQuestion) continue;

    // Check option line: "* A. ...", "A. ...", "* A) ...", "A) ...", "- A. ...", "* **A.** ..."
    const optMatch = line.match(/^(?:[\*\-]\s+)?(?:\*\*|\*)?([A-D])(?:\\?[\.:\)])(?:\*\*|\*)?\s+(.+)$/i);
    if (optMatch) {
      currentOptionKey = optMatch[1].toUpperCase();
      currentQuestion.options[currentOptionKey] = [optMatch[2]];
      continue;
    }

    // Continuation lines
    if (currentOptionKey) {
      if (rawLine.trim() !== '&nbsp;') {
        currentQuestion.options[currentOptionKey].push(rawLine);
      }
    } else {
      if (rawLine.trim() !== '&nbsp;') {
        currentQuestion.textLines.push(rawLine);
      }
    }
  }

  // Push final question
  if (currentQuestion) {
    questions.push(finalizeQuestion(currentQuestion, answersMap, explanationsMap));
  }

  // Auto-detect chapter
  const chapMatch = (title + ' ' + fallbackTitle).match(/Chương\s*(\d+[\.\d]*)|Chapter\s*(\d+[\.\d]*)/i);
  const chapter = chapMatch ? (chapMatch[0].toUpperCase()) : 'Chương Mới';

  return {
    id: `exam-custom-${Date.now()}`,
    title: cleanText(title),
    subject: cleanText(subject),
    chapter,
    totalQuestions: questions.length,
    questions
  };
}

function cleanText(str) {
  if (!str) return '';
  return str
    .replace(/\\([.\-:()\[\]])/g, '$1') // unescape markdown backslashes
    .replace(/^\**|\**$/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function finalizeQuestion(q, answersMap, explanationsMap) {
  const optionsObj = {};
  ['A', 'B', 'C', 'D'].forEach(key => {
    const raw = (q.options[key] || []).join('\n').trim();
    optionsObj[key] = cleanText(raw);
  });

  const correctAnswer = answersMap[q.id] || 'A';
  let explanation = explanationsMap[q.id] || '';
  if (!explanation && optionsObj[correctAnswer]) {
    explanation = `Đáp án đúng là ${correctAnswer}: ${optionsObj[correctAnswer]}`;
  }

  let fullQuestionText = cleanText(q.textLines.join('\n').trim());
  // Remove accidental leading dots or colons
  fullQuestionText = fullQuestionText.replace(/^[\.\:\-\s]+/, '');

  return {
    id: q.id,
    questionNumber: q.id,
    level: q.level || 'Thông thường',
    questionText: fullQuestionText,
    options: optionsObj,
    correctAnswer,
    explanation: cleanText(explanation)
  };
}
