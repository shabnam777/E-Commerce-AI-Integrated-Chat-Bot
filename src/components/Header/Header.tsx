// src/components/Header/Header.tsx
import React from 'react';
import { Language } from '../../types';

interface Props {
  language: Language;
  onToggleLanguage: () => void;
}

const Header: React.FC<Props> = ({ language, onToggleLanguage }) => (
  <div className="header">
    <div className="header-avatar">🛍️</div>
    <div className="header-info">
      <div className="header-name">ShopBot AI</div>
      <div className="header-status">
        <span className="status-dot" />
        Always online
      </div>
    </div>
    <button className="lang-btn" onClick={onToggleLanguage}>
      {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
    </button>
  </div>
);

export default Header;
