import React, { useState } from 'react';
import { KeyRound, Check, X, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { detectProvider } from '../data/apiConfig';

export default function ApiKeyModal({ isOpen, onClose, apiKey, onSaveApiKey }) {
  const [inputKey, setInputKey] = useState(apiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const detected = detectProvider(inputKey);

  const handleSave = () => {
    onSaveApiKey(inputKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setInputKey('');
    onSaveApiKey('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '540px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--purple)' }}>
            <KeyRound size={22} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>
              Cài Đặt AI API Key (DeepSeek / Gemini)
            </h2>
          </div>
          <button className="btn btn-ghost btn-icon-only" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.5' }}>
          Khóa API được dùng cho 2 tính năng thông minh: 
          <strong> (1) Chấm bài tự luận ôn tập câu sai</strong> và 
          <strong> (2) Chuyển đổi Slide tiếng Anh sang bài học tiếng Việt</strong>.
        </p>

        <div style={{
          background: 'var(--bg-main)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600' }}>
              API Key (DeepSeek hoặc Google Gemini):
            </label>
            {inputKey && (
              <span className={`badge ${detected === 'deepseek' ? 'badge-primary' : 'badge-purple'}`} style={{ fontSize: '0.75rem' }}>
                {detected === 'deepseek' ? '⚡ DeepSeek API' : '✨ Google Gemini API'}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type={showKey ? 'text' : 'password'}
              className="form-input"
              style={{ marginTop: 0 }}
              placeholder="sk-... (DeepSeek) hoặc AIzaSy... (Gemini)"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
            />
            <button
              className="btn btn-secondary"
              type="button"
              style={{ fontSize: '0.82rem', padding: '0 0.75rem' }}
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? 'Ẩn' : 'Hiện'}
            </button>
          </div>
        </div>

        <div style={{
          background: 'var(--primary-light)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1rem',
          fontSize: '0.82rem',
          color: 'var(--primary)',
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700' }}>
            <ShieldCheck size={16} /> Tự Động Nhận Diện & Bảo Mật Tuyệt Đối:
          </div>
          <p style={{ color: 'var(--text-main)', margin: 0 }}>
            Hệ thống tự động nhận diện nếu bắt đầu bằng <code>sk-...</code> (DeepSeek) hoặc <code>AIzaSy...</code> (Gemini). 
            Khóa lưu trực tiếp trên trình duyệt của bố (LocalStorage), không chia sẻ ra ngoài.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {apiKey ? (
            <button className="btn btn-danger" style={{ fontSize: '0.85rem' }} onClick={handleClear}>
              Xóa Khóa Đã Lưu
            </button>
          ) : <div></div>}

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button className="btn btn-secondary" onClick={onClose}>
              Đóng
            </button>
            <button className="btn btn-purple" onClick={handleSave}>
              {savedSuccess ? <><Check size={16} /> Đã Lưu!</> : 'Lưu Cài Đặt'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
