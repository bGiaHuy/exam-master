import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Clock, 
  RotateCcw,
  Sparkles,
  Send,
  Crown,
  Lock,
  Maximize2,
  Minimize2,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import QuestionPalette from './QuestionPalette';
import AntiTabGuard from './AntiTabGuard';
import { sound } from '../utils/soundEffects';
import MarkdownViewer from './MarkdownViewer';

export default function ExamView({
  exam,
  mode = 'exam', // 'exam' | 'practice'
  antiTabEnabled = true,
  subscription = { isPro: false },
  onOpenProModal,
  onFinishExam,
  onOpenEssayReview
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [focusStrikes, setFocusStrikes] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const questions = exam?.questions || [];
  const currentQ = questions[currentIndex] || {};
  const currentSelected = userAnswers[currentQ.id];
  const isAnswered = currentSelected !== undefined;

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Keyboard navigation & answer selection
  const handleSelectOption = useCallback((optionKey) => {
    if (!currentQ.id) return;

    setUserAnswers(prev => {
      const next = { ...prev, [currentQ.id]: optionKey };
      return next;
    });

    if (mode === 'practice') {
      if (optionKey === currentQ.correctAnswer) {
        sound.playCorrect();
      } else {
        sound.playWrong();
      }
    } else {
      sound.playClick();
    }
  }, [currentQ, mode]);

  const toggleFlag = useCallback(() => {
    if (!currentQ.id) return;
    setFlaggedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(currentQ.id)) {
        next.delete(currentQ.id);
      } else {
        next.add(currentQ.id);
      }
      return next;
    });
  }, [currentQ]);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't capture when typing in text fields
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        handleSelectOption(key);
      } else if (key === '1') handleSelectOption('A');
      else if (key === '2') handleSelectOption('B');
      else if (key === '3') handleSelectOption('C');
      else if (key === '4') handleSelectOption('D');
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (key === 'F') toggleFlag();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSelectOption, handleNext, handlePrev, toggleFlag]);

  const handleSubmit = () => {
    setShowConfirmModal(true);
  };

  const confirmSubmit = () => {
    setShowConfirmModal(false);
    onFinishExam({
      exam,
      userAnswers,
      secondsElapsed,
      flaggedQuestions: Array.from(flaggedQuestions)
    });
  };

  // Fullscreen sync
  useEffect(() => {
    const handleFs = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFs);
    return () => document.removeEventListener('fullscreenchange', handleFs);
  }, []);

  const toggleFullscreen = () => {
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    } catch (e) {}
  };

  // Level Badge color helper
  const getLevelBadge = (level) => {
    switch (level) {
      case 'Nhận biết': return 'badge-primary';
      case 'Thông hiểu': return 'badge-success';
      case 'Vận dụng': return 'badge-warning';
      case 'Vận dụng cao': return 'badge-purple';
      default: return 'badge-primary';
    }
  };

  return (
    <div className="main-wrapper">
      {/* Focus Mode PRO Guard (Chống Thoát Tab) */}
      <AntiTabGuard
        enabled={antiTabEnabled && mode === 'exam'}
        isPro={subscription?.isPro}
        isExamActive={true}
        maxStrikes={3}
        onStrikesChange={(s) => setFocusStrikes(s)}
        onMaxStrikesReached={() => confirmSubmit()}
      />

      {/* FOCUS MODE PRO HUD OR FREE NOTICE */}
      {mode === 'exam' && (
        subscription?.isPro ? (
          antiTabEnabled ? (
            <div className="focus-mode-hud">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <span className="focus-pulse-dot"></span>
                <span style={{ fontWeight: '800', letterSpacing: '0.5px' }}>
                  🎯 FOCUS MODE PRO:
                </span>
                <span style={{ fontSize: '0.88rem' }}>
                  Đang giám sát phòng thi • Chống thoát tab & phân tâm (Vi phạm: {focusStrikes}/3)
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button
                  type="button"
                  className="btn btn-ghost"
                  style={{
                    padding: '0.25rem 0.65rem',
                    fontSize: '0.8rem',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.4)',
                    background: 'rgba(0,0,0,0.15)'
                  }}
                  onClick={toggleFullscreen}
                  title="Chuyển sang chế độ toàn màn hình để tập trung tuyệt đối"
                >
                  {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                  <span>{isFullscreen ? "Thoát Toàn Màn Hình" : "Bật Toàn Màn Hình"}</span>
                </button>
              </div>
            </div>
          ) : (
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '0.5rem 1rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.85rem'
            }}>
              <span style={{ color: 'var(--text-muted)' }}>
                ℹ️ Focus Mode PRO đang TẮT. Bạn có thể bật lại trên thanh menu để rèn luyện tính tập trung cao độ.
              </span>
            </div>
          )
        ) : (
          <div style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(124, 58, 237, 0.06))',
            border: '1px dashed rgba(245, 158, 11, 0.4)',
            borderRadius: 'var(--radius-md)',
            padding: '0.6rem 1.1rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.6rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Lock size={16} color="#f59e0b" />
              <div style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                <strong>Focus Mode PRO (Chống thoát tab & mô phỏng phòng thi):</strong> Đang khóa đối với tài khoản Free.
              </div>
            </div>
            <button
              className="btn btn-purple"
              style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}
              onClick={onOpenProModal}
            >
              <Crown size={13} color="#ffd700" /> Mở Khóa PRO (3$)
            </button>
          </div>
        )
      )}

      {/* Top Banner with Exam Info & Anti-cheat notice */}
      <div className="exam-header">
        <div className="exam-title-box">
          <h1>{exam.title}</h1>
          <div className="exam-meta">
            <span>{exam.subject}</span>
            <span>•</span>
            <span>{questions.length} câu hỏi</span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: '600' }}>
              <Clock size={16} /> {formatTime(secondsElapsed)}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {mode === 'exam' && (
            <button className="btn btn-primary" onClick={handleSubmit}>
              <Send size={16} /> Nộp Bài Thi
            </button>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="exam-grid">
        {/* Question Area */}
        <main className="question-card">
          <div className="question-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="question-num-badge">
                Câu {currentQ.questionNumber} / {questions.length}
              </span>
              <span className={`badge ${getLevelBadge(currentQ.level)}`}>
                {currentQ.level}
              </span>
            </div>

            <button
              className={`btn btn-secondary ${flaggedQuestions.has(currentQ.id) ? 'btn-danger' : ''}`}
              style={{ fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}
              onClick={toggleFlag}
            >
              <Bookmark size={15} fill={flaggedQuestions.has(currentQ.id) ? "currentColor" : "none"} />
              {flaggedQuestions.has(currentQ.id) ? 'Đã Đánh Cờ' : 'Đánh Dấu'}
            </button>
          </div>

          {/* Question Text */}
          <div className="question-text">
            {currentQ.questionText}
          </div>

          {/* Options List */}
          <div className="options-list">
            {['A', 'B', 'C', 'D'].map((key) => {
              const optText = currentQ.options?.[key];
              if (!optText) return null;

              const isThisSelected = currentSelected === key;
              let itemClass = 'option-item';

              if (mode === 'practice' && isAnswered) {
                if (key === currentQ.correctAnswer) {
                  itemClass += ' is-correct';
                } else if (isThisSelected && key !== currentQ.correctAnswer) {
                  itemClass += ' is-wrong';
                }
              } else {
                if (isThisSelected) itemClass += ' selected';
              }

              return (
                <div
                  key={key}
                  className={itemClass}
                  onClick={() => handleSelectOption(key)}
                >
                  <div className="option-key">{key}</div>
                  <div className="option-content">
                    {optText}
                  </div>
                  {mode === 'practice' && isAnswered && key === currentQ.correctAnswer && (
                    <CheckCircle2 size={20} color="var(--success)" style={{ marginLeft: 'auto' }} />
                  )}
                  {mode === 'practice' && isAnswered && isThisSelected && key !== currentQ.correctAnswer && (
                    <XCircle size={20} color="var(--danger)" style={{ marginLeft: 'auto' }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Practice Mode: Instant Explanation */}
          {mode === 'practice' && isAnswered && (
            <div className="explanation-box">
              <div className="explanation-title">
                <Sparkles size={18} />
                <span>Giải Thích Chi Tiết & Kiến Thức Cốt Lõi:</span>
              </div>
              <div className="explanation-body">
                <MarkdownViewer content={currentQ.explanation} />
              </div>
              
              {/* If answered wrong, offer instant Essay Practice */}
              {currentSelected !== currentQ.correctAnswer && (
                <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px dashed var(--border-color)' }}>
                  <button
                    className="btn btn-purple"
                    style={{ fontSize: '0.88rem', padding: '0.45rem 0.9rem' }}
                    onClick={() => onOpenEssayReview([currentQ])}
                  >
                    <Sparkles size={16} /> Ôn Tập Câu Này Bằng Tự Luận (AI Chấm)
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Question Navigation Footer */}
          <div className="question-footer">
            <button
              className="btn btn-secondary"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={18} /> Câu Trước
            </button>

            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Phím tắt: [1-4 / A-D] để chọn • [←/→] chuyển câu • [F] cắm cờ
            </span>

            <button
              className="btn btn-secondary"
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1}
            >
              Câu Sau <ChevronRight size={18} />
            </button>
          </div>
        </main>

        {/* Sidebar Question Palette */}
        <QuestionPalette
          questions={questions}
          currentIndex={currentIndex}
          userAnswers={userAnswers}
          flaggedQuestions={flaggedQuestions}
          mode={mode}
          onSelectQuestion={setCurrentIndex}
          onSubmitExam={handleSubmit}
        />
      </div>

      {/* Confirmation Submit Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
              Xác Nhận Nộp Bài Thi
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Bạn đã trả lời{' '}
              <strong style={{ color: 'var(--primary)' }}>{Object.keys(userAnswers).length}</strong> /{' '}
              {questions.length} câu hỏi.
              {questions.length - Object.keys(userAnswers).length > 0 && (
                <span style={{ color: 'var(--danger)', display: 'block', marginTop: '0.5rem' }}>
                  ⚠️ Lưu ý: Vẫn còn {questions.length - Object.keys(userAnswers).length} câu chưa có câu trả lời!
                </span>
              )}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>
                Tiếp Tục Làm
              </button>
              <button className="btn btn-primary" onClick={confirmSubmit}>
                Đồng Ý Nộp Bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
