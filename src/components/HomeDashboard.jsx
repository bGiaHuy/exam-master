import React from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  ArrowRight, 
  Layers,
  Database,
  Cpu,
  Binary,
  CheckCircle2,
  Upload,
  Crown,
  Zap
} from 'lucide-react';

export default function HomeDashboard({
  onNavigateToStudy,
  onNavigateToExam,
  onSelectSubject,
  onOpenImportModal,
  subscription = { isPro: false, remainingUses: 3 },
  onOpenProModal,
  adminExamsCount = 3,
  clientExamsCount = 0,
  examsCount = 3,
  lecturesCount = 3
}) {
  return (
    <div className="main-wrapper">
      {/* Welcome Hero Banner */}
      <div 
        className={subscription?.isPro ? 'pro-hero-gradient' : ''}
        style={{
          background: subscription?.isPro ? undefined : 'linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(124, 58, 237, 0.08))',
          border: subscription?.isPro ? undefined : '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem 2rem',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '840px' }}>
          {subscription?.isPro ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff', padding: '0.35rem 0.9rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: '800', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(245, 158, 11, 0.35)' }}>
              <Crown size={16} /> ĐẶC QUYỀN THÀNH VIÊN PRO VIP UNLIMITED
            </div>
          ) : (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: '700', marginBottom: '1rem' }}>
              <Sparkles size={16} /> Nền Tảng Học Tập & Khảo Thí Trực Quan
            </div>
          )}

          <h1 style={{ fontSize: '2.1rem', fontWeight: '900', lineHeight: '1.3', marginBottom: '0.75rem', color: 'var(--text-main)' }}>
            {subscription?.isPro ? 'Chào mừng Bố đến với ExamMaster PRO 💎' : 'Chào mừng Bố đến với ExamMaster'}
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            {subscription?.isPro 
              ? 'Tài khoản của Bố đang sở hữu toàn bộ đặc quyền cao cấp nhất: Chấm điểm tự luận không giới hạn, đường truyền AI ưu tiên tức thì 1-2s và phân tích chuyên sâu bản chất mọi câu sai!'
              : 'Hệ thống được thiết kế riêng để bố học tập dễ dàng nhất: Đọc bài giảng tiếng Việt có ví dụ minh họa gần gũi, thi cử chống phân tâm và tự động chuyển câu sai thành tự luận để AI chấm bài (Miễn phí 3 lần/ngày).'
            }
          </p>

          {/* Pro Perks Highlights */}
          {subscription?.isPro && (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(124, 58, 237, 0.12)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontWeight: '700', color: 'var(--purple)' }}>
                <Sparkles size={15} /> Không giới hạn hỏi AI
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(245, 158, 11, 0.12)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontWeight: '700', color: '#f59e0b' }}>
                <Zap size={15} /> Máy chủ ưu tiên phản hồi 1-2s
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(37, 99, 235, 0.12)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)' }}>
                <ShieldCheck size={15} /> Phân tích bẫy đề chuyên sâu
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              className="btn btn-primary"
              style={{ padding: '0.8rem 1.5rem', fontSize: '1rem' }}
              onClick={onNavigateToStudy}
            >
              <BookOpen size={18} /> Vào Phân Khu Học Tập
            </button>
            <button
              className="btn btn-purple"
              style={{ padding: '0.8rem 1.5rem', fontSize: '1rem' }}
              onClick={onNavigateToExam}
            >
              <GraduationCap size={18} /> Vào Phân Khu Thi Cử
            </button>
            <button
              className="btn btn-secondary"
              style={{ padding: '0.8rem 1.4rem', fontSize: '0.95rem' }}
              onClick={onOpenImportModal}
            >
              <Upload size={18} /> Thêm Đề Mới (.md)
            </button>
            <button
              className={`btn ${subscription?.isPro ? 'pro-pill-active' : 'btn-secondary'}`}
              style={{
                padding: '0.8rem 1.3rem',
                fontSize: '0.95rem',
                border: subscription?.isPro ? undefined : '1px dashed #f59e0b',
                background: subscription?.isPro ? undefined : 'rgba(245, 158, 11, 0.08)'
              }}
              onClick={onOpenProModal}
            >
              <Crown size={18} color={subscription?.isPro ? "#f59e0b" : "#f59e0b"} />
              <span style={{ fontWeight: '700' }}>
                {subscription?.isPro ? '💎 Gói PRO Đang Hoạt Động' : 'Gói PRO (3$/tháng)'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Two Big Main Section Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {/* Card 1: Học Tập */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '2px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: 'var(--shadow-sm)'
          }}
          onClick={onNavigateToStudy}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BookOpen size={26} />
            </div>
            <span className="badge badge-primary">{lecturesCount} Bài giảng tiếng Việt</span>
          </div>

          <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
            1. Phân Hệ Học Tập (Study Hub)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
            Đọc bài giảng tóm tắt theo chương được dịch nghĩa và minh họa bằng ví dụ đời thực (như căn bếp, người thủ kho, sổ khám bệnh). 
            Tích hợp công cụ <strong>Convert Slide Tiếng Anh</strong> sang trang đọc tiếng Việt dễ hiểu.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '700', fontSize: '0.92rem' }}>
            <span>Đọc bài học & chuyển đổi slide</span>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* Card 2: Thi Cử */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '2px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: 'var(--shadow-sm)'
          }}
          onClick={onNavigateToExam}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--purple)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--purple-light)',
              color: 'var(--purple)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <GraduationCap size={26} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span className="badge badge-purple" title="Kho đề thi chuẩn do Admin hệ thống chuẩn bị sẵn">
                👑 {adminExamsCount} Đề Mẫu Admin
              </span>
              <span className="badge badge-primary" title="Đề do bạn tự nạp từ file Markdown">
                👤 {clientExamsCount} Đề Bạn Nạp
              </span>
              <button
                className="btn btn-ghost"
                style={{ fontSize: '0.78rem', padding: '0.2rem 0.6rem', color: 'var(--purple)', border: '1px dashed var(--purple-border)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenImportModal();
                }}
              >
                + Thêm đề .md
              </button>
            </div>
          </div>

          <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
            2. Phân Hệ Thi Cử (Exam Hub)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
            Bao gồm <strong>Kho đề mẫu chuẩn của Admin</strong> và <strong>Kho đề riêng tùy ý bạn tải lên (.md)</strong>. 
            Hỗ trợ <strong>Focus Mode PRO</strong> chống thoát tab & phân tâm, chế độ làm đến đâu biết đúng sai đến đấy và AI chấm tự luận câu sai.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--purple)', fontWeight: '700', fontSize: '0.92rem' }}>
            <span>Làm bài trắc nghiệm & ôn câu sai</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>

      {/* Subjects Overview Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-main)' }}>
              Danh Mục Môn Học Đã Tổ Chức
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Các môn học đã được sắp xếp theo từng thư mục mã môn riêng biệt
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {/* Subject DBI */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)' }}>
                  <Database size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>DBI (Database Systems)</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cơ Sở Dữ Liệu</span>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1rem' }}>
                Mô hình dữ liệu quan hệ, DBMS, SQL, đại số quan hệ và tối ưu hóa câu truy vấn.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className="btn btn-secondary"
                style={{ flex: 1, fontSize: '0.85rem' }}
                onClick={() => { onSelectSubject('DBI'); onNavigateToStudy(); }}
              >
                Học lý thuyết
              </button>
              <button
                className="btn btn-primary"
                style={{ flex: 1, fontSize: '0.85rem' }}
                onClick={() => { onSelectSubject('DBI'); onNavigateToExam(); }}
              >
                Thi trắc nghiệm
              </button>
            </div>
          </div>

          {/* Subject CEA */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: 'rgba(124, 58, 237, 0.1)', color: 'var(--purple)' }}>
                  <Cpu size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>CEA (Computer Architecture)</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Kiến Trúc Máy Tính</span>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1rem' }}>
                Cấu trúc máy tính Von Neumann, CPU, thanh ghi, bộ nhớ Cache, RAM và chu trình xử lý lệnh.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className="btn btn-secondary"
                style={{ flex: 1, fontSize: '0.85rem' }}
                onClick={() => { onSelectSubject('CEA'); onNavigateToStudy(); }}
              >
                Học lý thuyết
              </button>
              <button
                className="btn btn-purple"
                style={{ flex: 1, fontSize: '0.85rem' }}
                onClick={() => { onSelectSubject('CEA'); onNavigateToExam(); }}
              >
                Thi trắc nghiệm
              </button>
            </div>
          </div>

          {/* Subject CSD */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: 'rgba(22, 163, 74, 0.1)', color: 'var(--success)' }}>
                  <Binary size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>CSD (Data Structures)</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cấu Trúc Dữ Liệu</span>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1rem' }}>
                Mảng, danh sách liên kết, ngăn xếp (Stack), hàng đợi (Queue), cây nhị phân và đồ thị.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className="btn btn-secondary"
                style={{ flex: 1, fontSize: '0.85rem' }}
                onClick={() => { onSelectSubject('CSD'); onNavigateToStudy(); }}
              >
                Học lý thuyết
              </button>
              <button
                className="btn btn-success"
                style={{ flex: 1, fontSize: '0.85rem' }}
                onClick={() => { onSelectSubject('CSD'); onNavigateToExam(); }}
              >
                Thi trắc nghiệm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
