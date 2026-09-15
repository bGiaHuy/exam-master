import React, { useState } from 'react';
import { 
  Crown, 
  Check, 
  X, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  KeyRound,
  QrCode,
  Lock,
  ArrowRight
} from 'lucide-react';
import { 
  getSubscriptionStatus, 
  activateProWithLicenseKey,
  PRO_PRICE_USD, 
  PRO_PRICE_VND 
} from '../utils/subscriptionManager';
import { getAdminSystemConfig } from '../utils/adminAuth';
import { sound } from '../utils/soundEffects';

export default function ProUpgradeModal({ 
  isOpen, 
  onClose, 
  onSubscriptionChanged,
  onOpenApiKeyModal,
  initialShowExplanation = false,
  onOpenLegalPolicy
}) {
  const [licenseKeyInput, setLicenseKeyInput] = useState('');
  const [message, setMessage] = useState(null);
  const [showApiExplanation, setShowApiExplanation] = useState(initialShowExplanation);
  const [showBankingInfo, setShowBankingInfo] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const status = getSubscriptionStatus();
  const isQuotaExceeded = !status.isPro && status.remainingUses <= 0;

  const handleActivateLicense = (e) => {
    if (e) e.preventDefault();
    setMessage(null);

    if (!licenseKeyInput.trim()) {
      setMessage({ type: 'danger', text: 'Vui lòng nhập mã kích hoạt VIP (License Key) được cấp.' });
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      const sysConfig = getAdminSystemConfig();
      const res = activateProWithLicenseKey(licenseKeyInput, sysConfig.promoCodes || []);

      if (res.success) {
        try { sound.playCorrect(); } catch (err) {}
        setMessage({ type: 'success', text: res.message });
        setLicenseKeyInput('');
        if (onSubscriptionChanged) onSubscriptionChanged();
      } else {
        try { sound.playWrong(); } catch (err) {}
        setMessage({ type: 'danger', text: res.error });
      }
      setIsVerifying(false);
    }, 400);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '660px', maxHeight: '92vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
            }}>
              <Crown size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
                  Nâng Cấp Gói PRO Unlimited
                </h2>
                <button
                  type="button"
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: '1.5px solid var(--purple)',
                    color: 'var(--purple)',
                    background: showApiExplanation ? 'var(--purple-light)' : 'transparent',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => setShowApiExplanation(!showApiExplanation)}
                  title="Xem giải thích tại sao AI tính phí"
                >
                  ?
                </button>
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Bảo vệ tài nguyên AI & Học tập không giới hạn
              </span>
            </div>
          </div>
          <button className="btn btn-ghost btn-icon-only" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Quota Exceeded Alert Banner */}
        {isQuotaExceeded && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--danger)', fontSize: '0.88rem' }}>
              <AlertCircle size={20} style={{ flexShrink: 0 }} />
              <div>
                <strong>Bố đã sử dụng hết 3 lượt hỏi AI miễn phí hôm nay!</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  Hạn ngạch sẽ tự động hồi phục vào 00:00 ngày mai, hoặc kích hoạt mã VIP để mở khóa không giới hạn.
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-ghost"
              style={{
                fontSize: '0.8rem',
                padding: '0.3rem 0.65rem',
                color: 'var(--purple)',
                border: '1px solid var(--purple-border)',
                fontWeight: '700'
              }}
              onClick={() => setShowApiExplanation(!showApiExplanation)}
            >
              ❓ Tại sao tính phí?
            </button>
          </div>
        )}

        {/* Current Status Pill */}
        <div style={{
          background: status.isPro ? 'var(--purple-light)' : 'var(--bg-main)',
          border: `1px solid ${status.isPro ? 'var(--purple-border)' : 'var(--border-color)'}`,
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem 1rem',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Tình trạng tài khoản:</div>
            <div style={{ fontWeight: '700', fontSize: '1rem', color: status.isPro ? 'var(--purple)' : 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {status.isPro ? (
                <>
                  <Crown size={18} color="#f59e0b" />
                  <span>Gói PRO Unlimited (Đang Hoạt Động)</span>
                </>
              ) : (
                <>
                  <span>Gói Miễn Phí (Free Tier)</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: isQuotaExceeded ? 'var(--danger)' : 'var(--warning)' }}>
                    (Còn {status.remainingUses}/3 lượt hỏi AI hôm nay)
                  </span>
                </>
              )}
            </div>
          </div>

          {status.isPro ? (
            <span className="badge badge-purple" style={{ fontSize: '0.82rem' }}>
              Không Giới Hạn
            </span>
          ) : (
            <span className={`badge ${isQuotaExceeded ? 'badge-danger' : 'badge-warning'}`} style={{ fontSize: '0.82rem' }}>
              {isQuotaExceeded ? 'Hết lượt hôm nay' : '3 lượt / ngày'}
            </span>
          )}
        </div>

        {/* THE "?" EXPLANATION ACCORDION CARD */}
        <div style={{
          background: showApiExplanation ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(37, 99, 235, 0.08))' : 'var(--bg-surface)',
          border: `1px solid ${showApiExplanation ? 'var(--purple-border)' : 'var(--border-color)'}`,
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1.1rem',
          marginBottom: '1.25rem',
          transition: 'all 0.2s ease'
        }}>
          <div 
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
            onClick={() => setShowApiExplanation(!showApiExplanation)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: 'var(--purple)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '900',
                fontSize: '0.9rem'
              }}>
                ?
              </div>
              <span style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--text-main)' }}>
                Tại sao tính năng AI phải trả tiền? (Do mua API tốn chi phí thực)
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--purple)', fontSize: '0.82rem', fontWeight: '700' }}>
              <span>{showApiExplanation ? 'Thu gọn' : 'Bấm xem lý do'}</span>
              {showApiExplanation ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>

          {showApiExplanation && (
            <div style={{
              marginTop: '0.85rem',
              paddingTop: '0.85rem',
              borderTop: '1px solid var(--purple-border)',
              fontSize: '0.85rem',
              color: 'var(--text-main)',
              lineHeight: '1.6'
            }}>
              <div style={{ marginBottom: '0.75rem' }}>
                <strong style={{ color: 'var(--purple)' }}>1. Chi phí mua API thực tế (Tính tiền theo từng từ Token):</strong><br />
                Mỗi khi Bố bấm nộp bài để AI chấm điểm hoặc chuyển đổi slide, hệ thống phải gửi dữ liệu lên máy chủ DeepSeek/Gemini. Mỗi yêu cầu đều bị nhà cung cấp trừ tiền trực tiếp vào tài khoản ngân hàng của chủ hệ thống.
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <strong style={{ color: 'var(--purple)' }}>2. Chống lạm dụng & Bảo mật API Key:</strong><br />
                Nếu mở tự do cho mọi người bấm là có PRO, tài khoản API sẽ bị bot hoặc người dùng lạ bào cạn số dư chỉ trong vài phút. Do đó, hệ thống bắt buộc kích hoạt bằng <strong>Mã Bản Quyền VIP (License Key)</strong>.
              </div>

              <div>
                <strong style={{ color: 'var(--purple)' }}>3. Giải pháp miễn phí thay thế (BYOK):</strong><br />
                Nếu Bố đã có API Key riêng của Google Gemini (miễn phí) hoặc DeepSeek, Bố hoàn toàn có thể tự nhập vào mà không cần trả phí bất kỳ đồng nào!
              </div>
            </div>
          )}
        </div>

        {/* Feature Highlights Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* Free Tier */}
          <div style={{
            background: 'var(--bg-main)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem'
          }}>
            <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-muted)' }}>
              🌱 Gói Miễn Phí
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', lineHeight: '1.8' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check size={15} color="var(--success)" /> 3 lần hỏi AI tự luận / ngày
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check size={15} color="var(--success)" /> Thi trắc nghiệm không giới hạn
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                <X size={15} color="var(--danger)" /> Hết 3 lượt phải đợi 00:00 hôm sau
              </li>
            </ul>
          </div>

          {/* Pro Tier */}
          <div style={{
            background: 'var(--bg-card)',
            border: '2px solid var(--purple)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem'
          }}>
            <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem', fontWeight: '800', color: 'var(--purple)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Crown size={16} color="#f59e0b" /> Gói PRO Unlimited
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', lineHeight: '1.8' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: 'var(--purple)' }}>
                <Sparkles size={15} color="var(--purple)" /> Không giới hạn hỏi & chấm AI
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: '#b45309' }}>
                <ShieldCheck size={15} color="#f59e0b" /> Focus Mode PRO: Chống thoát tab
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={15} color="#f59e0b" /> Phản hồi máy chủ tức thì 1-2s
              </li>
            </ul>
          </div>
        </div>

        {/* Message Banner */}
        {message && (
          <div style={{
            background: message.type === 'success' ? 'var(--success-light)' : 'var(--danger-light)',
            color: message.type === 'success' ? 'var(--success)' : 'var(--danger)',
            border: `1px solid ${message.type === 'success' ? 'var(--success-border)' : 'var(--danger-border)'}`,
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            fontSize: '0.88rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{message.text}</span>
          </div>
        )}

        {/* SECURE ACTIVATION BOX */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1.5px solid var(--purple-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          marginBottom: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Lock size={18} color="var(--purple)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
              Kích Hoạt Gói PRO Bằng Mã VIP (License Key)
            </h3>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.5' }}>
            Để bảo mật API key và chi phí máy chủ, tính năng PRO chỉ mở khi có Mã Kích Hoạt do Quản trị viên cấp.
          </p>

          <form onSubmit={handleActivateLicense} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input
              type="text"
              className="form-input"
              style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginTop: 0, fontFamily: 'monospace' }}
              placeholder="Nhập mã VIP (ví dụ: PROVIP2026, VIP-2026-XXXX-XXXX)..."
              value={licenseKeyInput}
              disabled={isVerifying}
              onChange={(e) => setLicenseKeyInput(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-purple"
              disabled={isVerifying || !licenseKeyInput.trim()}
              style={{ whiteSpace: 'nowrap', minWidth: '150px' }}
            >
              {isVerifying ? 'Đang Kiểm Tra...' : (
                <>
                  <Crown size={16} /> Kích Hoạt VIP
                </>
              )}
            </button>
          </form>

          {/* Payment & Contact Admin Info Toggle */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Chưa có mã VIP? Nâng cấp chỉ <strong>$3 USD / tháng (~75.000đ)</strong>
              </span>
              <button
                type="button"
                className="btn btn-ghost"
                style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem', color: 'var(--primary)', fontWeight: '700' }}
                onClick={() => setShowBankingInfo(!showBankingInfo)}
              >
                {showBankingInfo ? 'Ẩn thông tin thanh toán' : 'Xem thông tin chuyển khoản / Nhận mã'}
              </button>
            </div>

            {showBankingInfo && (
              <div style={{
                marginTop: '0.75rem',
                padding: '0.85rem 1rem',
                background: 'var(--bg-main)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.84rem',
                border: '1px dashed var(--primary-border)'
              }}>
                <div style={{ fontWeight: '700', color: 'var(--primary)', marginBottom: '0.4rem' }}>
                  📌 Hướng dẫn chuyển khoản nhận Mã Kích Hoạt:
                </div>
                <ul style={{ margin: '0 0 0.5rem 1.2rem', padding: 0, lineHeight: '1.6' }}>
                  <li>Số tiền: <strong>75.000 VNĐ / 30 ngày</strong></li>
                  <li>Nội dung chuyển: <code>EXAM PRO [Số điện thoại hoặc tên Bố]</code></li>
                  <li>Liên hệ Admin qua <strong>Telegram <a href="https://t.me/huygia219" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>@huygia219</a></strong> để nhận ngay Mã VIP bản quyền kích hoạt tức thì!</li>
                </ul>
              </div>
            )}
          </div>

          {/* Legal & Refund Policy Transparency Note */}
          <div style={{
            marginTop: '0.85rem',
            paddingTop: '0.65rem',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.78rem',
            color: 'var(--text-subtle)',
            lineHeight: '1.5'
          }}>
            <div>
              🛡️ <strong>Minh bạch tài chính:</strong> Gói cước là trả trước theo thời hạn cố định, <strong>KHÔNG tự động trừ tiền thẻ</strong> và <strong>KHÔNG tự động gia hạn ngầm</strong>.
            </div>
            <div style={{ marginTop: '0.25rem' }}>
              Bằng việc kích hoạt, bạn xác nhận đồng ý với{' '}
              <button 
                type="button" 
                className="footer-link-btn" 
                style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: '600' }}
                onClick={() => {
                  onClose();
                  if (onOpenLegalPolicy) onOpenLegalPolicy('terms');
                }}
              >
                Điều Khoản Dịch Vụ
              </button>
              {' '}và{' '}
              <button 
                type="button" 
                className="footer-link-btn" 
                style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: '600' }}
                onClick={() => {
                  onClose();
                  if (onOpenLegalPolicy) onOpenLegalPolicy('payment');
                }}
              >
                Chính Sách Hoàn Tiền
              </button>.
            </div>
          </div>
        </div>

        {/* Free BYOK Alternative Option */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          paddingTop: '0.5rem',
          borderTop: '1px solid var(--border-color)',
          fontSize: '0.82rem'
        }}>
          <span style={{ color: 'var(--text-muted)' }}>
            Có API Key cá nhân của riêng bạn?
          </span>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              onClose();
              if (onOpenApiKeyModal) onOpenApiKeyModal();
            }}
          >
            <KeyRound size={14} /> Nhập API Key Cá Nhân Miễn Phí
          </button>
        </div>
      </div>
    </div>
  );
}
