import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ShieldCheck, 
  LogIn, 
  LogOut, 
  Sparkles, 
  Crown, 
  CheckCircle2, 
  AlertCircle, 
  Settings, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  KeyRound,
  Mail,
  Trash2,
  Copy,
  Check,
  Globe
} from 'lucide-react';
import { 
  getCurrentUser, 
  getSsoConfig, 
  saveSsoConfig, 
  loginWithGoogleCredential, 
  loginWithMicrosoftProfile, 
  logoutSsoUser, 
  loadGoogleIdentityScript 
} from '../utils/ssoAuth';
import { sound } from '../utils/soundEffects';

// Official SVG Brand Logos
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
  </svg>
);

const MicrosoftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 23 23" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path fill="#f35325" d="M1 1h10v10H1z" />
    <path fill="#81bc06" d="M12 1h10v10H12z" />
    <path fill="#05a6f0" d="M1 12h10v10H1z" />
    <path fill="#ffba08" d="M12 12h10v10H12z" />
  </svg>
);

export default function SsoLoginModal({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onOpenLegalPolicy
}) {
  const [ssoConfig, setConfig] = useState(() => getSsoConfig());
  const [showConfigDrawer, setShowConfigDrawer] = useState(false);
  
  // Config form inputs
  const [googleClientId, setGoogleClientId] = useState(ssoConfig.googleClientId || '');
  const [microsoftClientId, setMicrosoftClientId] = useState(ssoConfig.microsoftClientId || '');
  const [allowedDomainsInput, setAllowedDomainsInput] = useState(
    (ssoConfig.allowedDomains || []).join(', ')
  );
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [copiedOrigin, setCopiedOrigin] = useState(false);

  const googleBtnContainerRef = useRef(null);
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';

  useEffect(() => {
    if (!isOpen) {
      setAuthError(null);
      setSaveSuccessMsg(null);
      return;
    }

    const currentConfig = getSsoConfig();
    setConfig(currentConfig);
    setGoogleClientId(currentConfig.googleClientId || '');
    setMicrosoftClientId(currentConfig.microsoftClientId || '');
    setAllowedDomainsInput((currentConfig.allowedDomains || []).join(', '));

    // If Google Client ID is configured, load Google Identity Services SDK
    if (currentConfig.googleClientId && typeof window !== 'undefined') {
      loadGoogleIdentityScript().then((loaded) => {
        if (loaded && window.google?.accounts?.id && googleBtnContainerRef.current) {
          try {
            window.google.accounts.id.initialize({
              client_id: currentConfig.googleClientId.trim(),
              callback: (response) => {
                const res = loginWithGoogleCredential(response.credential);
                if (res.success) {
                  sound.playCorrect();
                  if (onLoginSuccess) onLoginSuccess(res.user);
                  onClose();
                } else {
                  sound.playWrong();
                  setAuthError(res.error);
                }
              }
            });

            // Clear previous button contents
            googleBtnContainerRef.current.innerHTML = '';

            window.google.accounts.id.renderButton(googleBtnContainerRef.current, {
              theme: 'filled_blue',
              size: 'large',
              shape: 'rectangular',
              text: 'signin_with',
              width: 320
            });
          } catch (e) {
            console.error("GIS init error:", e);
          }
        }
      });
    }
  }, [isOpen, ssoConfig.googleClientId]);

  if (!isOpen) return null;

  const handleCopyOrigin = () => {
    if (currentOrigin && typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(currentOrigin);
      setCopiedOrigin(true);
      sound.playClick();
      setTimeout(() => setCopiedOrigin(false), 2000);
    }
  };

  const handleSaveDirectGoogleId = (e) => {
    e.preventDefault();
    const trimmed = googleClientId.trim();
    if (!trimmed) {
      setAuthError("Vui lòng nhập Google Client ID.");
      return;
    }

    const updated = {
      ...ssoConfig,
      googleClientId: trimmed
    };

    saveSsoConfig(updated);
    setConfig(getSsoConfig());
    setSaveSuccessMsg("Đã lưu và kích hoạt Google SSO thành công!");
    setAuthError(null);
    sound.playCorrect();
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const handleSaveFullSettings = (e) => {
    e.preventDefault();
    const domains = allowedDomainsInput
      .split(',')
      .map(d => d.trim())
      .filter(Boolean);

    const updated = {
      googleClientId: googleClientId.trim(),
      microsoftClientId: microsoftClientId.trim(),
      allowedDomains: domains
    };

    saveSsoConfig(updated);
    setConfig(getSsoConfig());
    setSaveSuccessMsg("Đã lưu cấu hình SSO thành công!");
    sound.playClick();
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const handleClearGoogleId = () => {
    saveSsoConfig({ googleClientId: '' });
    setConfig(getSsoConfig());
    setGoogleClientId('');
    setSaveSuccessMsg("Đã gỡ bỏ Google Client ID.");
    sound.playClick();
    setTimeout(() => setSaveSuccessMsg(null), 2500);
  };

  const handleMicrosoftClick = () => {
    if (ssoConfig.microsoftClientId) {
      const redirectUri = window.location.origin;
      const msAuthUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${encodeURIComponent(
        ssoConfig.microsoftClientId
      )}&response_type=token&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=openid%20profile%20email%20User.Read`;

      const popup = window.open(msAuthUrl, 'ms_login_popup', 'width=520,height=620');
      if (!popup) {
        setAuthError("Trình duyệt đã chặn cửa sổ pop-up. Vui lòng cho phép pop-up để đăng nhập Microsoft.");
      }
    } else {
      setShowConfigDrawer(true);
      setAuthError("Microsoft Client ID chưa được thiết lập. Bạn có thể cài đặt trong phần Cấu Hình bên dưới.");
      sound.playClick();
    }
  };

  const handleLogout = () => {
    logoutSsoUser();
    sound.playClick();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content sso-modal-card" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '560px', width: '92%' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)', 
                color: '#fff', 
                width: '36px', 
                height: '36px', 
                borderRadius: '10px',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)'
              }}>
                <LogIn size={20} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0 }}>
                {currentUser ? 'Hồ Sơ Tài Khoản SSO' : 'Đăng Nhập Single Sign-On'}
              </h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, marginTop: '0.2rem' }}>
              {currentUser 
                ? 'Quản lý phiên đăng nhập và thông tin tài khoản của bạn'
                : 'Đăng nhập bảo mật một chạm bằng tài khoản Google hoặc Microsoft'
              }
            </p>
          </div>
          <button className="btn btn-ghost btn-icon-only" onClick={onClose} title="Đóng">
            <X size={18} />
          </button>
        </div>

        {/* Error Alert */}
        {authError && (
          <div className="alert-box alert-danger" style={{ margin: '1rem 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem' }}>
            <AlertCircle size={18} color="var(--danger)" style={{ flexShrink: 0 }} />
            <span>{authError}</span>
          </div>
        )}

        {/* Success Alert */}
        {saveSuccessMsg && (
          <div className="alert-box alert-success" style={{ margin: '1rem 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem' }}>
            <CheckCircle2 size={18} color="var(--success)" style={{ flexShrink: 0 }} />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        <div className="modal-body" style={{ padding: '1.25rem 1.5rem' }}>
          {/* 1. STATE: CURRENTLY LOGGED IN */}
          {currentUser ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem',
                background: 'var(--primary-light)',
                border: '1px solid var(--primary-border)',
                padding: '1.2rem',
                borderRadius: 'var(--radius-lg)'
              }}>
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    border: '2px solid #fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.src = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(currentUser.email)}`;
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0 }}>
                      {currentUser.name}
                    </h4>
                    {currentUser.isPro ? (
                      <span className="pro-badge" style={{ fontSize: '0.68rem', padding: '0.1rem 0.45rem' }}>
                        ⭐ VIP PRO
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.72rem', background: 'rgba(0,0,0,0.06)', padding: '0.1rem 0.45rem', borderRadius: '4px', fontWeight: '600' }}>
                        Học Viên Miễn Phí
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Mail size={14} />
                    <span>{currentUser.email}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '0.3rem' }}>
                    Nhà cung cấp: <strong>{currentUser.provider?.toUpperCase()}</strong> • Đăng nhập lúc: {new Date(currentUser.loggedInAt || Date.now()).toLocaleTimeString()}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                <button 
                  type="button"
                  className="footer-link-btn" 
                  style={{ fontSize: '0.82rem', color: 'var(--danger)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  onClick={() => {
                    onClose();
                    if (onOpenLegalPolicy) onOpenLegalPolicy('deletion');
                  }}
                >
                  <Trash2 size={14} /> Xóa Dữ Liệu Cục Bộ
                </button>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <button className="btn btn-secondary" onClick={onClose} style={{ fontSize: '0.88rem' }}>
                    Tiếp Tục Học Tập
                  </button>
                  <button 
                    className="btn btn-danger" 
                    onClick={handleLogout}
                    style={{ fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <LogOut size={16} />
                    <span>Đăng Xuất</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* 2. STATE: NOT LOGGED IN */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* If Google Client ID is configured: Show GIS Button */}
              {ssoConfig.googleClientId ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
                  <div ref={googleBtnContainerRef} style={{ width: '100%', display: 'flex', justifyContent: 'center', minHeight: '44px' }}>
                    {/* Google Identity Services button mounts here */}
                  </div>

                  {/* Microsoft Sign In */}
                  <button 
                    className="sso-btn sso-btn-microsoft"
                    onClick={handleMicrosoftClick}
                    style={{ width: '100%' }}
                  >
                    <MicrosoftIcon />
                    <span>Đăng nhập với Microsoft (Email FPT / Office 365)</span>
                  </button>
                </div>
              ) : (
                /* Google Client ID is NOT configured yet: Prominently provide the input box! */
                <div style={{
                  background: 'var(--bg-card)',
                  border: '1.5px solid var(--primary-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                    <KeyRound size={20} />
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '800' }}>
                      Cài Đặt Google Client ID (SSO ID)
                    </h4>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.5' }}>
                    Điền <strong>Google OAuth Client ID</strong> của bạn vào ô bên dưới để kích hoạt nút đăng nhập Google một chạm:
                  </p>

                  <form onSubmit={handleSaveDirectGoogleId} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <input 
                        type="text"
                        className="form-input"
                        placeholder="Dán Client ID (ví dụ: 123456789-abcdef.apps.googleusercontent.com)"
                        value={googleClientId}
                        onChange={(e) => setGoogleClientId(e.target.value)}
                        style={{ fontSize: '0.85rem', padding: '0.6rem 0.75rem', width: '100%' }}
                        autoFocus
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
                        <Globe size={14} />
                        <span>Origin: <code>{currentOrigin || 'localhost'}</code></span>
                        <button 
                          type="button" 
                          className="btn btn-ghost" 
                          onClick={handleCopyOrigin}
                          style={{ padding: '0.15rem 0.4rem', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
                          title="Sao chép Origin"
                        >
                          {copiedOrigin ? <Check size={12} color="var(--success)" /> : <Copy size={12} />}
                          <span>{copiedOrigin ? 'Đã chép' : 'Sao chép'}</span>
                        </button>
                      </div>

                      <button type="submit" className="btn btn-primary" style={{ fontSize: '0.86rem', padding: '0.45rem 1rem', fontWeight: '700' }}>
                        Lưu & Kích Hoạt Google SSO
                      </button>
                    </div>
                  </form>

                  {/* Quick Setup Instructions */}
                  <div style={{
                    marginTop: '1rem',
                    paddingTop: '0.85rem',
                    borderTop: '1px dashed var(--border-color)',
                    fontSize: '0.78rem',
                    color: 'var(--text-subtle)',
                    lineHeight: '1.5'
                  }}>
                    <strong style={{ color: 'var(--text-main)' }}>Cách lấy Google Client ID:</strong>
                    <ol style={{ margin: '0.3rem 0 0 1.2rem', padding: 0 }}>
                      <li>Truy cập <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Google Cloud Console Credentials <ExternalLink size={11} style={{ display: 'inline' }} /></a>.</li>
                      <li>Tạo <strong>OAuth 2.0 Client ID</strong> (loại Web Application).</li>
                      <li>Mục <strong>Authorized JavaScript origins</strong>: Thêm <code>{currentOrigin}</code>.</li>
                      <li>Dán Client ID vào ô trên và bấm <strong>Lưu & Kích Hoạt</strong>.</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* Consent & Policy Links */}
              <div style={{ fontSize: '0.76rem', color: 'var(--text-subtle)', textAlign: 'center', lineHeight: '1.4', marginTop: '0.2rem' }}>
                Bằng việc đăng nhập, bạn đồng ý với{' '}
                <button 
                  type="button" 
                  className="footer-link-btn" 
                  style={{ fontSize: '0.76rem', color: 'var(--primary)', fontWeight: '600' }}
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
                  style={{ fontSize: '0.76rem', color: 'var(--primary)', fontWeight: '600' }}
                  onClick={() => {
                    onClose();
                    if (onOpenLegalPolicy) onOpenLegalPolicy('privacy');
                  }}
                >
                  Chính Sách Quyền Riêng Tư
                </button>.
              </div>

              {/* Collapsible Full SSO Settings Drawer (If Client ID already set, user can still edit it here) */}
              {ssoConfig.googleClientId && (
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                  <button 
                    className="btn btn-ghost" 
                    onClick={() => setShowConfigDrawer(!showConfigDrawer)}
                    style={{ 
                      width: '100%', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      fontSize: '0.82rem',
                      color: 'var(--text-muted)',
                      padding: '0.4rem 0.6rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Settings size={15} />
                      <span>⚙️ Quản Lý & Đổi SSO Client ID (Google / Microsoft)</span>
                    </div>
                    {showConfigDrawer ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {showConfigDrawer && (
                    <form onSubmit={handleSaveFullSettings} style={{ marginTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                          <label style={{ fontSize: '0.78rem', fontWeight: '700' }}>
                            Google OAuth Client ID
                          </label>
                          <button 
                            type="button" 
                            onClick={handleClearGoogleId}
                            style={{ fontSize: '0.72rem', color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                          >
                            Gỡ bỏ ID này
                          </button>
                        </div>
                        <input 
                          type="text"
                          className="form-input"
                          placeholder="Ví dụ: 123456789-abcdef.apps.googleusercontent.com"
                          value={googleClientId}
                          onChange={(e) => setGoogleClientId(e.target.value)}
                          style={{ fontSize: '0.82rem', padding: '0.45rem 0.6rem', width: '100%' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '0.25rem' }}>
                          Microsoft Entra Client ID (Tùy chọn)
                        </label>
                        <input 
                          type="text"
                          className="form-input"
                          placeholder="Ví dụ: 89a8c17b-4029-4b68-967c-..."
                          value={microsoftClientId}
                          onChange={(e) => setMicrosoftClientId(e.target.value)}
                          style={{ fontSize: '0.82rem', padding: '0.45rem 0.6rem', width: '100%' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '0.25rem' }}>
                          Giới hạn Tên Miền Email (Phân tách bằng dấu phẩy)
                        </label>
                        <input 
                          type="text"
                          className="form-input"
                          placeholder="Để trống = Mọi email (hoặc ví dụ: fpt.edu.vn, gmail.com)"
                          value={allowedDomainsInput}
                          onChange={(e) => setAllowedDomainsInput(e.target.value)}
                          style={{ fontSize: '0.82rem', padding: '0.45rem 0.6rem', width: '100%' }}
                        />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
                        <button type="submit" className="btn btn-primary" style={{ fontSize: '0.82rem', padding: '0.4rem 0.9rem' }}>
                          Lưu Thay Đổi Cấu Hình
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
