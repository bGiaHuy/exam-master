import React, { useEffect, useState } from 'react';
import { 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Clock, 
  Award,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Home,
  Crown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';
import MarkdownViewer from './MarkdownViewer';

export default function ResultSummary({
  resultData,
  subscription = { isPro: false, remainingUses: 3 },
  onOpenProModal,
  onRetakeExam,
  onSelectAnotherExam,
  onStartEssayReview
}) {
  const exam = resultData?.exam || { title: 'Đề thi trắc nghiệm', questions: [] };
  const userAnswers = resultData?.userAnswers || {};
  const secondsElapsed = resultData?.secondsElapsed || 0;
  const questions = exam?.questions || [];
  const [filter, setFilter] = useState('wrong'); // 'all' | 'wrong' | 'correct'
  const [expandedQuestions, setExpandedQuestions] = useState({});

  // Compute stats
  let correctCount = 0;
  const levelStats = {
    'Nhận biết': { total: 0, correct: 0 },
    'Thông hiểu': { total: 0, correct: 0 },
    'Vận dụng': { total: 0, correct: 0 },
    'Vận dụng cao': { total: 0, correct: 0 }
  };

  const wrongQuestions = [];

  questions.forEach(q => {
    const isCorrect = userAnswers[q.id] === q.correctAnswer;
    if (isCorrect) correctCount++;
    else wrongQuestions.push(q);

    const lvl = levelStats[q.level] ? q.level : 'Nhận biết';
    levelStats[lvl].total++;
    if (isCorrect) levelStats[lvl].correct++;
  });

  const total = questions.length;
  const score10 = total > 0 ? (correctCount / total) * 10 : 0;
  const scoreFormatted = (Math.round(score10 * 10) / 10).toFixed(1);
  const accuracyPercent = Math.round((correctCount / (total || 1)) * 100);

  // Confetti trigger if score >= 8
  useEffect(() => {
    if (score10 >= 8.0) {
      sound.playCorrect();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [score10]);

  const toggleExpand = (qId) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const filteredQuestions = questions.filter(q => {
    const isCorrect = userAnswers[q.id] === q.correctAnswer;
    if (filter === 'wrong') return !isCorrect;
    if (filter === 'correct') return isCorrect;
    return true;
  });

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m} phút ${s} giây`;
  };

  return (
    <div className="main-wrapper">
      <div className={`result-card ${subscription?.isPro ? 'pro-card-glow' : ''}`}>
        {subscription?.isPro ? (
          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
            <span className="pro-badge" style={{ fontSize: '0.85rem', padding: '0.35rem 1rem' }}>
              <Crown size={16} /> BÁO CÁO PHÂN TÍCH CHUYÊN SÂU PRO VIP
            </span>
          </div>
        ) : (
          <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>
            <span className="badge badge-secondary" style={{ fontSize: '0.82rem', padding: '0.3rem 0.8rem' }}>
              🌱 Gói Miễn Phí (Còn {subscription?.remainingUses ?? 3}/3 lượt AI hôm nay)
            </span>
          </div>
        )}

        <div className="score-circle">
          <span className="score-number">{scoreFormatted}</span>
          <span className="score-max">/ 10 Điểm</span>
        </div>

        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
          {score10 >= 8.5 ? "🎉 Xuất Sắc! Điểm Số Rất Cao!" : score10 >= 6.5 ? "👏 Kết Quả Khá Tốt!" : "💪 Hãy Cùng Ôn Tập Lại Nhé!"}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
          Đề thi: <strong>{exam.title}</strong>
        </p>

        {/* Top Stats Overview */}
        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-box-title">Độ Chính Xác</span>
            <div className="stat-box-value" style={{ color: 'var(--primary)' }}>
              {accuracyPercent}%
            </div>
          </div>
          <div className="stat-box">
            <span className="stat-box-title">Số Câu Đúng</span>
            <div className="stat-box-value" style={{ color: 'var(--success)' }}>
              {correctCount} / {total}
            </div>
          </div>
          <div className="stat-box">
            <span className="stat-box-title">Số Câu Sai / Bỏ Qua</span>
            <div className="stat-box-value" style={{ color: 'var(--danger)' }}>
              {total - correctCount} câu
            </div>
          </div>
          <div className="stat-box">
            <span className="stat-box-title">Thời Gian Làm Bài</span>
            <div className="stat-box-value" style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>
              {formatTime(secondsElapsed)}
            </div>
          </div>
        </div>

        {/* Cognitive Levels Breakdown */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          textAlign: 'left'
        }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '1rem', fontWeight: '700' }}>
            Phân Tích Theo Mức Độ Nhận Thức
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {Object.entries(levelStats).map(([lvl, data]) => {
              const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
              return (
                <div key={lvl}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                    <span style={{ fontWeight: '600' }}>{lvl}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{data.correct}/{data.total} ({pct}%)</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${pct}%`,
                      background: pct >= 80 ? 'var(--success)' : pct >= 50 ? 'var(--primary)' : 'var(--danger)',
                      borderRadius: '4px',
                      transition: 'width 0.8s ease'
                    }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem', alignItems: 'center' }}>
          {wrongQuestions.length > 0 && (
            subscription?.isPro ? (
              <button
                className="btn pro-btn-gold"
                style={{ padding: '0.85rem 1.8rem', fontSize: '1.05rem' }}
                onClick={() => onStartEssayReview(wrongQuestions)}
              >
                <Crown size={20} color="#ffd700" />
                <span>👑 Ôn Tập {wrongQuestions.length} Câu Sai Bằng AI PRO (Unlimited)</span>
              </button>
            ) : (
              <button
                className="btn btn-purple"
                style={{ padding: '0.85rem 1.5rem', fontSize: '1.05rem', fontWeight: '700' }}
                onClick={() => onStartEssayReview(wrongQuestions)}
              >
                <Sparkles size={20} />
                <span>
                  Ôn Tập {wrongQuestions.length} Câu Sai (Free: {subscription?.remainingUses ?? 3}/3 lượt)
                </span>
              </button>
            )
          )}

          <button className="btn btn-secondary" onClick={onRetakeExam}>
            <RotateCcw size={18} /> Làm Lại Đề Này
          </button>

          <button className="btn btn-secondary" onClick={onSelectAnotherExam}>
            <Home size={18} /> Chọn Đề Khác
          </button>
        </div>

        {/* Detailed Question Review Section */}
        <div style={{ textAlign: 'left', borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Chi Tiết Từng Câu Hỏi</h2>
            
            <div className="mode-tabs">
              <button
                className={`mode-tab ${filter === 'wrong' ? 'active' : ''}`}
                onClick={() => setFilter('wrong')}
              >
                Chỉ Câu Sai ({wrongQuestions.length})
              </button>
              <button
                className={`mode-tab ${filter === 'correct' ? 'active' : ''}`}
                onClick={() => setFilter('correct')}
              >
                Chỉ Câu Đúng ({correctCount})
              </button>
              <button
                className={`mode-tab ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                Tất Cả ({total})
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredQuestions.map((q) => {
              const userAns = userAnswers[q.id];
              const isCorrect = userAns === q.correctAnswer;
              const isExpanded = expandedQuestions[q.id] ?? (!isCorrect); // default expand wrong questions

              return (
                <div
                  key={q.id}
                  style={{
                    background: 'var(--bg-surface)',
                    border: `1px solid ${isCorrect ? 'var(--success-border)' : 'var(--danger-border)'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                    onClick={() => toggleExpand(q.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {isCorrect ? (
                        <CheckCircle2 size={22} color="var(--success)" />
                      ) : (
                        <XCircle size={22} color="var(--danger)" />
                      )}
                      <span style={{ fontWeight: '700', fontSize: '1rem' }}>
                        Câu {q.questionNumber}: {q.questionText.slice(0, 80)}...
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge badge-secondary" style={{ fontSize: '0.8rem' }}>
                        {q.level}
                      </span>
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                      <p style={{ fontWeight: '600', marginBottom: '1rem', fontSize: '1rem' }}>
                        {q.questionText}
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
                        {['A', 'B', 'C', 'D'].map(key => {
                          const text = q.options[key];
                          if (!text) return null;
                          const isUser = userAns === key;
                          const isKeyCorrect = q.correctAnswer === key;

                          let bg = 'var(--bg-surface)';
                          let border = 'var(--border-color)';
                          if (isKeyCorrect) {
                            bg = 'var(--success-light)';
                            border = 'var(--success)';
                          } else if (isUser && !isKeyCorrect) {
                            bg = 'var(--danger-light)';
                            border = 'var(--danger)';
                          }

                          return (
                            <div
                              key={key}
                              style={{
                                padding: '0.6rem 0.8rem',
                                borderRadius: 'var(--radius-sm)',
                                border: `1px solid ${border}`,
                                background: bg,
                                fontSize: '0.9rem'
                              }}
                            >
                              <strong>{key}.</strong> {text}
                              {isUser && <span style={{ marginLeft: '0.5rem', fontWeight: '700', color: isKeyCorrect ? 'var(--success)' : 'var(--danger)' }}>(Bạn chọn)</span>}
                              {isKeyCorrect && !isUser && <span style={{ marginLeft: '0.5rem', fontWeight: '700', color: 'var(--success)' }}>(Đáp án đúng)</span>}
                            </div>
                          );
                        })}
                      </div>

                      <div className="explanation-box" style={{ marginTop: '0.75rem' }}>
                        <div className="explanation-title">
                          <HelpCircle size={16} /> Lời giải chi tiết:
                        </div>
                        <div className="explanation-body">
                          <MarkdownViewer content={q.explanation} />
                        </div>
                      </div>

                      {!isCorrect && (
                        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                          <button
                            className="btn btn-purple"
                            style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}
                            onClick={() => onStartEssayReview([q])}
                          >
                            <Sparkles size={15} /> Tự Luận Hóa Câu Này (AI Chấm)
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
