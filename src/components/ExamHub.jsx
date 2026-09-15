import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Zap, 
  ArrowLeft, 
  Clock, 
  HelpCircle, 
  Layers, 
  ShieldCheck, 
  Upload, 
  Database, 
  Cpu, 
  Binary, 
  Crown, 
  Sparkles,
  Trash2,
  FolderOpen,
  UserCheck
} from 'lucide-react';

export default function ExamHub({
  exams = [],
  activeSubject = 'ALL',
  subscription = { isPro: false, remainingUses: 3 },
  onOpenProModal,
  onBackToHome,
  onStartExam,
  onOpenImportModal,
  onDeleteExam
}) {
  const [selectedSubject, setSelectedSubject] = useState(activeSubject);
  const [repoFilter, setRepoFilter] = useState('ALL'); // 'ALL' | 'ADMIN' | 'CLIENT'

  useEffect(() => {
    if (activeSubject) {
      setSelectedSubject(activeSubject);
    }
  }, [activeSubject]);

  const getSubjectCode = (exam) => {
    const s = (exam.subject || '').toUpperCase() + ' ' + (exam.id || '').toUpperCase();
    if (s.includes('DBI')) return 'DBI';
    if (s.includes('CEA')) return 'CEA';
    if (s.includes('CSD')) return 'CSD';
    return 'OTHER';
  };

  const isClientExam = (exam) => exam.source === 'client' || exam.isCustom === true;
  const isAdminExam = (exam) => !isClientExam(exam);

  const adminExamsCount = exams.filter(isAdminExam).length;
  const clientExamsCount = exams.filter(isClientExam).length;

  const filteredExams = exams.filter(ex => {
    const matchSubj = selectedSubject === 'ALL' || getSubjectCode(ex) === selectedSubject;
    if (!matchSubj) return false;
    if (repoFilter === 'ADMIN') return isAdminExam(ex);
    if (repoFilter === 'CLIENT') return isClientExam(ex);
    return true;
  });

  const handleDeleteExam = (exam, e) => {
    e.stopPropagation();
    if (window.confirm(`Bạn có chắc muốn xóa đề thi "${exam.title}" khỏi kho đề cá nhân của bạn không?`)) {
      if (onDeleteExam) onDeleteExam(exam.id);
    }
  };

  const getSubjectIcon = (code) => {
    switch (code) {
      case 'DBI': return <Database size={20} color="var(--primary)" />;
      case 'CEA': return <Cpu size={20} color="var(--purple)" />;
      case 'CSD': return <Binary size={20} color="var(--success)" />;
      default: return <GraduationCap size={20} />;
    }
  };

  return (
    <div className="main-wrapper">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={onBackToHome}>
            <ArrowLeft size={16} /> Trang Chủ
          </button>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
              Phân Hệ Thi Cử & Khảo Thí
            </h1>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Kho đề trắc nghiệm phân chia theo từng mã môn học (DBI, CEA, CSD)
            </span>
          </div>
        </div>

        <button className="btn btn-secondary" onClick={onOpenImportModal}>
          <Upload size={16} /> Thêm Đề Mới (.md)
        </button>
      </div>

      {/* PRO VS FREE BANNER */}
      {subscription?.isPro ? (
        <div className="pro-vip-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Crown size={24} color="#f59e0b" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>Đặc Quyền Thành Viên PRO VIP: AI Ôn Luyện Không Giới Hạn</span>
                <span className="pro-badge">💎 PRO ACTIVE</span>
              </div>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                Mở khóa <strong>Focus Mode PRO</strong> chống thoát tab và AI Giảng Viên hướng dẫn tự luận 1-1, phân tích bẫy trắc nghiệm cho toàn bộ đề thi.
              </p>
            </div>
          </div>
          <button
            className="btn btn-ghost"
            style={{ fontSize: '0.85rem', color: 'var(--purple)', border: '1px solid rgba(124, 58, 237, 0.4)' }}
            onClick={onOpenProModal}
          >
            Quản Lý Gói PRO
          </button>
        </div>
      ) : (
        <div className="free-status-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Sparkles size={20} color="var(--primary)" />
            <div style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
              Tài khoản Free: Còn <strong>{subscription?.remainingUses ?? 3} / 3</strong> lượt hỏi AI hôm nay • <em>(Focus Mode chống thoát tab khóa ở bản Free)</em>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn btn-ghost"
              style={{ fontSize: '0.82rem', padding: '0.3rem 0.65rem' }}
              onClick={onOpenProModal}
            >
              ❓ Tại sao tính phí AI?
            </button>
            <button
              className="btn btn-primary"
              style={{ fontSize: '0.82rem', padding: '0.3rem 0.75rem' }}
              onClick={onOpenProModal}
            >
              <Crown size={14} /> Nâng Cấp PRO (3$/tháng)
            </button>
          </div>
        </div>
      )}

      {/* 2-Tier Filter System: 1. Nguồn Đề (Admin Mẫu vs Client Tải Lên) & 2. Môn Học */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '1rem 1.25rem',
        marginBottom: '1.75rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Tier 1: Nguồn Đề */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '0.85rem',
          paddingBottom: '0.85rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Layers size={17} color="var(--primary)" />
            <span>Nguồn Đề Thi:</span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              className={`btn ${repoFilter === 'ALL' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.84rem', padding: '0.35rem 0.85rem' }}
              onClick={() => setRepoFilter('ALL')}
            >
              🌟 Tất Cả ({exams.length})
            </button>
            <button
              className={`btn ${repoFilter === 'ADMIN' ? 'btn-purple' : 'btn-secondary'}`}
              style={{ fontSize: '0.84rem', padding: '0.35rem 0.85rem' }}
              onClick={() => setRepoFilter('ADMIN')}
              title="Kho đề thi chuẩn do Admin hệ thống chuẩn bị sẵn"
            >
              👑 Kho Đề Mẫu Admin ({adminExamsCount})
            </button>
            <button
              className={`btn ${repoFilter === 'CLIENT' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.84rem', padding: '0.35rem 0.85rem' }}
              onClick={() => setRepoFilter('CLIENT')}
              title="Các đề thi do chính bạn tự tải lên từ file Markdown"
            >
              👤 Đề Bạn Tải Lên ({clientExamsCount})
            </button>
          </div>
        </div>

        {/* Tier 2: Mã Môn Học */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ fontSize: '0.86rem', fontWeight: '600', color: 'var(--text-muted)' }}>
            Mã môn học:
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {[
              { code: 'ALL', name: 'Tất Cả Môn' },
              { code: 'DBI', name: 'Môn DBI' },
              { code: 'CEA', name: 'Môn CEA' },
              { code: 'CSD', name: 'Môn CSD' }
            ].map(item => (
              <button
                key={item.code}
                className={`btn ${selectedSubject === item.code ? 'btn-secondary' : 'btn-ghost'}`}
                style={{
                  fontSize: '0.82rem',
                  padding: '0.3rem 0.75rem',
                  borderColor: selectedSubject === item.code ? 'var(--primary)' : undefined,
                  fontWeight: selectedSubject === item.code ? '700' : 'normal',
                  color: selectedSubject === item.code ? 'var(--primary)' : undefined
                }}
                onClick={() => setSelectedSubject(item.code)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Exams Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {filteredExams.map(exam => {
          const code = getSubjectCode(exam);
          const qCount = exam.questions?.length || 0;
          const isClient = isClientExam(exam);

          return (
            <div
              key={exam.id}
              className={subscription?.isPro ? 'pro-card-glow' : ''}
              style={{
                background: 'var(--bg-card)',
                border: subscription?.isPro ? undefined : '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                    {getSubjectIcon(code)}
                    <span className="badge badge-primary">{code}</span>
                    
                    {/* Origin Badge: Admin vs Client */}
                    {isClient ? (
                      <span className="badge badge-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.76rem', fontWeight: '700', color: 'var(--primary)', borderColor: 'var(--primary-border)' }}>
                        <Upload size={12} /> Đề Bạn Nạp
                      </span>
                    ) : (
                      <span className="badge badge-purple" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.76rem', fontWeight: '800' }}>
                        <Crown size={12} color="#f59e0b" /> Đề Mẫu Admin
                      </span>
                    )}

                    {exam.chapter && <span className="badge badge-secondary">{exam.chapter}</span>}

                    {subscription?.isPro && (
                      <span className="pro-exam-badge">
                        <Crown size={12} /> AI PRO Ready
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--primary)' }}>
                      {qCount} câu
                    </span>
                    {isClient && (
                      <button
                        className="btn btn-ghost"
                        style={{ padding: '0.2rem 0.4rem', color: 'var(--danger)' }}
                        onClick={(e) => handleDeleteExam(exam, e)}
                        title="Xóa đề này khỏi kho cá nhân của bạn"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem', lineHeight: '1.4' }}>
                  {exam.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Môn: {exam.subject} • {isClient ? 'Nguồn: Đề do bạn tự nạp từ file Markdown.' : 'Nguồn: Kho đề thi mẫu chính thức của Admin.'}
                </p>
              </div>

              {/* Action Buttons for 2 modes */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', display: 'flex', gap: '0.6rem' }}>
                <button
                  className="btn btn-primary"
                  style={{ flex: 1, fontSize: '0.85rem', padding: '0.55rem' }}
                  onClick={() => onStartExam(exam.id, 'exam')}
                  title={subscription?.isPro ? "Chế độ thi chuẩn có Focus Mode PRO chống thoát tab" : "Chế độ thi chuẩn"}
                >
                  <GraduationCap size={16} /> Thi Thử Chuẩn
                </button>

                <button
                  className="btn btn-purple"
                  style={{ flex: 1, fontSize: '0.85rem', padding: '0.55rem' }}
                  onClick={() => onStartExam(exam.id, 'practice')}
                  title="Chọn đáp án là biết ngay đúng/sai và lời giải"
                >
                  <Zap size={16} /> Luyện Tập Tức Thì
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredExams.length === 0 && (
        repoFilter === 'CLIENT' ? (
          <div style={{
            textAlign: 'center',
            padding: '3.5rem 2rem',
            color: 'var(--text-muted)',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '2px dashed var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <Upload size={32} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Kho Đề Cá Nhân Của Bạn Chưa Có Đề Thi Nào
            </h3>
            <p style={{ fontSize: '0.95rem', maxWidth: '560px', margin: '0 auto 1.75rem', lineHeight: '1.6' }}>
              Hệ thống hoạt động theo nguyên tắc: <strong>tùy bạn tải lên đề gì thì sẽ có đề đó</strong>. Bạn có thể tự nạp file trắc nghiệm Markdown (.md) bất kỳ môn nào của mình để luyện tập và thi thử.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.92rem' }} onClick={onOpenImportModal}>
                <Upload size={16} /> Tải Lên Đề Mới (.md)
              </button>
              <button className="btn btn-secondary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.92rem' }} onClick={() => setRepoFilter('ADMIN')}>
                <Crown size={16} color="#f59e0b" /> Khám Phá Kho Đề Mẫu Admin ({adminExamsCount})
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
            <HelpCircle size={40} style={{ margin: '0 auto 0.75rem' }} />
            <h3 style={{ color: 'var(--text-main)' }}>Chưa có đề thi nào phù hợp với bộ lọc</h3>
            <p style={{ fontSize: '0.9rem', marginTop: '0.25rem', marginBottom: '1.25rem' }}>
              Hãy thử chọn môn khác hoặc đổi nguồn đề sang "Tất Cả" để xem danh sách đầy đủ.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-secondary" onClick={() => { setSelectedSubject('ALL'); setRepoFilter('ALL'); }}>
                Xem Tất Cả Đề Thi
              </button>
              <button className="btn btn-primary" onClick={onOpenImportModal}>
                <Upload size={16} /> Thêm Đề Mới (.md)
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
