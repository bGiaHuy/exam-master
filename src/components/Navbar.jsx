import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Zap, 
  ShieldCheck, 
  ShieldAlert, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  KeyRound, 
  Upload, 
  Home,
  Layers,
  Crown,
  Lock,
  LogOut,
  Sparkles
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

export default function Navbar({
  currentView, // 'home' | 'study' | 'exam_hub' | 'test' | 'result' | 'essay_review' | 'admin'
  onNavigate,
  antiTabEnabled,
  onToggleAntiTab,
  theme,
  onToggleTheme,
  fontSize,
  onChangeFontSize,
  apiKey,
  onOpenApiKeyModal,
  onOpenImportModal,
  subscription = { isPro: false, remainingUses: 3 },
  onOpenProModal,
  isAdmin = false,
  onOpenAdminLogin,
  onLogoutAdmin
}) {
  const [soundActive, setSoundActive] = useState(sound.isSoundEnabled());

  const handleSoundToggle = () => {
    const next = sound.toggleSound();
    setSoundActive(next);
  };

  const cycleFontSize = () => {
    if (fontSize === 'normal') onChangeFontSize('large');
    else if (fontSize === 'large') onChangeFontSize('xlarge');
    else onChangeFontSize('normal');
  };

  return (
    <header className="navbar">
      {/* Brand & Main Navigation Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div className="brand" onClick={() => onNavigate('home')}>
          <div className="brand-icon" style={{
            background: subscription?.isPro ? 'linear-gradient(135deg, #f59e0b, #7c3aed)' : undefined,
            color: '#fff',
            boxShadow: subscription?.isPro ? '0 2px 10px rgba(245, 158, 11, 0.4)' : undefined
          }}>
            {subscription?.isPro ? <Crown size={22} color="#fff" /> : <GraduationCap size={22} />}
          </div>
          <div>
            <div style={{ lineHeight: 1.1, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>ExamMaster</span>
              {subscription?.isPro && (
                <span className="pro-badge" style={{ fontSize: '0.68rem', padding: '0.1rem 0.45rem' }}>
                  PRO
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.68rem', fontWeight: '600', color: subscription?.isPro ? 'var(--purple)' : 'var(--text-muted)' }}>
              {subscription?.isPro ? '⭐ Thành Viên PRO VIP' : 'Học Tập & Thi Cử Thông Minh'}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mode-tabs">
          <button
            className={`mode-tab ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            <Home size={16} />
            <span>Trang Chủ</span>
          </button>

          <button
            className={`mode-tab ${currentView === 'study' ? 'active' : ''}`}
            onClick={() => onNavigate('study')}
          >
            <BookOpen size={16} />
            <span>Học Tập</span>
          </button>

          <button
            className={`mode-tab ${['exam_hub', 'test', 'result', 'essay_review'].includes(currentView) ? 'active' : ''}`}
            onClick={() => onNavigate('exam_hub')}
          >
            <GraduationCap size={16} />
            <span>Thi Cử</span>
          </button>
        </div>
      </div>

      {/* Utility Controls */}
      <div className="nav-actions">
        {/* Focus Mode PRO toggle */}
        {subscription?.isPro ? (
          <button
            className={`btn ${antiTabEnabled ? 'pro-pill-active' : 'btn-ghost'}`}
            style={{
              fontSize: '0.82rem',
              padding: '0.45rem 0.75rem',
              border: antiTabEnabled ? '1px solid rgba(245, 158, 11, 0.6)' : undefined,
              color: antiTabEnabled ? 'var(--text-main)' : 'var(--text-muted)'
            }}
            onClick={onToggleAntiTab}
            title={antiTabEnabled ? "Focus Mode PRO đang BẬT: Bảo vệ phòng thi & chống phân tâm" : "Focus Mode PRO đang TẮT (Bấm để bật)"}
          >
            {antiTabEnabled ? <ShieldCheck size={16} color="#f59e0b" /> : <ShieldAlert size={16} />}
            <span>{antiTabEnabled ? "👑 Focus Mode: Bật" : "Focus Mode: Tắt"}</span>
          </button>
        ) : (
          <button
            className="btn btn-ghost"
            style={{
              fontSize: '0.82rem',
              padding: '0.45rem 0.75rem',
              border: '1px dashed rgba(245, 158, 11, 0.4)',
              color: 'var(--text-muted)'
            }}
            onClick={onToggleAntiTab}
            title="Focus Mode chống thoát tab & phân tâm là đặc quyền PRO VIP (Bấm để xem)"
          >
            <Lock size={14} color="#f59e0b" />
            <span>Focus Mode (PRO)</span>
          </button>
        )}

        {/* Font size adjuster */}
        <button
          className="btn btn-secondary btn-icon-only"
          onClick={cycleFontSize}
          title={`Cỡ chữ: ${fontSize === 'normal' ? 'Chuẩn' : fontSize === 'large' ? 'Lớn' : 'Rất Lớn'} (Bấm để đổi)`}
        >
          <span style={{ fontWeight: '700', fontSize: fontSize === 'xlarge' ? '1.15rem' : fontSize === 'large' ? '1rem' : '0.85rem' }}>
            A
          </span>
        </button>

        {/* Sound toggle */}
        <button
          className="btn btn-secondary btn-icon-only"
          onClick={handleSoundToggle}
          title={soundActive ? "Tắt âm thanh" : "Bật âm thanh"}
        >
          {soundActive ? <Volume2 size={18} /> : <VolumeX size={18} color="var(--text-muted)" />}
        </button>

        {/* Theme toggle */}
        <button
          className="btn btn-secondary btn-icon-only"
          onClick={onToggleTheme}
          title={theme === 'dark' ? "Chuyển giao diện Sáng" : "Chuyển giao diện Tối"}
        >
          {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} />}
        </button>

        {/* API Key Modal Button */}
        <button
          className={`btn ${apiKey ? 'btn-secondary' : 'btn-purple'}`}
          style={{ fontSize: '0.82rem', padding: '0.45rem 0.75rem' }}
          onClick={onOpenApiKeyModal}
          title="Cài đặt API (DeepSeek / Gemini) để chấm bài tự luận & convert slide"
        >
          <KeyRound size={15} />
          <span>{apiKey ? "API: Đã Sẵn Sàng" : "Cài Đặt API"}</span>
        </button>

        {/* PRO Subscription Button */}
        {subscription?.isPro ? (
          <button
            className="btn pro-pill-active"
            style={{
              fontSize: '0.82rem',
              padding: '0.45rem 0.8rem',
              boxShadow: '0 2px 8px rgba(245, 158, 11, 0.25)'
            }}
            onClick={onOpenProModal}
            title="Tài khoản PRO VIP: Không giới hạn lượt hỏi & chấm bài AI"
          >
            <Crown size={15} color="#f59e0b" />
            <span>💎 PRO Unlimited</span>
          </button>
        ) : (
          <button
            className="btn btn-secondary"
            style={{
              fontSize: '0.82rem',
              padding: '0.45rem 0.75rem',
              borderColor: '#f59e0b',
              background: 'rgba(245, 158, 11, 0.08)'
            }}
            onClick={onOpenProModal}
            title={`Gói Miễn Phí: Còn ${subscription?.remainingUses ?? 3}/3 lượt hỏi AI hôm nay (Bấm để nâng cấp PRO $3/tháng)`}
          >
            <Sparkles size={15} color="#f59e0b" />
            <span>Free: {subscription?.remainingUses ?? 3}/3 lượt</span>
          </button>
        )}

        {/* Import Exam Button */}
        <button
          className="btn btn-secondary"
          style={{ fontSize: '0.82rem', padding: '0.45rem 0.75rem' }}
          onClick={onOpenImportModal}
          title="Nhập thêm file đề thi Markdown mới"
        >
          <Upload size={15} />
          <span>Thêm Đề .md</span>
        </button>

        {/* Admin Dashboard / Admin Login Button */}
        {isAdmin ? (
          <button
            className={`btn ${currentView === 'admin' ? 'btn-primary' : 'btn-purple'}`}
            style={{ fontSize: '0.82rem', padding: '0.45rem 0.75rem' }}
            onClick={() => onNavigate('admin')}
            title="Mở Bảng Quản Trị Hệ Thống"
          >
            <ShieldCheck size={15} />
            <span>Admin</span>
          </button>
        ) : (
          <button
            className="btn btn-secondary btn-icon-only"
            style={{ width: '34px', height: '34px', color: 'var(--text-muted)' }}
            onClick={onOpenAdminLogin}
            title="Đăng nhập Quản trị viên (Mật khẩu: 123)"
          >
            <Lock size={15} />
          </button>
        )}
      </div>
    </header>
  );
}
