import React, { useState, useRef, useMemo } from 'react';
import { 
  Upload, 
  FileText, 
  Check, 
  X, 
  AlertCircle, 
  Copy, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  FileCode,
  CheckCircle2,
  Zap,
  Play
} from 'lucide-react';
import { parseExamMarkdown } from '../utils/markdownParser';
import { PPTX_EXAM_PROMPT } from '../data/promptTemplate';

const QUICK_DEMO_MARKDOWN = `# **ĐỀ KIỂM TRA TRẮC NGHIỆM: CHƯƠNG 4 – HỆ THỐNG BỘ NHỚ VÀ CACHE**

Môn: Computer Organization and Architecture (CEA)
Cấu trúc: 5 câu trắc nghiệm mẫu minh họa kèm Đáp án và Giải thích chi tiết.

# **PHẦN 1: MỨC ĐỘ NHẬN BIẾT**

Câu 1. Bộ nhớ nào có tốc độ truy xuất nhanh nhất trong hệ thống máy tính?
* A. Ổ đĩa cứng HDD
* B. Bộ nhớ Cache L1
* C. Bộ nhớ chính RAM
* D. Ổ đĩa thể rắn SSD

Câu 2. Nguyên lý cục bộ (Locality of Reference) bao gồm những dạng nào?
* A. Cục bộ theo thời gian và cục bộ theo không gian
* B. Cục bộ theo tốc độ và cục bộ theo dung lượng
* C. Cục bộ theo người dùng và cục bộ theo tiến trình
* D. Cục bộ theo phần cứng và cục bộ theo phần mềm

# **BẢNG ĐÁP ÁN VÀ GIẢI THÍCH CHI TIẾT**

## **BẢNG ĐÁP ÁN**
| Câu | ĐA |
| :-- | :- |
| 1   | B  |
| 2   | A  |

## **GIẢI THÍCH CHI TIẾT**
* **Câu 1 (B):** Cache L1 nằm ngay sát lõi CPU nên có độ trễ nhỏ nhất và tốc độ nhanh nhất.
* **Câu 2 (A):** Temporal locality (thời gian) và Spatial locality (không gian) là 2 dạng cơ bản.
`;

