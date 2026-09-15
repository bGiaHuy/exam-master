import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Upload, 
  FileText, 
  Clock, 
  ChevronRight, 
  ArrowLeft, 
  Check, 
  Copy, 
  AlertCircle,
  KeyRound,
  Layers,
  Send,
  ArrowUp,
  ArrowDown,
  Award
} from 'lucide-react';
import { DEFAULT_LECTURES } from '../data/studyLectures';
import { convertSlideToVietnamese } from '../utils/slideConverter';
import MarkdownViewer from './MarkdownViewer';

export default function StudyHub({
  activeSubject = 'ALL',
  onBackToHome,
  onNavigateToExam,
  apiKey,
  onOpenApiKeyModal
}) {
  const [selectedSubject, setSelectedSubject] = useState(activeSubject);
  const [lectures, setLectures] = useState(() => {
    try {
      const saved = localStorage.getItem('custom_study_lectures');
      if (saved) {
        return [...DEFAULT_LECTURES, ...JSON.parse(saved)];
      }
    } catch (e) {
      console.warn("Could not load custom lectures:", e);
    }
    return DEFAULT_LECTURES;
  });

  const [activeLectureId, setActiveLectureId] = useState(DEFAULT_LECTURES[0]?.id || '');
  const [showConverter, setShowConverter] = useState(false);

  // Converter state
  const [slideText, setSlideText] = useState('');
  const [convertSubject, setConvertSubject] = useState('CEA');
  const [convertChapter, setConvertChapter] = useState('Chương 1');
  const [isConverting, setIsConverting] = useState(false);
  const [convertedResult, setConvertedResult] = useState('');
  const [convertError, setConvertError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Filter lectures
  const filteredLectures = lectures.filter(l => {
    if (selectedSubject === 'ALL') return true;
    return l.subjectCode === selectedSubject;
  });

  const currentLecture = filteredLectures.find(l => l.id === activeLectureId) || filteredLectures[0] || lectures[0];

  const handleSelectSubject = (code) => {
    setSelectedSubject(code);
    const matched = lectures.filter(l => code === 'ALL' ? true : l.subjectCode === code);
    if (matched.length > 0) {
      setActiveLectureId(matched[0].id);
      setReadingProgress(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectLecture = (id) => {
    setActiveLectureId(id);
    setReadingProgress(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Track Reading Progress for Active Lecture
  const lectureContainerRef = useRef(null);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!lectureContainerRef.current) return;
      const rect = lectureContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight;

      // When at the very top of the window, keep at 0%
      if (scrollY < 20) {
        setReadingProgress(0);
        return;
      }

      // If user has reached near bottom of page
      if (scrollY + windowHeight >= docHeight - 35) {
        setReadingProgress(100);
        return;
      }

      const containerTopInDoc = rect.top + scrollY;
      const totalHeight = rect.height;

      // If container is smaller than or equal to viewport
      if (totalHeight <= windowHeight) {
        const maxScroll = Math.max(1, docHeight - windowHeight);
        const pct = Math.min(100, Math.max(0, Math.round((scrollY / maxScroll) * 100)));
        setReadingProgress(pct);
        return;
      }

      // Scrolled past the container's top
      const scrolledPast = Math.max(0, scrollY - containerTopInDoc + 60);
      const scrollableDistance = Math.max(80, totalHeight - windowHeight + 100);

      const pct = Math.min(100, Math.max(0, Math.round((scrolledPast / scrollableDistance) * 100)));
      setReadingProgress(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    setReadingProgress(0);
    const timer = setTimeout(handleScroll, 100);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(timer);
    };
  }, [currentLecture?.id]);

  const scrollToLectureTop = () => {
    if (lectureContainerRef.current) {
      const topPos = lectureContainerRef.current.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: topPos, behavior: 'smooth' });
    }
  };

  const scrollToLectureBottom = () => {
    if (lectureContainerRef.current) {
      const bottomPos = lectureContainerRef.current.getBoundingClientRect().bottom + window.scrollY - window.innerHeight + 60;
      window.scrollTo({ top: bottomPos, behavior: 'smooth' });
    }
  };

  const estimatedTotalMins = useMemo(() => {
    const match = (currentLecture?.readTime || '').match(/\d+/);
    return match ? parseInt(match[0], 10) : 10;
  }, [currentLecture?.readTime]);

  const remainingMins = Math.max(1, Math.ceil(estimatedTotalMins * (1 - readingProgress / 100)));

  const handleStartConvert = async () => {
    setConvertError('');
    if (!slideText.trim()) {
      setConvertError('Vui lòng dán nội dung slide tiếng Anh cần chuyển đổi.');
      return;
    }

    setIsConverting(true);
    try {
      const result = await convertSlideToVietnamese({
        slideContent: slideText,
        subject: convertSubject,
        chapter: convertChapter,
        apiKey
      });
      setConvertedResult(result);
    } catch (err) {
      setConvertError('Lỗi khi chuyển đổi: ' + err.message);
    } finally {
      setIsConverting(false);
    }
  };

  const handleSaveConvertedLecture = () => {
    if (!convertedResult) return;

    const newLecture = {
      id: `custom-lecture-${Date.now()}`,
      subjectCode: convertSubject,
      subjectName: convertSubject === 'DBI' ? 'Cơ Sở Dữ Liệu (DBI)' : convertSubject === 'CEA' ? 'Kiến Trúc Máy Tính (CEA)' : 'Cấu Trúc Dữ Liệu (CSD)',
      chapter: convertChapter,
      title: `${convertSubject} - ${convertChapter}: Bài Giảng Chuyển Đổi Từ Slide`,
      subtitle: "Bản giảng giải tiếng Việt có ví dụ minh họa bằng văn bản do AI biên soạn",
      readTime: "8 phút đọc",
      content: convertedResult
    };

    const updated = [newLecture, ...lectures];
    setLectures(updated);

    try {
      const customOnly = updated.filter(l => !DEFAULT_LECTURES.some(d => d.id === l.id));
      localStorage.setItem('custom_study_lectures', JSON.stringify(customOnly));
    } catch (e) {
      console.warn("Storage quota exceeded");
    }

    setActiveLectureId(newLecture.id);
    setShowConverter(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="main-wrapper">
      {/* Top Breadcrumb & Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={onBackToHome}>
            <ArrowLeft size={16} /> Trang Chủ
          </button>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
              Phân Hệ Học Tập & Bài Giảng
            </h1>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Bài giảng tóm tắt tiếng Việt có ví dụ minh họa đời thực dễ hiểu
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button
            className="btn btn-purple"
            style={{ fontWeight: '700' }}
            onClick={() => setShowConverter(!showConverter)}
          >
            <Sparkles size={16} />
            {showConverter ? 'Đóng Công Cụ Convert' : 'Convert Slide Tiếng Anh Bằng AI'}
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div style={{
          background: 'var(--success-light)',
          border: '1px solid var(--success-border)',
          color: 'var(--success)',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1rem',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Check size={18} /> Đã lưu bài giảng mới vào thư viện học tập của bố!
        </div>
      )}

      {/* CONVERT SLIDE SLIDE-DOWN PANEL */}
      {showConverter && (
        <div style={{
          background: 'var(--bg-card)',
          border: '2px solid var(--purple-border)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--purple)', marginBottom: '0.75rem' }}>
            <Sparkles size={22} />
            <h2 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
              Công Cụ Chuyển Đổi Slide Tiếng Anh Sang Văn Bản Tiếng Việt
            </h2>
          </div>

          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
            Dán nội dung slide tiếng Anh vào đây. AI sẽ tự động phân tích, dịch các thuật ngữ khó sang tiếng Việt 
            và <strong>chế tạo các ví dụ minh họa đời thực gần gũi bằng text</strong> giúp bố đọc một lần là hiểu ngay bản chất!
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.3rem' }}>
                Mã Môn Học:
              </label>
              <select
                className="form-input"
                style={{ marginTop: 0 }}
                value={convertSubject}
                onChange={(e) => setConvertSubject(e.target.value)}
              >
                <option value="CEA">CEA (Kiến Trúc & Tổ Chức Máy Tính)</option>
                <option value="DBI">DBI (Cơ Sở Dữ Liệu)</option>
                <option value="CSD">CSD (Cấu Trúc Dữ Liệu & Giải Thuật)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.3rem' }}>
                Chương / Tên Bài:
              </label>
              <input
                type="text"
                className="form-input"
                style={{ marginTop: 0 }}
                placeholder="Ví dụ: Chương 1 - Basic Structure"
                value={convertChapter}
                onChange={(e) => setConvertChapter(e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.3rem' }}>
              Nội Dung Slide Tiếng Anh (Dán text từ slide hoặc tài liệu):
            </label>
            <textarea
              className="form-input"
              style={{ minHeight: '160px', fontFamily: 'monospace', fontSize: '0.88rem' }}
              placeholder="Paste slide contents here (e.g. Computer Architecture vs Organization, CPU structure, Von Neumann, Registers, Fetch-Decode-Execute cycle...)"
              value={slideText}
              onChange={(e) => setSlideText(e.target.value)}
            />
          </div>

          {convertError && (
            <div style={{
              background: 'var(--danger-light)',
              color: 'var(--danger)',
              border: '1px solid var(--danger-border)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem',
              fontSize: '0.88rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <AlertCircle size={16} /> {convertError}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button
              className="btn btn-secondary"
              onClick={() => setShowConverter(false)}
              disabled={isConverting}
            >
              Hủy
            </button>
            <button
              className="btn btn-purple"
              style={{ minWidth: '180px' }}
              onClick={handleStartConvert}
              disabled={isConverting}
            >
              {isConverting ? (
                <>
                  <Sparkles size={16} className="spin" /> Đang Chuyển Đổi & Tạo Ví Dụ...
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Bắt Đầu Chuyển Đổi Bằng AI
                </>
              )}
            </button>
          </div>

          {/* Converted Output Preview */}
          {convertedResult && (
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '2px dashed var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--success)' }}>
                  🎉 Kết Quả Chuyển Đổi Thành Công:
                </h3>
                <button
                  className="btn btn-success"
                  onClick={handleSaveConvertedLecture}
                >
                  <Check size={16} /> Lưu Vào Danh Mục Bài Học Của Bố
                </button>
              </div>

              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                maxHeight: '400px',
                overflowY: 'auto'
              }}>
                <MarkdownViewer content={convertedResult} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Permanent Glowing Progress Strip on the EXTREME LEFT of the viewport */}
      <div 
        className="left-viewport-progress-strip" 
        style={{ height: `${readingProgress}%` }} 
        title={`Tiến độ đọc bài giảng: ${readingProgress}%`}
      />

      {/* Main Subject Filter Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {[
          { code: 'ALL', name: 'Tất Cả Các Môn' },
          { code: 'DBI', name: 'DBI (Cơ Sở Dữ Liệu)' },
          { code: 'CEA', name: 'CEA (Kiến Trúc Máy Tính)' },
          { code: 'CSD', name: 'CSD (Cấu Trúc Dữ Liệu)' }
        ].map(item => (
          <button
            key={item.code}
            className={`btn ${selectedSubject === item.code ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.88rem', padding: '0.45rem 0.95rem' }}
            onClick={() => handleSelectSubject(item.code)}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Grid Layout: Left Sidebar (Progress + List) & Right Reader Pane */}
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* Left Column: Sticky Progress Card & Lecture List */}
        <div style={{ position: 'sticky', top: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* 📌 THẺ TIẾN ĐỘ ĐỌC BÊN TRÁI MÀN HÌNH (LEFT READING PROGRESS WIDGET) */}
          {currentLecture && (
            <div className="left-reading-progress-card">
              <div className="left-progress-header">
                <span style={{ fontSize: '0.76rem', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <BookOpen size={14} /> TIẾN ĐỘ ĐỌC BÀI
                </span>
                <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                  {currentLecture.subjectCode} • {currentLecture.chapter}
                </span>
              </div>

              <div style={{ 
                fontSize: '0.88rem', 
                fontWeight: '700', 
                color: 'var(--text-main)', 
                marginBottom: '0.5rem', 
                lineHeight: '1.35', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
                display: '-webkit-box', 
                WebkitLineClamp: 2, 
                WebkitBoxOrient: 'vertical' 
              }}>
                {currentLecture.title}
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span className="left-progress-pct">{readingProgress}%</span>
                {readingProgress >= 95 ? (
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--success)', background: 'var(--success-light)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--success-border)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Award size={12} /> Đã hoàn thành!
                  </span>
                ) : readingProgress === 0 ? (
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                    🟢 Bắt đầu đọc
                  </span>
                ) : (
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                    ⏱️ Còn ~{remainingMins} phút
                  </span>
                )}
              </div>

              {/* Glowing Progress Bar Track */}
              <div className="left-progress-track">
                <div 
                  className="left-progress-fill" 
                  style={{ width: `${readingProgress}%` }} 
                />
              </div>

              {/* Jump Navigation Buttons */}
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.65rem' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1, fontSize: '0.74rem', padding: '0.3rem 0.4rem', justifyContent: 'center' }}
                  onClick={scrollToLectureTop}
                  title="Cuộn lên đầu bài giảng"
                >
                  <ArrowUp size={12} /> Đầu bài
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1, fontSize: '0.74rem', padding: '0.3rem 0.4rem', justifyContent: 'center' }}
                  onClick={scrollToLectureBottom}
                  title="Cuộn xuống cuối bài giảng"
                >
                  <ArrowDown size={12} /> Cuối bài
                </button>
              </div>

              {readingProgress >= 95 && (
                <button
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%', marginTop: '0.65rem', fontSize: '0.8rem', padding: '0.45rem', fontWeight: '800', justifyContent: 'center' }}
                  onClick={onNavigateToExam}
                >
                  Thi Trắc Nghiệm Ngay <ChevronRight size={14} />
                </button>
              )}
            </div>
          )}

          {/* Left list of lectures */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '1rem',
            boxShadow: 'var(--shadow-sm)',
            maxHeight: 'calc(100vh - 280px)',
            overflowY: 'auto'
          }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: '700', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
              Danh Sách Bài Học ({filteredLectures.length})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {filteredLectures.map(lec => {
                const isCurrent = lec.id === currentLecture?.id;
                return (
                  <div
                    key={lec.id}
                    style={{
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${isCurrent ? 'var(--primary)' : 'var(--border-color)'}`,
                      background: isCurrent ? 'var(--primary-light)' : 'var(--bg-surface)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onClick={() => handleSelectLecture(lec.id)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>
                        {lec.subjectCode} - {lec.chapter}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {lec.readTime}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)', lineHeight: '1.35' }}>
                      {lec.title}
                    </h4>

                    {/* Mini progress bar inside active lecture card */}
                    {isCurrent && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--primary)', fontWeight: '700' }}>
                          <span>{readingProgress >= 95 ? '✅ Đã xong' : '● Đang đọc'}</span>
                          <span>{readingProgress}%</span>
                        </div>
                        <div className="mini-progress-track">
                          <div className="mini-progress-fill" style={{ width: `${readingProgress}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Reader Pane */}
        {currentLecture ? (
          <div 
            ref={lectureContainerRef}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-md)',
              position: 'relative'
            }}
          >
            <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="badge badge-primary">{currentLecture.subjectName}</span>
                <span className="badge badge-secondary">{currentLecture.chapter}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={14} /> {currentLecture.readTime}
                </span>
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: '1.3' }}>
                {currentLecture.title}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.35rem' }}>
                {currentLecture.subtitle}
              </p>
            </div>

            {/* Lecture Content Viewer */}
            <div style={{
              fontSize: 'var(--font-opt)',
              color: 'var(--text-main)',
              fontFamily: 'inherit'
            }}>
              <MarkdownViewer content={currentLecture.content} />
            </div>

            {/* Footer action to jump to exam of this subject */}
            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Đã nắm chắc kiến thức lý thuyết? Hãy làm bài thi ngay!
              </span>
              <button
                className="btn btn-primary"
                onClick={onNavigateToExam}
              >
                Chuyển Sang Thi Trắc Nghiệm Môn Này <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Chưa có bài giảng cho môn này. Bạn có thể dùng nút "Convert Slide" ở trên để tạo ngay!
          </div>
        )}
      </div>
    </div>
  );
}
