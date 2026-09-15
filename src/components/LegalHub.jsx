import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  CreditCard, 
  Sparkles, 
  Trash2, 
  HardDrive, 
  ArrowLeft, 
  Printer, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  Lock, 
  RefreshCw,
  Send,
  Info
} from 'lucide-react';
import MarkdownViewer from './MarkdownViewer';
import { LEGAL_POLICIES, LEGAL_METADATA } from '../data/legalPolicies';
import { sound } from '../utils/soundEffects';

export default function LegalHub({ 
  initialTab = 'terms',
  onBack,
  onDataCleared
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [storageInfo, setStorageInfo] = useState({ totalKeys: 0, approxSizeKb: 0, items: [] });
  const [deleteStatus, setDeleteStatus] = useState(null);

  useEffect(() => {
    if (initialTab && LEGAL_POLICIES[initialTab]) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Calculate local storage usage
  const inspectStorage = () => {
    if (typeof window === 'undefined') return;
    try {
      let totalBytes = 0;
      const relevantKeys = [
        'exam_sso_user',
        'custom_exams',
        'custom_study_lectures',
        'exam_pro_subscription',
        'exam_daily_ai_usage',
        'ai_api_key',
        'exam_theme',
        'exam_font_size',
        'exam_sound_enabled',
        'exam_sso_login_history',
        'exam_sso_config'
      ];

      const foundItems = [];
      for (const key of relevantKeys) {
        const val = localStorage.getItem(key);
        if (val !== null) {
          const bytes = (key.length + val.length) * 2; // UTF-16 approximation
          totalBytes += bytes;
          foundItems.push({ key, sizeBytes: bytes });
        }
      }

      setStorageInfo({
        totalKeys: foundItems.length,
        approxSizeKb: (totalBytes / 1024).toFixed(1),
        items: foundItems
      });
    } catch (e) {
      console.warn("Storage inspect error:", e);
    }
  };

  useEffect(() => {
    inspectStorage();
  }, [activeTab]);

  const handlePrint = () => {
    try { sound.playClick(); } catch (e) {}
    window.print();
  };

  const handlePurgeAllData = () => {
    const confirmed = window.confirm(
      "⚠️ CẢNH BÁO XÓA DỮ LIỆU:\n\nBạn có chắc chắn muốn xóa TOÀN BỘ dữ liệu tài khoản SSO, đề thi tự nhập, bài học và lịch sử khỏi trình duyệt này không?\n\nHành động này không thể hoàn tác!"
    );

    if (!confirmed) return;

    try {
      const keysToRemove = [
        'exam_sso_user',
        'custom_exams',
        'custom_study_lectures',
        'exam_pro_subscription',
        'exam_daily_ai_usage',
        'ai_api_key',
        'exam_theme',
        'exam_font_size',
        'exam_sound_enabled',
        'exam_sso_login_history',
        'exam_sso_config'
      ];

      keysToRemove.forEach(k => localStorage.removeItem(k));

      try { sound.playWrong(); } catch (e) {}

      // Trigger events
      window.dispatchEvent(new CustomEvent('sso-auth-changed'));
      window.dispatchEvent(new CustomEvent('subscription-changed'));

      setDeleteStatus({
        type: 'success',
        text: 'Toàn bộ dữ liệu của bạn đã được xóa sạch 100% khỏi thiết bị này!'
      });

      inspectStorage();

      if (onDataCleared) {
        setTimeout(() => onDataCleared(), 1200);
      }
    } catch (e) {
      setDeleteStatus({
        type: 'error',
        text: 'Lỗi khi xóa dữ liệu: ' + e.message
      });
    }
  };

  const currentPolicy = LEGAL_POLICIES[activeTab] || LEGAL_POLICIES.terms;

  const navItems = [
    { id: 'terms', label: 'Điều Khoản Dịch Vụ', icon: FileText },
    { id: 'privacy', label: 'Quyền Riêng Tư', icon: ShieldCheck },
    { id: 'payment', label: 'Thanh Toán & Hoàn Tiền', icon: CreditCard },
    { id: 'ai', label: 'Nội Dung & Miễn Trừ AI', icon: Sparkles },
    { id: 'deletion', label: 'Xóa Dữ Liệu & Tài Khoản', icon: Trash2 },
    { id: 'cookies', label: 'Lưu Trữ & Cookie', icon: HardDrive }
  ];

  return (
    <div className="main-wrapper" style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '3rem' }}>
      {/* Top Breadcrumb & Actions Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem',
        padding: '0.75rem 0',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <button 
          className="btn btn-secondary" 
          onClick={onBack}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}
        >
          <ArrowLeft size={16} />
          <span>Quay lại Trang Chủ</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-ghost" 
            onClick={handlePrint}
            title="In hoặc Lưu văn bản dưới dạng PDF"
            style={{ fontSize: '0.85rem' }}
          >
            <Printer size={16} />
            <span>In / Lưu PDF</span>
          </button>

          <a 
            href={LEGAL_METADATA.telegramUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-purple"
            style={{ fontSize: '0.85rem', textDecoration: 'none' }}
          >
            <Send size={15} />
            <span>Liên hệ Admin ({LEGAL_METADATA.supportTelegram})</span>
          </a>
        </div>
      </div>

      {/* Main Layout: Sidebar Tabs + Content Area */}
      <div className="legal-layout-container" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Sidebar Navigation */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '1rem',
          position: 'sticky',
          top: '80px'
        }}>
          <div style={{ padding: '0.5rem 0.5rem 0.75rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '800', color: 'var(--text-muted)' }}>
              Trung Tâm Pháp Lý
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)', marginTop: '0.2rem' }}>
              ExamMaster Legal & Policies
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    try { sound.playClick(); } catch (e) {}
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: isActive ? 'var(--primary-light)' : 'transparent',
                    color: isActive ? 'var(--primary)' : 'var(--text-main)',
                    fontWeight: isActive ? '700' : '500',
                    fontSize: '0.88rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={17} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            <div><strong>Phiên bản:</strong> v{LEGAL_METADATA.version}</div>
            <div><strong>Hiệu lực:</strong> {LEGAL_METADATA.effectiveDate}</div>
            <div style={{ marginTop: '0.35rem' }}>Hệ thống lưu trữ 100% cục bộ trên trình duyệt.</div>
          </div>
        </div>

        {/* Policy Content Viewer */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-sm)',
          minHeight: '600px'
        }}>
          {/* Policy Title Banner */}
          <div style={{ marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '2px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
              <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>
                {currentPolicy.badge}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
                Cập nhật lần cuối: {LEGAL_METADATA.lastUpdated}
              </span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--text-main)', margin: '0.25rem 0 0.5rem' }}>
              {currentPolicy.title}
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
              {currentPolicy.subtitle}
            </p>
          </div>

          {/* Interactive Self-Service Deletion Tool (Shown on 'deletion' tab or when relevant) */}
          {activeTab === 'deletion' && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.05)',
              border: '2px dashed var(--danger-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              marginBottom: '2.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--danger)', marginBottom: '0.5rem' }}>
                <Trash2 size={22} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0 }}>
                  Công Cụ Tự Phục Vụ: Xóa Dữ Liệu & Đặt Lại Trình Duyệt
                </h3>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '1rem', lineHeight: '1.5' }}>
                Bằng cách bấm nút dưới đây, bạn sẽ thực thi quyền được lãng quên (Right to Erasure). Mọi dữ liệu cục bộ gồm đề thi tự nạp, bài học, phiên SSO và mã VIP sẽ bị xóa vĩnh viễn khỏi thiết bị này.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '0.75rem',
                marginBottom: '1.25rem',
                background: 'var(--bg-surface)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Số mục đang lưu:</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)' }}>
                    {storageInfo.totalKeys} mục dữ liệu
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dung lượng ước tính:</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary)' }}>
                    ~{storageInfo.approxSizeKb} KB
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Vị trí lưu:</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)' }}>
                    Trình duyệt cá nhân (Client-side)
                  </div>
                </div>
              </div>

              {deleteStatus && (
                <div style={{
                  background: deleteStatus.type === 'success' ? 'var(--success-light)' : 'var(--danger-light)',
                  color: deleteStatus.type === 'success' ? 'var(--success)' : 'var(--danger)',
                  border: `1px solid ${deleteStatus.type === 'success' ? 'var(--success-border)' : 'var(--danger-border)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 1rem',
                  fontSize: '0.88rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {deleteStatus.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  <span>{deleteStatus.text}</span>
                </div>
              )}

              <button
                type="button"
                className="btn btn-danger"
                onClick={handlePurgeAllData}
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.92rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Trash2 size={16} />
                <span>Xóa Toàn Bộ Dữ Liệu & Đặt Lại Ứng Dụng</span>
              </button>
            </div>
          )}

          {/* Render Policy Markdown Body */}
          <div className="policy-rendered-content">
            <MarkdownViewer content={currentPolicy.content} />
          </div>

          {/* Policy Footer Note */}
          <div style={{
            marginTop: '3rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'var(--text-muted)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Info size={15} />
              <span>Văn bản được biên soạn phản ánh chính xác 100% kiến trúc hoạt động thực tế của ExamMaster.</span>
            </div>
            <div>
              Hỗ trợ: <a href={LEGAL_METADATA.telegramUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: '600' }}>Telegram {LEGAL_METADATA.supportTelegram}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