export default function ImportExamModal({ isOpen, onClose, onExamImported }) {
  const [markdownText, setMarkdownText] = useState('');
  const [examTitle, setExamTitle] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  // Prompt template states
  const [showPromptBox, setShowPromptBox] = useState(false);
  const [copied, setCopied] = useState(false);

  // Live Auto-Detection
  const previewStats = useMemo(() => {
    if (!markdownText.trim()) return null;
    try {
      const parsed = parseExamMarkdown(markdownText, examTitle || 'Đề Thi Tự Nhập');
      const count = parsed.questions?.length || 0;
      return {
        success: count > 0,
        count,
        subject: parsed.subject,
        title: parsed.title,
        chapter: parsed.chapter,
        parsed
      };
    } catch (err) {
      return {
        success: false,
        error: err.message
      };
    }
  }, [markdownText, examTitle]);

  if (!isOpen) return null;

  const handleCopyPrompt = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(PPTX_EXAM_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const processFile = (file) => {
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setMarkdownText(content);
        if (!examTitle) {
          setExamTitle(file.name.replace(/\.(md|txt)$/i, ''));
        }
      }
    };
    reader.readAsText(file);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleProcess = (startImmediately = false) => {
    setErrorMsg('');
    if (!markdownText.trim()) {
      setErrorMsg('Vui lòng tải lên file .md hoặc dán nội dung đề thi.');
      return;
    }

    try {
      setLoading(true);
      const parsed = parseExamMarkdown(markdownText, examTitle || 'Đề Thi Mới');
      if (!parsed.questions || parsed.questions.length === 0) {
        throw new Error('Không nhận dạng được câu hỏi nào trong file. Vui lòng đảm bảo các câu bắt đầu bằng "Câu 1.", "Câu 2.", v.v.');
      }

      onExamImported(parsed, startImmediately);
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Lỗi phân tích file đề Markdown.');
    } finally {
      setLoading(false);
    }
  };

  const loadQuickDemo = () => {
    setMarkdownText(QUICK_DEMO_MARKDOWN);
    setExamTitle('Đề Mẫu Minh Họa CEA Chương 4');
    setFileName('demo_cea_chuong4.md');
    setErrorMsg('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary)' }}>
            <FileText size={24} />
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
                Thêm Đề Thi Mới (File Markdown .md)
              </h2>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Nạp kho câu hỏi offline từ máy tính, không tiêu hao API
              </span>
            </div>
          </div>
          <button className="btn btn-ghost btn-icon-only" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* PROMPT GENERATOR BANNER */}
        <div style={{
          background: 'linear-gradient(135deg, var(--purple-light), var(--primary-light))',
          border: '1px solid var(--purple-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1rem 1.25rem',
          marginBottom: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--purple)' }}>
              <Sparkles size={20} />
              <span style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--text-main)' }}>
                Lấy Prompt để nhờ AI khác soạn đề từ Slide PPTX
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                className="btn btn-purple"
                style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem' }}
                onClick={handleCopyPrompt}
                title="Sao chép toàn bộ Prompt vào bộ nhớ tạm"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span>{copied ? 'Đã Sao Chép!' : 'Sao Chép Prompt'}</span>
              </button>

              <button
                className="btn btn-secondary"
                style={{ fontSize: '0.82rem', padding: '0.4rem 0.65rem' }}
                onClick={() => setShowPromptBox(!showPromptBox)}
              >
                {showPromptBox ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                <span>{showPromptBox ? 'Thu gọn' : 'Xem prompt'}</span>
              </button>
            </div>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0.4rem 0 0 0', lineHeight: 1.4 }}>
            💡 Gửi prompt này kèm file Slide PowerPoint cho Claude / ChatGPT để AI tạo file .md đúng chuẩn 100%.
          </p>

          {showPromptBox && (
            <div style={{ marginTop: '0.75rem' }}>
              <textarea
                readOnly
                className="form-input"
                style={{
                  minHeight: '160px',
                  fontFamily: 'monospace',
                  fontSize: '0.78rem',
                  lineHeight: '1.4',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-main)',
                  border: '1px solid var(--purple-border)',
                  resize: 'vertical'
                }}
                value={PPTX_EXAM_PROMPT}
              />
            </div>
          )}
        </div>

        {/* Drag & Drop File Upload Box */}
        <div 
          style={{
            border: `2px dashed ${isDragging ? 'var(--primary)' : 'var(--border-color)'}`,
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            textAlign: 'center',
            marginBottom: '1.25rem',
            background: isDragging ? 'var(--primary-light)' : 'var(--bg-surface)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".md,.txt"
            id="exam-file-input"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <Upload size={32} color="var(--primary)" style={{ margin: '0 auto 0.5rem' }} />
          
          <div style={{ fontWeight: '700', color: 'var(--text-main)', fontSize: '1rem', marginBottom: '0.25rem' }}>
            {fileName ? `Đã chọn: ${fileName}` : 'Bấm vào đây hoặc kéo thả file .md vào đây'}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Hỗ trợ file Markdown đề thi trắc nghiệm (chuẩn bảng đáp án & giải thích)
          </div>

          {fileName && (
            <div style={{ marginTop: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--success)', fontSize: '0.85rem', fontWeight: '600' }}>
              <CheckCircle2 size={16} /> File đã sẵn sàng phân tích
            </div>
          )}
        </div>

        {/* Or Paste Markdown directly */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <label style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-main)' }}>
              Hoặc dán trực tiếp nội dung Markdown vào đây:
            </label>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', color: 'var(--primary)' }}
              onClick={loadQuickDemo}
            >
              <Zap size={14} /> Thử Nạp Đề Mẫu Nhanh
            </button>
          </div>

          <textarea
            className="form-input"
            style={{ minHeight: '130px', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: '1.4' }}
            placeholder="# ĐỀ KIỂM TRA TRẮC NGHIỆM: CHƯƠNG 3...&#10;Môn: CEA&#10;&#10;Câu 1. Theo kiến trúc Von Neumann...&#10;* A. Trong hai bộ nhớ chỉ đọc tách biệt&#10;* B. ...&#10;&#10;## BẢNG ĐÁP ÁN&#10;| Câu | ĐA |&#10;| 1 | A |"
            value={markdownText}
            onChange={(e) => {
              setMarkdownText(e.target.value);
              setErrorMsg('');
            }}
          />
        </div>

        {/* LIVE DETECTION STATS BADGE */}
        {previewStats && previewStats.success && (
          <div style={{
            background: 'var(--success-light)',
            border: '1px solid var(--success-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <CheckCircle2 size={20} color="var(--success)" />
              <div>
                <div style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--text-main)' }}>
                  Đã nhận diện: {previewStats.count} câu hỏi trắc nghiệm hợp lệ!
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Môn: <strong>{previewStats.subject}</strong> • {previewStats.chapter} • Tiêu đề: {previewStats.title}
                </div>
              </div>
            </div>
            <span className="badge badge-success" style={{ fontSize: '0.82rem' }}>
              Sẵn Sàng Nạp
            </span>
          </div>
        )}

        {previewStats && !previewStats.success && markdownText.trim().length > 40 && (
          <div style={{
            background: 'var(--warning-light)',
            border: '1px solid var(--warning-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            fontSize: '0.85rem',
            color: 'var(--warning)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={18} />
            <div>
              Chưa nhận diện được câu hỏi. Đảm bảo cấu trúc mỗi câu bắt đầu bằng: <code>Câu 1. [Nội dung]</code> và các đáp án <code>* A. ...</code>, <code>* B. ...</code>
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div style={{
            background: 'var(--danger-light)',
            color: 'var(--danger)',
            border: '1px solid var(--danger-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            fontSize: '0.88rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={18} /> {errorMsg}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Hủy Bỏ
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => handleProcess(false)} 
              disabled={loading || !markdownText.trim()}
              title="Lưu vào kho đề thi và chuyển đến danh sách đề"
            >
              <Upload size={16} />
              <span>{loading ? 'Đang Xử Lý...' : 'Nạp Vào Kho Đề'}</span>
            </button>

            <button 
              className="btn btn-purple" 
              onClick={() => handleProcess(true)} 
              disabled={loading || !markdownText.trim()}
              title="Lưu và bắt đầu làm bài thi ngay lập tức"
            >
              <Play size={16} />
              <span>Nạp & Làm Bài Ngay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
