// src/components/DealsBanner/DealsBanner.tsx
import React, { useState, useEffect } from 'react';

const DealsBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(3 * 3600 + 45 * 60 + 22);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const h = Math.floor(timeLeft / 3600).toString().padStart(2, '0');
  const m = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0');
  const s = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="deals-banner">
      <span>🔥</span>
      <span className="deals-text">Flash Sale — Up to 67% off!</span>
      <span className="deals-timer">{h}:{m}:{s}</span>
    </div>
  );
};

export default DealsBanner;
