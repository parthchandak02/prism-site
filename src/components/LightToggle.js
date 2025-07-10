import React from 'react';
import './LightToggle.css';

const LightToggle = ({ lightMode, onToggle }) => {
  return (
    <button
      className={`light-toggle ${lightMode ? 'light-toggle--light' : 'light-toggle--dark'}`}
      onClick={onToggle}
      aria-label={`Switch to ${lightMode ? 'dark' : 'light'} mode`}
    >
      <span className="light-toggle__icon">
        {lightMode ? '🌙' : '☀️'}
      </span>
      <span className="light-toggle__text">
        {lightMode ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};

export default LightToggle; 