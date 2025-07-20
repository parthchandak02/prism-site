import { useState, useEffect } from 'react';
import { 
  ExternalLink, FileText, MapPin,
  // Navigation icons from the old GlassNavigation
  Code, Database, GitBranch, Globe, Cpu, Terminal, Settings, Zap,
  CircuitBoard, Microchip, Figma, Palette, Layers, Box,
  Printer, PenTool, Gamepad2, Trello, Mail, Monitor
} from 'lucide-react';
import './TimelineCard.css';

// Icon mapping for navigation icons
const iconMap = {
  'Python': Code,
  'JavaScript': Terminal,
  'React': Zap,
  'Database': Database,
  'C++': Settings,
  'MATLAB': Cpu,
  'Figma': Figma,
  'Blender': Layers,
  'Unity': Gamepad2,
  'ProtoPie': Palette,
  'Linux': Globe,
  'Git': GitBranch,
  'Arduino': CircuitBoard,
  'Raspberry Pi': Microchip,
  'SolidWorks': PenTool,
  'Fusion 360': Box,
  '3D Printing': Printer,
  'Miro': Monitor,
  'JIRA': Trello,
  'G-Suite': Mail,
  'Confluence': FileText
};

const TimelineCard = ({ 
  title,
  date,
  category,
  description,
  location,
  volume,
  url, // New URL field for external links
  navigationIcons = [], // Navigation icons for this card
  isHighlighted = false,
  defaultExpanded = false,
  autoExpanded = false, // Auto-expansion controlled by scroll position
  lightMode = false,
  className = '',
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
  
  // Generate category-specific class name
  const categoryClass = category ? `timeline-card--category-${category.toLowerCase()}` : '';
  
  return (
    <div 
      className={`timeline-card glass glass-strong glass-interactive ${effectiveExpanded ? 'expanded' : 'collapsed'} ${lightMode ? 'timeline-card--light' : 'timeline-card--dark'} ${isHighlighted ? 'timeline-card--highlighted highlight-subtle' : ''} ${categoryClass} ${className}`} 
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
          
          {/* Navigation Icons - at the bottom */}
          {navigationIcons && navigationIcons.length > 0 && (
            <div className="timeline-card__navigation-icons">
              {navigationIcons.map((iconName, index) => {
                const IconComponent = iconMap[iconName];
                return IconComponent ? (
                  <div 
                    key={index}
                    className={`timeline-card__nav-icon ${isHighlighted ? 'timeline-card__nav-icon--highlighted' : ''}`}
                  >
                    <IconComponent size={16} />
                    <span className="timeline-card__nav-icon-text">{iconName}</span>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineCard; 