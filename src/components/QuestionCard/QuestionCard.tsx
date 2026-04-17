// src/components/QuestionCard/QuestionCard.tsx
import React, { useState, KeyboardEvent } from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../constants/i18n';

// ── Question Card ──────────────────────────────
interface QuestionCardProps {
  question: string;
  options?: string[];
  onSelect: (answer: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, options, onSelect }) => (
  <div className="question-card">
    <div className="question-text">{question}</div>
    {options && (
      <div className="question-options">
        {options.map(opt => (
          <button key={opt} className="question-option" onClick={() => onSelect(opt)}>
            {opt}
          </button>
        ))}
      </div>
    )}
  </div>
);

// ── Quick Buttons ──────────────────────────────
interface QuickButtonsProps {
  language: Language;
  onAction: (action: string) => void;
}

export const QuickButtons: React.FC<QuickButtonsProps> = ({ language, onAction }) => {
  const t = TRANSLATIONS[language];
  const buttons = [
    { label: t.quickButtons.recommendations, action: '__RECOMMENDATIONS__' },
    { label: t.quickButtons.trackOrder,      action: '__TRACK_ORDER__'   },
    { label: t.quickButtons.returnPolicy,    action: '__RETURN_POLICY__' },
    { label: t.quickButtons.bestDeals,       action: '__BEST_DEALS__'    },
  ];

  return (
    <div className="quick-buttons">
      {buttons.map(btn => (
        <button key={btn.action} className="quick-btn" onClick={() => onAction(btn.action)}>
          {btn.label}
        </button>
      ))}
    </div>
  );
};

// ── Input Bar ──────────────────────────────────
interface InputBarProps {
  language: Language;
  isLoading: boolean;
  onSend: (text: string) => void;
}

export const InputBar: React.FC<InputBarProps> = ({ language, isLoading, onSend }) => {
  const [value, setValue] = useState('');
  const t = TRANSLATIONS[language];

  const handleSend = () => {
    if (!value.trim() || isLoading) return;
    onSend(value.trim());
    setValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="input-bar">
      <input
        className="input-field"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t.inputPlaceholder}
        disabled={isLoading}
      />
      <button className="send-btn" onClick={handleSend} disabled={isLoading || !value.trim()}>
        {isLoading ? '⏳' : '➤'}
      </button>
    </div>
  );
};
