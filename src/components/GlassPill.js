import React from 'react';
import './GlassPill.css';

const GlassPill = ({ 
  icon: Icon, 
  text,
  onClick,
  className = '',
  ...props 
}) => {
  return (
    <div
      className={`glass-card ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className="glass-card__logo">
        {Icon && <Icon />}
      </div>
      <div className="glass-card__text">
        {text}
      </div>
    </div>
  );
};

export default GlassPill; 