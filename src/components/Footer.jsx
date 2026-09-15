import React from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  FileText, 
  CreditCard, 
  Sparkles, 
  Trash2, 
  HardDrive, 
  Send,
  Lock,
  Heart
} from 'lucide-react';
import { LEGAL_METADATA } from '../data/legalPolicies';

export default function Footer({ onNavigate, onOpenLegalTab }) {
  const handleOpenLegal = (tabId) => {
    if (onOpenLegalTab) {
      onOpenLegalTab(tabId);
    } else if (onNavigate) {
      onNavigate('legal', tabId);
    }
  };

  return (
    <footer className="app-footer" style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-color)',
      marginTop: '4rem',
      padding: '3rem 1.5rem 2rem',
      color: 'var(--text-muted)',
      fontSize: '0.88rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem'
        }}>
          {/* Brand & About */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, var(--primary), var(--purple))',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <GraduationCap size={18} />
              </div>
              <span style={{ fontWeight: '800', fontSize: '1.15rem' }}>ExamMaster</span>
            </div>

            <p style={{ lineHeight: '1.6', margin: '0 0 1rem 0', fontSize: '0.85rem' }}>
              Nền tảng khảo thí, luyện tập trắc nghiệm thông minh và chuyển hóa câu sai thành bài tự luận có AI chấm điểm sư phạm.
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', background: 'var(--bg-main)', padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <Lock size={13} color="var(--success)" />
              <span>Kiến trúc máy khách: 100% dữ liệu lưu cục bộ</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 style={{ color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.85rem' }}>
              Phân Khu Học Tập
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.85rem' }}>
              <li>
                <button className="footer-link-btn" onClick={() => onNavigate('home')}>
                  Trang Chủ & Lộ Trình
                </button>
              </li>
              <li>
                <button className="footer-link-btn" onClick={() => onNavigate('study')}>
                  Bài Giảng & Slide Converter
                </button>
              </li>
              <li>
                <button className="footer-link-btn" onClick={() => onNavigate('exam_hub')}>
                  Kho Đề Thi & Phòng Thi
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 style={{ color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.85rem' }}>
              Chính Sách & Pháp Lý
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.85rem' }}>
              <li>
                <button className="footer-link-btn" onClick={() => handleOpenLegal('terms')}>
                  <FileText size={14} /> Điều Khoản Dịch Vụ (ToS)
                </button>
              </li>
              <li>
                <button className="footer-link-btn" onClick={() => handleOpenLegal('privacy')}>
                  <ShieldCheck size={14} /> Chính Sách Quyền Riêng Tư
                </button>
              </li>
              <li>
                <button className="footer-link-btn" onClick={() => handleOpenLegal('payment')}>
                  <CreditCard size={14} /> Thanh Toán & Hoàn Tiền
                </button>
              </li>
              <li>
                <button className="footer-link-btn" onClick={() => handleOpenLegal('ai')}>
                  <Sparkles size={14} /> Quy Định & Miễn Trừ AI
                </button>
              </li>
              <li>
                <button className="footer-link-btn" onClick={() => handleOpenLegal('deletion')}>
                  <Trash2 size={14} /> Quyền Xóa Dữ Liệu & Tài Khoản
                </button>
              </li>
              <li>
                <button className="footer-link-btn" onClick={() => handleOpenLegal('cookies')}>
                  <HardDrive size={14} /> Lưu Trữ Cục Bộ & Cookie
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 style={{ color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.85rem' }}>
              Hỗ Trợ & Bản Quyền
            </h4>
            <p style={{ fontSize: '0.84rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
              Mọi thắc mắc về kích hoạt gói PRO, yêu cầu hoàn tiền hoặc báo cáo bản quyền tài liệu xin liên hệ:
            </p>
            <a 
              href={LEGAL_METADATA.telegramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', fontSize: '0.82rem' }}
            >
              <Send size={14} color="var(--primary)" />
              <span>Telegram: {LEGAL_METADATA.supportTelegram}</span>
            </a>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          fontSize: '0.8rem',
          color: 'var(--text-subtle)'
        }}>
          <div>
            © 2026 ExamMaster. Dịch vụ lưu trữ cục bộ vì sự an toàn quyền riêng tư của người học.
          </div>

          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span>Phiên bản Chính sách: v{LEGAL_METADATA.version}</span>
            <button 
              className="footer-link-btn" 
              onClick={() => handleOpenLegal('terms')}
              style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}
            >
              Điều khoản
            </button>
            <button 
              className="footer-link-btn" 
              onClick={() => handleOpenLegal('privacy')}
              style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}
            >
              Riêng tư
            </button>
            <button 
              className="footer-link-btn" 
              onClick={() => handleOpenLegal('deletion')}
              style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}
            >
              Xóa dữ liệu
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
