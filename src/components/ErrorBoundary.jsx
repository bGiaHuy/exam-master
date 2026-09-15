import React from 'react';
import { AlertTriangle, RotateCcw, Home, Trash2 } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ExamMaster ErrorBoundary caught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  handleClearDataAndReload = () => {
    try {
      localStorage.removeItem('custom_exams');
      localStorage.removeItem('exam_theme');
      localStorage.removeItem('exam_font_size');
      localStorage.removeItem('exam_pro_subscription');
      localStorage.removeItem('exam_daily_ai_usage');
      localStorage.removeItem('exam_admin_auth');
    } catch (e) {}
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: 'var(--bg-app, #f8fafc)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          <div style={{
            maxWidth: '600px',
            width: '100%',
            background: '#ffffff',
            borderRadius: '16px',
            padding: '2.5rem 2rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            border: '1px solid #fee2e2',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#fef2f2',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <AlertTriangle size={36} />
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem' }}>
              Ứng Dụng Gặp Sự Cố Hiển Thị
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Hệ thống đã tự động kích hoạt bộ bảo vệ an toàn (Error Boundary) để tránh màn hình trắng. Bạn có thể nhấn nút bên dưới để tải lại hoặc khôi phục dữ liệu gốc.
            </p>

            {this.state.error && (
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '0.85rem 1rem',
                textAlign: 'left',
                fontSize: '0.82rem',
                fontFamily: 'monospace',
                color: '#dc2626',
                marginBottom: '1.75rem',
                maxHeight: '160px',
                overflowY: 'auto'
              }}>
                <strong>Chi tiết lỗi:</strong> {this.state.error.toString()}
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={this.handleReset}
                style={{
                  background: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.7rem 1.4rem',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <RotateCcw size={16} /> Tải Lại Trang
              </button>

              <button
                onClick={this.handleClearDataAndReload}
                style={{
                  background: '#f1f5f9',
                  color: '#475569',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  padding: '0.7rem 1.2rem',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                title="Xóa cache bộ nhớ tạm để giải quyết xung đột dữ liệu cũ"
              >
                <Trash2 size={16} /> Đặt Lại Bộ Nhớ Tạm
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
