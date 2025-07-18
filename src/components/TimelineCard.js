import React, { useState } from 'react';
import './TimelineCard.css';

const TimelineCard = ({ 
  icon: Icon, 
  title,
  date,
  category,
  description,
  location,
  volume,
  defaultExpanded = false,
  className = '',
  ...props 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  return (
    <div 
      className={`timeline-card ${isExpanded ? 'expanded' : 'collapsed'} ${className}`} 
      {...props}
    >
      {/* Content container */}
      <div className="timeline-card__content">
        {/* Header section - always visible */}
        <div 
          className="timeline-card__header"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="timeline-card__header-content">
            <h3 className="timeline-card__title">{title}</h3>
            <span className="timeline-card__date">{date}</span>
          </div>
          <button className="timeline-card__toggle">
            <svg 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className={`timeline-card__chevron ${isExpanded ? 'expanded' : ''}`}
            >
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
          </button>
        </div>
        
        {/* Expandable content */}
        <div className={`timeline-card__expandable ${isExpanded ? 'expanded' : 'collapsed'}`}>
          {/* Meta information */}
          {(volume || location) && (
            <div className="timeline-card__meta">
              {volume && <span className="timeline-card__volume">{volume}</span>}
              {location && <span className="timeline-card__location">{location}</span>}
            </div>
          )}
          
          {/* Category tag */}
          {category && (
            <div className="timeline-card__category">
              <span className="timeline-card__tag">{category}</span>
            </div>
          )}
          
          {/* Description */}
          {description && (
            <p className="timeline-card__description">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineCard; 