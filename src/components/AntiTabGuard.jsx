import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2, Crown, Lock } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export default function AntiTabGuard({
  enabled = true,
  isPro = false,
  maxStrikes = 3,
  isExamActive = false,
  onStrikesChange,
  onMaxStrikesReached
}) {
  const [strikes, setStrikes] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [violationReason, setViolationReason] = useState('');
  const lastViolationTime = useRef(0);

  useEffect(() => {
    // Focus Mode is exclusively enforced for PRO users when enabled
    if (!enabled || !isExamActive || !isPro) return;

    const handleViolation = (reason) => {
      const now = Date.now();
      // Debounce violations within 1.5s (blur and visibilitychange often fire simultaneously)
      if (now - lastViolationTime.current < 1500) return;
      lastViolationTime.current = now;

      sound.playWarning();
      setViolationReason(reason);
      setStrikes(prev => {
        const next = prev + 1;
        setShowAlert(true);
        if (onStrikesChange) onStrikesChange(next);
        if (next >= maxStrikes) {
          if (onMaxStrikesReached) {
            setTimeout(() => {
              onMaxStrikesReached(next);
            }, 1200);
          }
        }
        return next;
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleViolation('Chuyển tab trình duyệt hoặc thu nhỏ cửa sổ');
      }
    };

    const handleWindowBlur = () => {
      handleViolation('Mất tiêu điểm cửa sổ (chuyển sang ứng dụng khác)');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [enabled, isExamActive, isPro, maxStrikes, onStrikesChange, onMaxStrikesReached]);

  if (!showAlert) return null;

  const isDisqualified = strikes >= maxStrikes;

  return (
    <div className="modal-overlay" style={{ zIndex: 9999 }}>
      <div className="modal-content cheat-alert-card" style={{ maxWidth: '520px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: isDisqualified ? 'var(--danger-light)' : 'rgba(245, 158, 11, 0.15)',
            color: isDisqualified ? 'var(--danger)' : '#f59e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
          }}>
            {isDisqualified ? <ShieldAlert size={38} /> : <Crown size={38} />}
          </div>
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(124, 58, 237, 0.12)', color: 'var(--purple)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: '800', marginBottom: '0.6rem' }}>
          <Crown size={14} color="#f59e0b" /> GIÁM SÁT FOCUS MODE PRO
        </div>

        <h2 style={{ color: isDisqualified ? 'var(--danger)' : '#d97706', marginBottom: '0.5rem', fontSize: '1.35rem' }}>
          {isDisqualified ? "VI PHẠM QUÁ SỐ LẦN CHO PHÉP!" : "CẢNH BÁO: RỜI KHỎI MÀN HÌNH THI!"}
        </h2>

        <p style={{ color: 'var(--text-main)', fontSize: '0.98rem', margin: '0.6rem 0', lineHeight: '1.5' }}>
          Hệ thống Focus Mode phát hiện bạn vừa: <strong>{violationReason || 'Rời khỏi tab làm bài'}</strong>.
        </p>

        <div style={{
          background: isDisqualified ? 'var(--danger-light)' : 'rgba(245, 158, 11, 0.12)',
          border: `1px solid ${isDisqualified ? 'var(--danger-border)' : 'rgba(245, 158, 11, 0.4)'}`,
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem 1rem',
          color: isDisqualified ? 'var(--danger)' : '#b45309',
          fontWeight: '800',
          fontSize: '1.15rem',
          margin: '1rem 0'
        }}>
          Số lần vi phạm: {strikes} / {maxStrikes}
        </div>

        {isDisqualified ? (
          <div>
            <p style={{ color: 'var(--danger)', fontWeight: '700', fontSize: '0.95rem', marginBottom: '1rem' }}>
              Bạn đã vi phạm quy chế tập trung {maxStrikes} lần! Focus Mode PRO sẽ tự động thu và nộp bài thi ngay bây giờ để đảm bảo tính kỷ luật.
            </p>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Đang tổng hợp điểm số...
            </div>
          </div>
        ) : (
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: '1.5' }}>
              Vui lòng giữ mắt trên bài thi, không chuyển tab hay thu nhỏ cửa sổ. Bạn còn <strong>{maxStrikes - strikes} lần cảnh cáo</strong> trước khi bài thi bị cưỡng chế nộp.
            </p>
            <button
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.8rem', fontSize: '0.98rem', fontWeight: '700' }}
              onClick={() => setShowAlert(false)}
            >
              <CheckCircle2 size={18} /> Tôi Cam Kết Tập Trung Và Tiếp Tục Làm
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

