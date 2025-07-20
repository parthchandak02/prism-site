import { useState, useEffect } from 'react';
import { ExternalLink, FileText, MapPin } from 'lucide-react';
import './TimelineCard.css';

const TimelineCard = ({ 
  icon: Icon, 
  title,
  date,
  category,
  description,
  location,
  volume,
  url, // New URL field for external links
  defaultExpanded = false,
  autoExpanded = false, // Auto-expansion controlled by scroll position
  lightMode = false,
  className = '',
  isHighlighted = false,
  ...props 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [smoothAutoExpanded, setSmoothAutoExpanded] = useState(autoExpanded);
  
  // Smooth out auto-expansion changes to prevent animation interruption
  useEffect(() => {
    const timer = setTimeout(() => {
      setSmoothAutoExpanded(autoExpanded);
    }, 50); // Small delay to smooth rapid changes
    
    return () => clearTimeout(timer);
  }, [autoExpanded]);
  
  // Use auto-expansion if specified, otherwise use internal state
  const effectiveExpanded = smoothAutoExpanded !== false ? smoothAutoExpanded : isExpanded;
  return (
    <div 
      className={`timeline-card glass glass-strong glass-interactive ${effectiveExpanded ? 'expanded' : 'collapsed'} ${lightMode ? 'timeline-card--light' : 'timeline-card--dark'} ${isHighlighted ? 'timeline-card--highlighted highlight-subtle' : ''} ${className}`} 
      {...props}
    >
      {/* Content container */}
      <div className="timeline-card__content">
        {/* Header section - always visible */}
        <div 
          className="timeline-card__header"
          onClick={() => smoothAutoExpanded === false && setIsExpanded(!isExpanded)}
        >
          <div className="timeline-card__header-content">
            <h3 className="timeline-card__title">{title}</h3>
            <span className="timeline-card__date">{date}</span>
          </div>
          <button className="timeline-card__toggle glass glass-interactive">
            <svg 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className={`timeline-card__chevron ${effectiveExpanded ? 'expanded' : ''}`}
            >
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
          </button>
        </div>
        
        {/* Expandable content */}
        <div className={`timeline-card__expandable ${effectiveExpanded ? 'expanded' : 'collapsed'}`}>
          {/* Meta information */}
          {(volume || location || url) && (
            <div className="timeline-card__meta">
              {location && (
                <span className="timeline-card__location">
                  <MapPin size={14} />
                  {location}
                </span>
              )}
              {volume && (
                <span className="timeline-card__volume">
                  <FileText size={14} />
                  {volume}
                </span>
              )}
              {url && (
                <a 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="timeline-card__url"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={14} />
                  {url.replace(/^https?:\/\//, '')}
                </a>
              )}
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