import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Eye, 
  EyeOff, 
  KeyRound,
  GraduationCap,
  Crown,
  MessageCircleQuestion,
  HelpCircle
} from 'lucide-react';
import { gradeEssayAnswer, askAIFollowUp } from '../utils/aiGrader';
import { sound } from '../utils/soundEffects';
import { 
  getSubscriptionStatus, 
  consumeAIEssayUse, 
  canUseAIEssay 
} from '../utils/subscriptionManager';
import MarkdownViewer from './MarkdownViewer';
import ProUpgradeModal from './ProUpgradeModal';

export default function EssayMistakeReview({
  questions = [],
  apiKey = '',
  onOpenApiKeyModal,
  onBack
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [gradingResults, setGradingResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModelAnswer, setShowModelAnswer] = useState({});

  // Follow-up Q&A states
  const [followUpQuery, setFollowUpQuery] = useState('');
  const [followUpLoading, setFollowUpLoading] = useState(false);
  const [followUpReplies, setFollowUpReplies] = useState({});

  // Subscription & Daily Free Quota
  const [subStatus, setSubStatus] = useState(() => getSubscriptionStatus());
  const [showProModal, setShowProModal] = useState(false);
  const [modalInitialExplanation, setModalInitialExplanation] = useState(false);

  useEffect(() => {
    const handleSubChange = () => {
      setSubStatus(getSubscriptionStatus());
    };
    window.addEventListener('subscription-changed', handleSubChange);
    return () => window.removeEventListener('subscription-changed', handleSubChange);
  }, []);

  if (!questions || questions.length === 0) {
    return (
      <div className="main-wrapper">
        <div className="result-card" style={{ padding: '3rem' }}>
          <CheckCircle2 size={48} color="var(--success)" style={{ margin: '0 auto 1rem' }} />
          <h2>Không có câu hỏi sai nào cần ôn tập!</h2>
          <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>
            Bạn đã làm đúng toàn bộ các câu hỏi trong phần này, xin chúc mừng!
          </p>
          <button className="btn btn-primary" onClick={onBack}>
            Quay Lại
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const currentAnswer = answers[currentQ.id] || '';
  const currentResult = gradingResults[currentQ.id];
  const isModelVisible = showModelAnswer[currentQ.id];
  const currentReplies = followUpReplies[currentQ.id] || [];

  const handleAnswerChange = (e) => {
    setAnswers({
      ...answers,
      [currentQ.id]: e.target.value
    });
  };

  const handleSubmitToAI = async () => {
    if (!currentAnswer.trim()) {
      alert("Vui lòng nhập câu trả lời của bạn trước khi nhờ AI chấm bài nhé!");
      return;
    }

    // Check quota: Free has 3 uses/day, Pro has unlimited
    if (!canUseAIEssay()) {
      try { sound.playWrong(); } catch (e) {}
      setModalInitialExplanation(true);
      setShowProModal(true);
      return;
    }

    const consumption = consumeAIEssayUse();
    if (!consumption.success) {
      try { sound.playWrong(); } catch (e) {}
      setModalInitialExplanation(true);
      setShowProModal(true);
      return;
    }
    setSubStatus(getSubscriptionStatus());

    setLoading(true);
    sound.playClick();

    try {
      const result = await gradeEssayAnswer({
        question: currentQ,
        userAnswer: currentAnswer,
        apiKey
      });

      setGradingResults(prev => ({
        ...prev,
        [currentQ.id]: result
      }));

      if (result.score >= 7.0) {
        sound.playCorrect();
      } else {
        sound.playWrong();
      }
    } catch (err) {
      console.error("Lỗi khi chấm bài:", err);
      alert("Có lỗi xảy ra khi chấm bài: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Follow-up question to AI
  const handleSendFollowUp = async () => {
    if (!followUpQuery.trim()) return;

    // Check quota: asking follow-up question also checks quota
    if (!canUseAIEssay()) {
      try { sound.playWrong(); } catch (e) {}
      setModalInitialExplanation(true);
      setShowProModal(true);
      return;
    }

    const consumption = consumeAIEssayUse();
    if (!consumption.success) {
      try { sound.playWrong(); } catch (e) {}
      setModalInitialExplanation(true);
      setShowProModal(true);
      return;
    }
    setSubStatus(getSubscriptionStatus());

    const questionText = followUpQuery.trim();
    setFollowUpQuery('');
    setFollowUpLoading(true);
    try {
      sound.playClick();
      const reply = await askAIFollowUp({
        question: currentQ,
        userQuery: questionText,
        apiKey
      });

      setFollowUpReplies(prev => ({
        ...prev,
        [currentQ.id]: [
          ...(prev[currentQ.id] || []),
          { q: questionText, a: reply, time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) }
        ]
      }));
      sound.playCorrect();
    } catch (err) {
      alert("Lỗi khi hỏi AI: " + err.message);
    } finally {
      setFollowUpLoading(false);
    }
  };

  const wordCount = currentAnswer.trim() ? currentAnswer.trim().split(/\s+/).length : 0;

  return (
    <div className="main-wrapper">
      {/* Header Banner */}
      <div 
        className="exam-header" 
        style={{ 
          borderLeft: subStatus.isPro ? '4px solid #f59e0b' : '4px solid var(--purple)',
          background: subStatus.isPro ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(245, 158, 11, 0.06))' : undefined
        }}
      >
        <div className="exam-title-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: subStatus.isPro ? '#f59e0b' : 'var(--purple)', marginBottom: '0.3rem' }}>
            {subStatus.isPro ? <Crown size={24} color="#f59e0b" /> : <GraduationCap size={24} />}
            <h1 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-main)' }}>
              {subStatus.isPro ? "👑 Phòng Tự Luận Cao Cấp - AI PRO UNLIMITED" : "Ôn Tập Câu Sai Dưới Dạng Tự Luận"}
            </h1>
          </div>
          <div className="exam-meta">
            <span>Câu {currentIndex + 1} / {questions.length} câu cần ôn</span>
            <span>•</span>
            <span>
              {subStatus.isPro ? "Đặc quyền PRO: AI Chấm Không Giới Hạn & Phân Tích Bẫy Đề" : "Hình thức: Tự Luận & AI Phản Hồi (Free)"}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Subscription pill in header */}
          <button
            className={`btn ${subStatus.isPro ? 'pro-btn-gold' : 'btn-secondary'}`}
            style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem' }}
            onClick={() => setShowProModal(true)}
            title="Xem chi tiết gói cước"
          >
            <Crown size={15} color={subStatus.isPro ? "#ffffff" : "#f59e0b"} />
            <span>{subStatus.isPro ? "💎 PRO Unlimited Active" : `Free: Còn ${subStatus.remainingUses}/3 lượt AI`}</span>
          </button>

          {!apiKey && (
            <button
              className="btn btn-secondary"
              style={{ fontSize: '0.85rem' }}
              onClick={onOpenApiKeyModal}
            >
              <KeyRound size={15} color="var(--purple)" /> Cài API Key Gemini
            </button>
          )}
          <button className="btn btn-secondary" onClick={onBack}>
            Quay Lại Kết Quả
          </button>
        </div>
      </div>

      <div className={`essay-container ${subStatus.isPro ? 'pro-studio-card' : ''}`}>
        {/* DAILY QUOTA & PRO NOTICE BANNER */}
        {subStatus.isPro ? (
          <div style={{
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(245, 158, 11, 0.08))',
            border: '1px solid var(--purple-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1.25rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Crown size={20} color="#f59e0b" />
              <div style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                <strong>Tài khoản PRO Unlimited:</strong> Đang hoạt động • Bạn thoải mái viết tự luận và hỏi đáp AI không giới hạn số lần!
              </div>
            </div>
            <span className="badge badge-purple" style={{ fontSize: '0.82rem' }}>
              💎 PRO VIP
            </span>
          </div>
        ) : (
          <div style={{
            background: subStatus.remainingUses > 0 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${subStatus.remainingUses > 0 ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1.25rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Sparkles size={18} color={subStatus.remainingUses > 0 ? "#f59e0b" : "var(--danger)"} />
              <div style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                Gói Miễn Phí: Bạn còn <strong style={{ color: subStatus.remainingUses > 0 ? 'var(--primary)' : 'var(--danger)', fontSize: '1rem' }}>{subStatus.remainingUses} / 3</strong> lượt hỏi AI tự luận hôm nay.
                {subStatus.remainingUses === 0 && (
                  <span style={{ color: 'var(--danger)', fontWeight: '700', marginLeft: '0.4rem' }}>
                    (Đã hết lượt hôm nay)
                  </span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button
                type="button"
                className="btn btn-ghost"
                style={{
                  fontSize: '0.8rem',
                  padding: '0.35rem 0.65rem',
                  border: '1px solid var(--purple-border)',
                  color: 'var(--purple)',
                  fontWeight: '700'
                }}
                onClick={() => {
                  setModalInitialExplanation(true);
                  setShowProModal(true);
                }}
                title="Bấm để xem: Tại sao tính năng AI lại phải trả tiền? (Do mua API mất tiền)"
              >
                ❓ Tại sao tính phí?
              </button>

              <button
                className="btn btn-purple"
                style={{ fontSize: '0.82rem', padding: '0.35rem 0.85rem' }}
                onClick={() => {
                  setModalInitialExplanation(false);
                  setShowProModal(true);
                }}
              >
                <Crown size={15} color="#ffd700" />
                <span>Nâng Cấp PRO (3$/tháng) - Không Giới Hạn</span>
              </button>
            </div>
          </div>
        )}

        {/* Notice & Pedagogical Instructions */}
        <div style={{
          background: 'var(--purple-light)',
          border: '1px solid var(--purple-border)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1.25rem',
          color: 'var(--purple)',
          fontSize: '0.92rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem'
        }}>
          <Sparkles size={20} style={{ flexShrink: 0 }} />
          <span>
            <strong>Bí quyết nhớ sâu:</strong> Các phương án trắc nghiệm A/B/C/D đã được ẩn đi. 
            Hãy thử giải thích bản chất câu hỏi theo lời văn của bạn. AI Giảng viên sẽ đọc và chấm điểm ngay!
          </span>
        </div>

        {/* Question Content */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span className="badge badge-purple">Câu hỏi gốc #{currentQ.questionNumber}</span>
            <span className="badge badge-secondary">{currentQ.level}</span>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', lineHeight: '1.6', color: 'var(--text-main)' }}>
            {currentQ.questionText}
          </h2>
        </div>

        {/* Essay Input Box */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
            ✍️ Bài làm tự luận của bạn:
          </label>
          <textarea
            className="essay-textarea"
            placeholder="Hãy phân tích, giải thích bản chất hoặc nêu câu trả lời của bạn ở đây..."
            value={currentAnswer}
            onChange={handleAnswerChange}
            disabled={loading}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span>Số từ: <strong>{wordCount}</strong> từ</span>
            <span>Gợi ý: Diễn đạt rõ ràng các khái niệm then chốt</span>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn btn-secondary"
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0 || loading}
            >
              <ChevronLeft size={16} /> Câu Trước
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={currentIndex === questions.length - 1 || loading}
            >
              Câu Sau <ChevronRight size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              className="btn btn-secondary"
              onClick={() => setShowModelAnswer(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }))}
            >
              {isModelVisible ? <EyeOff size={16} /> : <Eye size={16} />}
              {isModelVisible ? 'Ẩn Lời Giải Chuẩn' : 'Xem Lời Giải Chuẩn'}
            </button>

            <button
              className="btn btn-purple"
              onClick={handleSubmitToAI}
              disabled={loading || !currentAnswer.trim()}
              style={{ minWidth: '190px' }}
            >
              {loading ? (
                <>
                  <Sparkles size={16} className="spin" /> Đang Chấm Bài...
                </>
              ) : (
                <>
                  <Send size={16} /> Gửi AI Chấm Điểm
                </>
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Model Answer & Standard Options */}
        {isModelVisible && (
          <div className="explanation-box" style={{ marginBottom: '1.5rem', borderLeftColor: 'var(--success)' }}>
            <div className="explanation-title" style={{ color: 'var(--success)' }}>
              <BookOpen size={18} /> Đáp Án Trắc Nghiệm Chuẩn & Lời Giải:
            </div>
            <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
              Đáp án đúng: [{currentQ.correctAnswer}] - {currentQ.options[currentQ.correctAnswer]}
            </p>
            <div className="explanation-body">
              <MarkdownViewer content={currentQ.explanation} />
            </div>
          </div>
        )}

        {/* AI Evaluation Card */}
        {currentResult && (
          <div className="ai-feedback-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="ai-score-badge">
                  {currentResult.score.toFixed(1)} / 10 Điểm
                </span>
                <span style={{ fontWeight: '700', fontSize: '1.1rem', color: currentResult.score >= 7 ? 'var(--success)' : 'var(--warning)' }}>
                  {currentResult.score >= 8.5 ? "Rất Xuất Sắc!" : currentResult.score >= 6.5 ? "Đạt Yêu Cầu!" : "Cần Củng Cố Thêm!"}
                </span>
              </div>

              {currentResult.notice && (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {currentResult.notice}
                </span>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              {/* Strengths */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--success-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--success)', fontWeight: '700', marginBottom: '0.4rem', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={16} /> Ưu Điểm / Ý Đúng:
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                  {currentResult.strengths}
                </p>
              </div>

              {/* Weaknesses */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--warning-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--warning)', fontWeight: '700', marginBottom: '0.4rem', fontSize: '0.92rem' }}>
                  <AlertCircle size={16} /> Điểm Cần Bổ Sung / Lưu Ý:
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                  {currentResult.weaknesses}
                </p>
              </div>
            </div>

            {/* Pedagogical Feedback */}
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1.1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ fontWeight: '700', color: 'var(--purple)', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                💬 Nhận Xét Sư Phạm Của AI:
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                {currentResult.feedback}
              </p>
            </div>

            {/* Suggested Model Answer */}
            {currentResult.modelAnswer && (
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--primary-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.1rem',
                marginBottom: '1.25rem'
              }}>
                <div style={{ fontWeight: '700', color: 'var(--primary)', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                  💡 Câu Trả Lời Mẫu Tham Khảo:
                </div>
                <div style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>
                  <MarkdownViewer content={currentResult.modelAnswer} />
                </div>
              </div>
            )}

            {/* PRO EXCLUSIVE: Phân Tích Bẫy Đề & Mẹo Ghi Nhớ Sâu */}
            {subStatus.isPro ? (
              <>
                {currentResult.distractorAnalysis && (
                  <div className="pro-distractor-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626', fontWeight: '800', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                      <AlertCircle size={18} />
                      <span>🎯 Phân Tích Bẫy Đề Thi (Đặc Quyền PRO VIP):</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                      <MarkdownViewer content={currentResult.distractorAnalysis} />
                    </div>
                  </div>
                )}

                {currentResult.mnemonicTip && (
                  <div className="pro-mnemonic-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--purple)', fontWeight: '800', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                      <Crown size={18} color="#f59e0b" />
                      <span>💡 Bí Quyết Ghi Nhớ Sâu Cốt Lõi (Dành Cho Bạn):</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                      <MarkdownViewer content={currentResult.mnemonicTip} />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="pro-teaser-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Crown size={22} color="#f59e0b" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>
                      Mở khóa Phân Tích Bẫy Đề Thi & Mẹo Nhớ Sâu Cốt Lõi
                    </strong>
                    <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Nâng cấp gói PRO (3$/tháng) để AI giải mã bẫy các phương án gây nhiễu và gợi ý mẹo nhớ đời thực cho bạn.
                    </p>
                  </div>
                </div>
                <button
                  className="btn btn-purple"
                  style={{ fontSize: '0.82rem', padding: '0.35rem 0.8rem', whiteSpace: 'nowrap' }}
                  onClick={() => setShowProModal(true)}
                >
                  <Crown size={14} color="#ffd700" /> Nâng Cấp PRO
                </button>
              </div>
            )}

            {/* INTERACTIVE FEATURE: HỎI THÊM AI VỀ CÂU NÀY */}
            <div style={{
              background: 'var(--bg-surface)',
              border: subStatus.isPro ? '1px solid rgba(245, 158, 11, 0.4)' : '1px dashed var(--purple-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.2rem',
              marginTop: '1.25rem',
              boxShadow: subStatus.isPro ? '0 2px 12px rgba(124, 58, 237, 0.08)' : undefined
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: subStatus.isPro ? '#f59e0b' : 'var(--purple)', fontWeight: '800', fontSize: '0.95rem' }}>
                  {subStatus.isPro ? <Crown size={18} color="#f59e0b" /> : <MessageCircleQuestion size={18} />}
                  <span style={{ color: 'var(--text-main)' }}>
                    {subStatus.isPro 
                      ? "Trợ Lý Giảng Viên AI 1-1 (Đặc Quyền PRO Unlimited)" 
                      : `Hỏi Thêm Giảng Viên AI Về Câu Này (Còn ${subStatus.remainingUses}/3 lượt Free)`
                    }
                  </span>
                </div>
                {subStatus.isPro && (
                  <span className="pro-badge" style={{ fontSize: '0.72rem' }}>
                    ⚡ Phản hồi ưu tiên
                  </span>
                )}
              </div>

              {/* Thread of previous queries */}
              {currentReplies.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '0.85rem', padding: '0.75rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontWeight: '700', color: 'var(--text-main)', fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                    ❓ Bạn hỏi ({item.time}): {item.q}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                    <MarkdownViewer content={item.a} />
                  </div>
                </div>
              ))}

              <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ fontSize: '0.85rem' }}
                  placeholder="Ví dụ: 'Tại sao đáp án B lại sai?', 'Hãy cho ví dụ đời sống dễ nhớ hơn'..."
                  value={followUpQuery}
                  onChange={(e) => setFollowUpQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSendFollowUp(); }}
                  disabled={followUpLoading}
                />
                <button
                  className={`btn ${subStatus.isPro ? 'pro-btn-gold' : 'btn-purple'}`}
                  style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                  onClick={handleSendFollowUp}
                  disabled={followUpLoading || !followUpQuery.trim()}
                >
                  {followUpLoading ? <Sparkles size={15} className="spin" /> : <Send size={15} />}
                  <span>{followUpLoading ? 'AI Đang Trả Lời...' : 'Hỏi AI'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PRO UPGRADE MODAL */}
      <ProUpgradeModal
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        initialShowExplanation={modalInitialExplanation}
        onSubscriptionChanged={() => setSubStatus(getSubscriptionStatus())}
      />
    </div>
  );
}
