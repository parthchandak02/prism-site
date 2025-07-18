import React from 'react';
import './LightToggle.css';

const LightToggle = ({ lightMode, onToggle }) => {
  return (
    <button
      className="light-toggle glass glass-interactive"
      onClick={onToggle}
      aria-label={`Switch to ${lightMode ? 'dark' : 'light'} mode`}
    >
      <span className="light-toggle__icon">
        {lightMode ? '🌙' : '☀️'}
      </span>
    </button>
  );
};

export default LightToggle; 