import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  LogOut, 
  ArrowLeft, 
  BookOpen, 
  GraduationCap, 
  Upload, 
  Trash2, 
  Download, 
  Plus, 
  Check, 
  X, 
  KeyRound, 
  Crown, 
  Sparkles, 
  Settings, 
  Layers, 
  AlertCircle, 
  CheckCircle2, 
  RotateCcw,
  Zap,
  Eye,
  Database,
  Cpu,
  Binary,
  Tag,
  Copy,
  LogIn,
  Mail
} from 'lucide-react';
import { 
  adminLogout, 
  changeAdminPassword, 
  getAdminSystemConfig, 
  saveAdminSystemConfig 
} from '../utils/adminAuth';
import { 
  getSubscriptionStatus, 
  upgradeToPro, 
  downgradeToFree, 
  resetDailyUsage 
} from '../utils/subscriptionManager';
import { generateVipLicenseKey, generateSymmetricLicenseKey, verifySymmetricLicenseKey } from '../utils/cryptoSecurity.js';
import { getMaskedSystemApiKey, setSystemApiKey } from '../data/apiConfig.js';
import { getSsoConfig, saveSsoConfig, getLoginHistory } from '../utils/ssoAuth.js';
import { sound } from '../utils/soundEffects';

export default function AdminDashboard({
  exams = [],
  onDeleteCustomExam,
  onOpenImportModal,
  onOpenApiKeyModal,
  apiKey,
  onStartExam,
  onBackToHome
}) {
  // Tabs: 'overview' | 'exams' | 'subscription' | 'settings'
  const [activeTab, setActiveTab] = useState('overview');
  
  // Subscription state
  const [subStatus, setSubStatus] = useState(() => getSubscriptionStatus());
  
  // System config state
  const [sysConfig, setSysConfig] = useState(() => getAdminSystemConfig());
  
  // Password change states
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMessage, setPwdMessage] = useState(null);

  // New promo code & Symmetric Key states
  const [newPromoCode, setNewPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('30D');
  const [lastGeneratedKey, setLastGeneratedKey] = useState('');

  // System API key state
  const [systemKeyInput, setSystemKeyInput] = useState('');
  const [systemKeyMsg, setSystemKeyMsg] = useState(null);
  const [currentMaskedKey, setCurrentMaskedKey] = useState(() => getMaskedSystemApiKey());

  // Filter for exams tab
  const [examSubjectFilter, setExamSubjectFilter] = useState('ALL');

  // SSO Configuration state
  const [ssoConfig, setSsoConfig] = useState(() => getSsoConfig());
  const [ssoGoogleClientId, setSsoGoogleClientId] = useState(() => getSsoConfig().googleClientId || '');
  const [ssoMicrosoftClientId, setSsoMicrosoftClientId] = useState(() => getSsoConfig().microsoftClientId || '');
  const [ssoAllowedDomains, setSsoAllowedDomains] = useState(() => (getSsoConfig().allowedDomains || []).join(', '));
  const [ssoAutoProDomains, setSsoAutoProDomains] = useState(() => (getSsoConfig().autoProDomains || []).join(', '));
  const [ssoSaveMsg, setSsoSaveMsg] = useState(null);
  const [ssoHistory, setSsoHistory] = useState(() => getLoginHistory());

  useEffect(() => {
    const handleSubChange = () => setSubStatus(getSubscriptionStatus());
    window.addEventListener('subscription-changed', handleSubChange);
    return () => window.removeEventListener('subscription-changed', handleSubChange);
  }, []);

  const totalQuestions = exams.reduce((acc, ex) => acc + (ex.questions?.length || 0), 0);
  const customExamsCount = exams.filter(ex => ex.id?.startsWith('exam-custom-') || !['dbi-ch1', 'dbi-ch2', 'cea-ch3'].includes(ex.id)).length;

  const handleLogout = () => {
    adminLogout();
    sound.playClick();
    onBackToHome();
  };

  const handleTogglePro = () => {
    if (subStatus.isPro) {
      downgradeToFree();
      try { sound.playClick(); } catch (e) {}
    } else {
      upgradeToPro(30);
      try { sound.playCorrect(); } catch (e) {}
    }
  };

  const handleResetQuota = () => {
    resetDailyUsage();
    try { sound.playCorrect(); } catch (e) {}
    alert("Đã đặt lại: Lượt dùng AI hôm nay đã trở về 0/3 (Bạn có đủ 3 lượt)");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPwdMessage(null);

    if (newPassword !== confirmPassword) {
      setPwdMessage({ type: 'error', text: 'Mật khẩu mới và xác nhận mật khẩu không khớp.' });
      return;
    }

    const res = changeAdminPassword(oldPassword, newPassword);
    if (res.success) {
      try { sound.playCorrect(); } catch (err) {}
      setPwdMessage({ type: 'success', text: 'Đổi mật khẩu quản trị viên thành công!' });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      try { sound.playWrong(); } catch (err) {}
      setPwdMessage({ type: 'error', text: res.error || 'Đổi mật khẩu thất bại.' });
    }
  };

  const handleAddPromoCode = () => {
    const code = newPromoCode.trim().toUpperCase();
    if (!code) return;
    if (sysConfig.promoCodes?.includes(code)) {
      setPromoMessage({ type: 'error', text: 'Mã ưu đãi này đã tồn tại!' });
      return;
    }

    const nextCodes = [...(sysConfig.promoCodes || []), code];
    const nextConfig = { ...sysConfig, promoCodes: nextCodes };
    saveAdminSystemConfig(nextConfig);
    setSysConfig(nextConfig);
    setNewPromoCode('');
    setPromoMessage({ type: 'success', text: `Đã thêm mã kích hoạt "${code}" thành công!` });
    try { sound.playCorrect(); } catch (e) {}
  };

  const handleGenerateRandomVipKey = () => {
    const key = generateSymmetricLicenseKey(selectedPlan);
    const nextCodes = [key, ...(sysConfig.promoCodes || [])];
    const nextConfig = { ...sysConfig, promoCodes: nextCodes };
    saveAdminSystemConfig(nextConfig);
    setSysConfig(nextConfig);
    setLastGeneratedKey(key);

    const planLabel = selectedPlan === '30D' ? '30 ngày' : selectedPlan === '90D' ? '90 ngày' : selectedPlan === '365D' ? '1 năm' : 'Trọn đời';

    try {
      navigator.clipboard.writeText(key);
      setPromoMessage({ type: 'success', text: `🎉 Đã sinh mã đối xứng (${planLabel}): ${key} (Đã tự động sao chép)!` });
      sound.playCorrect();
    } catch (e) {
      setPromoMessage({ type: 'success', text: `🎉 Đã sinh mã đối xứng (${planLabel}): ${key}` });
    }
  };

  const handleCopyCode = (code) => {
    try {
      navigator.clipboard.writeText(code);
      setPromoMessage({ type: 'success', text: `📋 Đã sao chép mã "${code}" vào bộ nhớ tạm!` });
      sound.playClick();
    } catch (e) {
      alert(`Mã VIP: ${code}`);
    }
  };

  const handleSaveSystemKey = () => {
    setSystemKeyMsg(null);
    if (!systemKeyInput.trim()) {
      setSystemApiKey('');
      setCurrentMaskedKey('');
      setSystemKeyMsg({ type: 'info', text: 'Đã xóa System API Key.' });
      return;
    }
    setSystemApiKey(systemKeyInput.trim());
    setCurrentMaskedKey(getMaskedSystemApiKey());
    setSystemKeyInput('');
    setSystemKeyMsg({ type: 'success', text: 'Đã lưu System API Key an toàn và mã hóa!' });
    try { sound.playCorrect(); } catch (e) {}
  };

  const handleRemovePromoCode = (codeToRemove) => {
    const nextCodes = sysConfig.promoCodes.filter(c => c !== codeToRemove);
    const nextConfig = { ...sysConfig, promoCodes: nextCodes };
    saveAdminSystemConfig(nextConfig);
    setSysConfig(nextConfig);
  };

  const handleDownloadExamMd = (exam) => {
    let md = `# **${exam.title}**\n\nMôn: ${exam.subject}\n\n`;
    (exam.questions || []).forEach(q => {
      md += `Câu ${q.questionNumber || q.id}. ${q.questionText}\n\n`;
      if (q.options) {
        ['A', 'B', 'C', 'D'].forEach(opt => {
          if (q.options[opt]) md += `* ${opt}. ${q.options[opt]}\n`;
        });
      }
      md += '\n';
    });
    md += '## **BẢNG ĐÁP ÁN**\n\n| Câu | ĐA |\n| :-- | :- |\n';
    (exam.questions || []).forEach(q => {
      md += `| ${q.questionNumber || q.id} | ${q.correctAnswer} |\n`;
    });
    md += '\n## **GIẢI THÍCH CHI TIẾT**\n\n';
    (exam.questions || []).forEach(q => {
      md += `* **Câu ${q.questionNumber || q.id} (${q.correctAnswer}):** ${q.explanation}\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${exam.title.slice(0, 40)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveSsoConfig = (e) => {
    e.preventDefault();
    const domains = ssoAllowedDomains.split(',').map(d => d.trim()).filter(Boolean);
    const autoPro = ssoAutoProDomains.split(',').map(d => d.trim()).filter(Boolean);
    const res = saveSsoConfig({
      googleClientId: ssoGoogleClientId.trim(),
      microsoftClientId: ssoMicrosoftClientId.trim(),
      allowedDomains: domains,
      autoProDomains: autoPro
    });
    if (res.success) {
      setSsoSaveMsg({ type: 'success', text: 'Cấu hình SSO đã được lưu thành công!' });
      sound.playCorrect();
      setSsoHistory(getLoginHistory());
    } else {
      setSsoSaveMsg({ type: 'error', text: 'Lỗi lưu cấu hình: ' + res.error });
      sound.playWrong();
    }
    setTimeout(() => setSsoSaveMsg(null), 3500);
  };

  const filteredExams = exams.filter(ex => {
    if (examSubjectFilter === 'ALL') return true;
    if (examSubjectFilter === 'CUSTOM') {
      return ex.id?.startsWith('exam-custom-') || !['dbi-ch1', 'dbi-ch2', 'cea-ch3'].includes(ex.id);
    }
    const s = ((ex.subject || '') + ' ' + (ex.title || '')).toUpperCase();
    return s.includes(examSubjectFilter);
  });

  return (
    <div className="main-wrapper">
      {/* Admin Top Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(124, 58, 237, 0.12))',
        border: '1px solid var(--purple-border)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.75rem 2rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, var(--primary), var(--purple))',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)'
          }}>
            <ShieldCheck size={32} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <h1 style={{ fontSize: '1.6rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
                Bảng Quản Trị Hệ Thống
              </h1>
              <span className="badge badge-purple">Admin Session</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Quản lý kho đề thi, hạn ngạch AI, cấu hình chống tab và gói cước PRO
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" onClick={onBackToHome}>
            <ArrowLeft size={16} /> Về Chế Độ Học Của Bố
          </button>
          <button className="btn btn-ghost" style={{ color: 'var(--danger)' }} onClick={handleLogout}>
            <LogOut size={16} /> Đăng Xuất Admin
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid var(--border-color)', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {[
          { id: 'overview', label: '📊 Tổng Quan & Thống Kê' },
          { id: 'exams', label: `📚 Quản Lý Đề Thi (${exams.length})` },
          { id: 'subscription', label: '💎 Gói Cước & AI Quota' },
          { id: 'sso', label: '🔐 Cấu Hình SSO' },
          { id: 'settings', label: '⚙️ Cấu Hình & Bảo Mật' }
        ].map(tab => (
          <button
            key={tab.id}
            style={{
              padding: '0.75rem 1.25rem',
              fontWeight: activeTab === tab.id ? '700' : '500',
              fontSize: '0.95rem',
              color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === tab.id ? '3px solid var(--primary)' : '3px solid transparent',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginBottom: '-2px'
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: TỔNG QUAN & THỐNG KÊ */}
      {activeTab === 'overview' && (
        <div>
          {/* Key Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>TỔNG SỐ ĐỀ THI</span>
                <BookOpen size={20} />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)' }}>{exams.length}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                3 đề mặc định + {customExamsCount} đề tự nạp
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--purple)', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>TỔNG SỐ CÂU HỎI</span>
                <GraduationCap size={20} />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--purple)' }}>{totalQuestions}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Trắc nghiệm 4 mức độ nhận thức
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#f59e0b', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>LƯỢT DÙNG AI HÔM NAY</span>
                <Sparkles size={20} />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: '#f59e0b' }}>
                {subStatus.isPro ? 'Unlimited' : `${subStatus.usesToday} / 3`}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Trạng thái: <strong>{subStatus.isPro ? 'Gói PRO' : 'Gói Miễn Phí'}</strong>
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--success)', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>GIÁ GÓI PRO</span>
                <Crown size={20} />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--success)' }}>$3 USD</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                ~75.000 VNĐ / tháng
              </div>
            </div>
          </div>

          {/* Quick Admin Actions */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-main)' }}>
              ⚡ Thao Tác Quản Trị Nhanh
            </h3>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={onOpenImportModal}>
                <Upload size={16} /> Nạp Thêm Đề Thi Mới (.md)
              </button>

              <button className="btn btn-purple" onClick={handleTogglePro}>
                <Crown size={16} color="#ffd700" />
                <span>{subStatus.isPro ? 'Chuyển Tài Khoản Về Free' : 'Kích Hoạt PRO Cho Tài Khoản'}</span>
              </button>

              <button className="btn btn-secondary" onClick={handleResetQuota}>
                <RotateCcw size={16} /> Reset 3 Lượt Dùng AI Hôm Nay
              </button>

              <button className="btn btn-secondary" onClick={onOpenApiKeyModal}>
                <KeyRound size={16} /> Cài Đặt API Key DeepSeek / Gemini
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: QUẢN LÝ KHO ĐỀ THI */}
      {activeTab === 'exams' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            {/* Subject Filters */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { id: 'ALL', label: 'Tất Cả' },
                { id: 'DBI', label: 'DBI (CSDL)' },
                { id: 'CEA', label: 'CEA (Kiến Trúc)' },
                { id: 'CSD', label: 'CSD (Cấu Trúc)' },
                { id: 'CUSTOM', label: `Đề Tự Nạp (${customExamsCount})` }
              ].map(f => (
                <button
                  key={f.id}
                  className={`btn ${examSubjectFilter === f.id ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}
                  onClick={() => setExamSubjectFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <button className="btn btn-primary" onClick={onOpenImportModal}>
              <Upload size={16} /> Nạp Đề Thi Mới (.md)
            </button>
          </div>

          {/* Exams Table */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.85rem 1rem' }}>Môn</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Tên Đề Thi</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Chương</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Số Câu</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Loại Đề</th>
                  <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.map((exam, idx) => {
                  const isDefault = ['dbi-ch1', 'dbi-ch2', 'cea-ch3'].includes(exam.id);
                  return (
                    <tr key={exam.id || idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span className="badge badge-primary">{exam.subject?.slice(0, 15) || 'DBI'}</span>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: '600', color: 'var(--text-main)' }}>
                        {exam.title}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>
                        {exam.chapter || 'Chương 1'}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: '700', color: 'var(--primary)' }}>
                        {exam.questions?.length || 0} câu
                      </td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        {isDefault ? (
                          <span className="badge badge-secondary">Hệ thống sẵn có</span>
                        ) : (
                          <span className="badge badge-purple">Tự nạp (Custom)</span>
                        )}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                          <button
                            className="btn btn-secondary btn-icon-only"
                            style={{ padding: '0.35rem' }}
                            title="Làm thử đề thi này"
                            onClick={() => onStartExam(exam.id, 'exam')}
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            className="btn btn-secondary btn-icon-only"
                            style={{ padding: '0.35rem' }}
                            title="Tải đề về máy (.md)"
                            onClick={() => handleDownloadExamMd(exam)}
                          >
                            <Download size={15} />
                          </button>
                          {!isDefault && onDeleteCustomExam && (
                            <button
                              className="btn btn-ghost btn-icon-only"
                              style={{ padding: '0.35rem', color: 'var(--danger)' }}
                              title="Xóa đề này khỏi kho"
                              onClick={() => {
                                if (confirm(`Bạn có chắc chắn muốn xóa đề: "${exam.title}"?`)) {
                                  onDeleteCustomExam(exam.id);
                                }
                              }}
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: GÓI CƯỚC & HẠN NGẠCH AI */}
      {activeTab === 'subscription' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {/* Card 1: Quota Controls */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
              <Crown size={20} color="#f59e0b" /> Trạng Thái & Hạn Ngạch AI
            </h3>

            <div style={{ marginBottom: '1.25rem', padding: '1rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Gói cước hiện tại:</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: subStatus.isPro ? 'var(--purple)' : 'var(--text-main)', marginTop: '0.2rem' }}>
                {subStatus.isPro ? '💎 GÓI PRO UNLIMITED' : '🌱 GÓI MIỄN PHÍ (3 lượt/ngày)'}
              </div>
              <div style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                Đã dùng hôm nay: <strong>{subStatus.usesToday}</strong> lần | Còn lại: <strong>{subStatus.isPro ? 'Không giới hạn' : `${subStatus.remainingUses} lần`}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                className={`btn ${subStatus.isPro ? 'btn-secondary' : 'btn-purple'}`}
                style={{ padding: '0.75rem' }}
                onClick={handleTogglePro}
              >
                <Crown size={16} color={subStatus.isPro ? undefined : "#ffd700"} />
                <span>{subStatus.isPro ? 'Chuyển về Gói Miễn Phí' : 'Kích Hoạt Ngay Gói PRO (Unlimited)'}</span>
              </button>

              <button className="btn btn-secondary" style={{ padding: '0.75rem' }} onClick={handleResetQuota}>
                <RotateCcw size={16} />
                <span>Đặt Lại Bộ Đếm AI Hôm Nay (Về 0/3)</span>
              </button>
            </div>
          </div>

          {/* Card 2: Symmetric Key Generator */}
          <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--purple-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                <KeyRound size={20} color="var(--purple)" /> Bộ Sinh Mã Bản Quyền Đối Xứng (Symmetric Key Gen)
              </h3>
              <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>
                Thuật toán HMAC-Sha256
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
              Mã được tạo trực tiếp từ máy này có chữ ký mật mã đối xứng. Người dùng nhập đúng mã trên bất kỳ máy nào cũng sẽ kích hoạt được gói PRO tương ứng mà không thể làm giả!
            </p>

            {/* Generator Controls */}
            <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)' }}>
                  Chọn Thời Hạn Bản Quyền:
                </label>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {[
                    { id: '30D', label: '30 Ngày (1 Tháng)' },
                    { id: '90D', label: '90 Ngày (3 Tháng)' },
                    { id: '365D', label: '365 Ngày (1 Năm)' },
                    { id: 'LIFE', label: '👑 Trọn Đời (Vĩnh Viễn)' }
                  ].map(p => (
                    <button
                      key={p.id}
                      type="button"
                      className={`btn ${selectedPlan === p.id ? 'btn-purple' : 'btn-secondary'} btn-sm`}
                      style={{ fontSize: '0.8rem', padding: '0.25rem 0.65rem' }}
                      onClick={() => setSelectedPlan(p.id)}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button 
                  className="btn btn-purple" 
                  style={{ flex: 1, minWidth: '220px', fontWeight: '800', justifyContent: 'center' }}
                  onClick={handleGenerateRandomVipKey}
                >
                  <Sparkles size={16} /> Sinh Mã Bản Quyền Đối Xứng Ngay
                </button>
              </div>

              {lastGeneratedKey && (
                <div style={{
                  marginTop: '0.85rem',
                  padding: '0.75rem 1rem',
                  background: 'var(--bg-surface)',
                  border: '1.5px dashed var(--purple)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                      Mã Bản Quyền Vừa Tạo:
                    </div>
                    <code style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--purple)', letterSpacing: '1px' }}>
                      {lastGeneratedKey}
                    </code>
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleCopyCode(lastGeneratedKey)}
                  >
                    <Copy size={14} /> Sao Chép Mã
                  </button>
                </div>
              )}
            </div>

            {/* Custom Promo Code Option */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
                Hoặc tạo mã chữ tùy chọn thủ công (ví dụ: BOHOC2026, SINHVIENVIP):
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ fontSize: '0.85rem', textTransform: 'uppercase', flex: 1, marginTop: 0 }}
                  placeholder="Nhập mã chữ tùy biến..."
                  value={newPromoCode}
                  onChange={(e) => setNewPromoCode(e.target.value)}
                />
                <button className="btn btn-secondary" onClick={handleAddPromoCode}>
                  <Plus size={16} /> Thêm Mã Thủ Công
                </button>
              </div>
            </div>

            {promoMessage && (
              <div style={{
                background: promoMessage.type === 'success' ? 'var(--success-light)' : 'var(--danger-light)',
                color: promoMessage.type === 'success' ? 'var(--success)' : 'var(--danger)',
                border: `1px solid ${promoMessage.type === 'success' ? 'var(--success-border)' : 'var(--danger-border)'}`,
                borderRadius: 'var(--radius-sm)',
                padding: '0.5rem 0.75rem',
                fontSize: '0.82rem',
                marginBottom: '1rem'
              }}>
                {promoMessage.text}
              </div>
            )}

            {/* Active Codes List */}
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                Danh Sách Mã Bản Quyền Đang Hoạt Động ({(sysConfig.promoCodes || []).length}):
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto' }}>
                {(sysConfig.promoCodes || []).map(code => {
                  const check = verifySymmetricLicenseKey(code);
                  const planBadge = check.isValid ? (check.plan === 'LIFE' ? '👑 Trọn Đời' : `${check.days} ngày`) : 'Mã thường';

                  return (
                    <div
                      key={code}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        padding: '0.35rem 0.7rem',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--purple-light)',
                        color: 'var(--purple)',
                        fontSize: '0.82rem',
                        fontWeight: '700',
                        border: '1px solid var(--purple-border)'
                      }}
                    >
                      <code style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>{code}</code>
                      <span style={{ fontSize: '0.7rem', opacity: 0.8, background: 'rgba(124, 58, 237, 0.15)', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                        {planBadge}
                      </span>
                      <button
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--primary)', display: 'flex' }}
                        onClick={() => handleCopyCode(code)}
                        title="Sao chép mã"
                      >
                        <Copy size={13} />
                      </button>
                      <button
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--danger)', display: 'flex' }}
                        onClick={() => handleRemovePromoCode(code)}
                        title="Xóa mã này"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB SSO: CẤU HÌNH SSO & ĐĂNG NHẬP */}
      {activeTab === 'sso' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* SSO Configuration Card */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <LogIn size={22} color="var(--primary)" /> Cấu Hình Single Sign-On (Google & Microsoft SSO)
                </h2>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  Cho phép người dùng đăng nhập bằng Google hoặc tài khoản trường học (ví dụ: FPT University @fpt.edu.vn)
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveSsoConfig}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                {/* Google Client ID */}
                <div style={{ background: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <KeyRound size={18} color="#4285F4" />
                    <label style={{ fontSize: '0.9rem', fontWeight: '700' }}>
                      Google OAuth Client ID
                    </label>
                  </div>
                  <input
                    type="text"
                    className="form-input"
                    style={{ fontSize: '0.85rem' }}
                    placeholder="VD: 1234567890-abcdefg.apps.googleusercontent.com"
                    value={ssoGoogleClientId}
                    onChange={(e) => setSsoGoogleClientId(e.target.value)}
                  />
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '0.4rem', lineHeight: 1.4 }}>
                    Tạo trên Google Cloud Console &gt; Credentials &gt; OAuth 2.0 Client IDs (Web application).
                  </p>
                </div>

                {/* Microsoft Entra Client ID */}
                <div style={{ background: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <KeyRound size={18} color="#05a6f0" />
                    <label style={{ fontSize: '0.9rem', fontWeight: '700' }}>
                      Microsoft Entra Client ID (Office 365)
                    </label>
                  </div>
                  <input
                    type="text"
                    className="form-input"
                    style={{ fontSize: '0.85rem' }}
                    placeholder="VD: 89a8c17b-4029-4b68-967c-..."
                    value={ssoMicrosoftClientId}
                    onChange={(e) => setSsoMicrosoftClientId(e.target.value)}
                  />
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '0.4rem', lineHeight: 1.4 }}>
                    Đăng ký ứng dụng trong Microsoft Entra ID (Azure AD) để học viên đăng nhập bằng email trường.
                  </p>
                </div>

                {/* Allowed Domains */}
                <div style={{ background: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Mail size={18} color="var(--purple)" />
                    <label style={{ fontSize: '0.9rem', fontWeight: '700' }}>
                      Tên Miền Email Cho Phép (Allowed Domains)
                    </label>
                  </div>
                  <input
                    type="text"
                    className="form-input"
                    style={{ fontSize: '0.85rem' }}
                    placeholder="Để trống = Mọi tên miền (hoặc: fpt.edu.vn, gmail.com)"
                    value={ssoAllowedDomains}
                    onChange={(e) => setSsoAllowedDomains(e.target.value)}
                  />
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '0.4rem', lineHeight: 1.4 }}>
                    Phân tách nhiều tên miền bằng dấu phẩy. Để trống nếu muốn mở cho tất cả người dùng.
                  </p>
                </div>

                {/* Auto-PRO Educational Domains */}
                <div style={{ background: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Crown size={18} color="#f59e0b" />
                    <label style={{ fontSize: '0.9rem', fontWeight: '700' }}>
                      Miền Tự Động Kích Hoạt PRO (Auto-PRO Domains)
                    </label>
                  </div>
                  <input
                    type="text"
                    className="form-input"
                    style={{ fontSize: '0.85rem' }}
                    placeholder="VD: fpt.edu.vn"
                    value={ssoAutoProDomains}
                    onChange={(e) => setSsoAutoProDomains(e.target.value)}
                  />
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '0.4rem', lineHeight: 1.4 }}>
                    Người dùng đăng nhập với đuôi email này (ví dụ sinh viên FPT) sẽ tự động nhận đặc quyền VIP PRO.
                  </p>
                </div>
              </div>

              {ssoSaveMsg && (
                <div style={{
                  background: ssoSaveMsg.type === 'success' ? 'var(--success-light)' : 'var(--danger-light)',
                  color: ssoSaveMsg.type === 'success' ? 'var(--success)' : 'var(--danger)',
                  border: `1px solid ${ssoSaveMsg.type === 'success' ? 'var(--success-border)' : 'var(--danger-border)'}`,
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.6rem 1rem',
                  fontSize: '0.85rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {ssoSaveMsg.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <span>{ssoSaveMsg.text}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1.5rem', fontSize: '0.9rem' }}>
                  Lưu Cấu Hình SSO
                </button>
              </div>
            </form>
          </div>

          {/* Recent SSO Logins Audit */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={20} color="var(--primary)" /> Lịch Sử Đăng Nhập SSO Gần Đây ({ssoHistory.length})
            </h3>
            
            {ssoHistory.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Chưa có lượt đăng nhập SSO nào được ghi nhận. Thử đăng nhập qua SSO trên Navbar!
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '0.6rem 0.8rem' }}>Thời Gian</th>
                      <th style={{ padding: '0.6rem 0.8rem' }}>Người Dùng</th>
                      <th style={{ padding: '0.6rem 0.8rem' }}>Email</th>
                      <th style={{ padding: '0.6rem 0.8rem' }}>Nhà Cung Cấp</th>
                      <th style={{ padding: '0.6rem 0.8rem' }}>Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ssoHistory.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '0.6rem 0.8rem', color: 'var(--text-subtle)' }}>
                          {new Date(item.timestamp).toLocaleString()}
                        </td>
                        <td style={{ padding: '0.6rem 0.8rem', fontWeight: '700', color: 'var(--text-main)' }}>
                          {item.name}
                        </td>
                        <td style={{ padding: '0.6rem 0.8rem', color: 'var(--text-muted)' }}>
                          {item.email}
                        </td>
                        <td style={{ padding: '0.6rem 0.8rem' }}>
                          <span style={{ 
                            background: item.provider === 'google' ? 'rgba(66, 133, 244, 0.1)' : item.provider === 'microsoft' ? 'rgba(5, 166, 240, 0.1)' : 'rgba(124, 58, 237, 0.1)',
                            color: item.provider === 'google' ? '#4285F4' : item.provider === 'microsoft' ? '#05a6f0' : 'var(--purple)',
                            padding: '0.15rem 0.5rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            textTransform: 'uppercase'
                          }}>
                            {item.provider}
                          </span>
                        </td>
                        <td style={{ padding: '0.6rem 0.8rem', color: 'var(--success)', fontWeight: '600' }}>
                          ✓ Thành công
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: CẤU HÌNH & BẢO MẬT */}
      {activeTab === 'settings' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {/* Change Admin Password */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
              <KeyRound size={20} color="var(--primary)" /> Đổi Mật Khẩu Quản Trị Viên
            </h3>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Mật khẩu quản trị được bảo vệ bằng mã hóa băm SHA-256 an toàn.
            </p>

            <form onSubmit={handleChangePassword}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.3rem' }}>
                  Mật khẩu hiện tại:
                </label>
                <input
                  type="password"
                  className="form-input"
                  style={{ fontSize: '0.9rem' }}
                  placeholder="Nhập mật khẩu quản trị hiện tại..."
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.3rem' }}>
                  Mật khẩu mới:
                </label>
                <input
                  type="password"
                  className="form-input"
                  style={{ fontSize: '0.9rem' }}
                  placeholder="Nhập mật khẩu mới..."
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.3rem' }}>
                  Xác nhận mật khẩu mới:
                </label>
                <input
                  type="password"
                  className="form-input"
                  style={{ fontSize: '0.9rem' }}
                  placeholder="Nhập lại mật khẩu mới..."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {pwdMessage && (
                <div style={{
                  background: pwdMessage.type === 'success' ? 'var(--success-light)' : 'var(--danger-light)',
                  color: pwdMessage.type === 'success' ? 'var(--success)' : 'var(--danger)',
                  border: `1px solid ${pwdMessage.type === 'success' ? 'var(--success-border)' : 'var(--danger-border)'}`,
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.82rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  {pwdMessage.type === 'success' ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                  <span>{pwdMessage.text}</span>
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Lưu Mật Khẩu Mới
              </button>
            </form>
          </div>

          {/* System API & Anti-Cheat */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
              <Settings size={20} color="var(--purple)" /> Cài Đặt System AI API Key (Bảo Mật)
            </h3>

            <div style={{ marginBottom: '1.25rem', padding: '1rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>System API Key Hiện Tại:</div>
              <div style={{ fontWeight: '700', fontFamily: 'monospace', color: currentMaskedKey ? 'var(--success)' : 'var(--warning)', marginTop: '0.2rem' }}>
                {currentMaskedKey ? `🔒 ${currentMaskedKey}` : 'Chưa thiết lập (Dùng heuristic nội bộ)'}
              </div>

              <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                <input
                  type="password"
                  className="form-input"
                  style={{ fontSize: '0.85rem', marginTop: 0 }}
                  placeholder="sk-... hoặc AIzaSy..."
                  value={systemKeyInput}
                  onChange={(e) => setSystemKeyInput(e.target.value)}
                />
                <button
                  className="btn btn-primary"
                  style={{ fontSize: '0.82rem', whiteSpace: 'nowrap' }}
                  onClick={handleSaveSystemKey}
                >
                  Lưu Key
                </button>
              </div>

              {systemKeyMsg && (
                <div style={{ fontSize: '0.82rem', color: systemKeyMsg.type === 'success' ? 'var(--success)' : 'var(--text-muted)', marginTop: '0.5rem' }}>
                  {systemKeyMsg.text}
                </div>
              )}
            </div>

            <div style={{ padding: '1rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Chế độ Focus Mode PRO (Chống Thoát Tab & Phân Tâm):</div>
              <div style={{ fontWeight: '700', color: 'var(--purple)', marginTop: '0.2rem' }}>
                Đặc quyền thành viên PRO: Tối đa 3 lần cảnh cáo vi phạm trước khi tự động nộp bài.
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                Mô phỏng kỳ thi tiêu chuẩn quốc tế, rèn luyện tính tập trung cao độ và chống sao lãng bởi thông báo bên ngoài.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
