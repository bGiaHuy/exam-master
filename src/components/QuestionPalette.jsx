import React from 'react';
import { Bookmark, Check, X, AlertCircle } from 'lucide-react';

export default function QuestionPalette({
  questions = [],
  currentIndex = 0,
  userAnswers = {},
  flaggedQuestions = new Set(),
  mode = 'exam', // 'exam' | 'practice' | 'review'
  onSelectQuestion,
  onSubmitExam
}) {
  const total = questions.length;
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <aside className="palette-card">
      <div className="palette-header">
        <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Danh Sách Câu Hỏi</h3>
        <span className="badge badge-primary">{answeredCount}/{total} Đã làm</span>
      </div>

      <div className="palette-stats">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--primary)' }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--primary)', display: 'inline-block' }}></span>
          Đã chọn: {answeredCount}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--warning)' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--warning)', display: 'inline-block' }}></span>
          Cờ: {flaggedQuestions.size}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--border-subtle)', display: 'inline-block' }}></span>
          Chưa làm: {total - answeredCount}
        </div>
      </div>

      <div className="palette-grid">
        {questions.map((q, idx) => {
          const isCurrent = idx === currentIndex;
          const hasAnswer = userAnswers[q.id] !== undefined;
          const isFlagged = flaggedQuestions.has(q.id);

          let stateClass = '';
          if (mode === 'practice' || mode === 'review') {
            if (hasAnswer) {
              const isCorrect = userAnswers[q.id] === q.correctAnswer;
              stateClass = isCorrect ? 'correct' : 'wrong';
            }
          } else {
            if (hasAnswer) stateClass = 'answered';
          }

          if (isCurrent) stateClass += ' current';
          if (isFlagged) stateClass += ' flagged';

          return (
            <button
              key={q.id}
              className={`palette-btn ${stateClass}`}
              onClick={() => onSelectQuestion(idx)}
              title={`Câu ${q.questionNumber} (${q.level})`}
            >
              {q.questionNumber}
            </button>
          );
        })}
      </div>

      {mode === 'exam' && onSubmitExam && (
        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <button
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.75rem', fontWeight: '700' }}
            onClick={onSubmitExam}
          >
            Nộp Bài Thi
          </button>
        </div>
      )}
    </aside>
  );
}
