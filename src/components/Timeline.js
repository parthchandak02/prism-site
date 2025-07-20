import { useMemo } from 'react';
import TimelineCard from './TimelineCard';
import { useTypewriterHighlight } from '../contexts/TypewriterHighlightContext';
import './Timeline.css';

const Timeline = ({ 
  data = [], 
  className = '',
  showFilters = false, // Now controlled by parent
  activeFilter = 'all', // Received from parent
  lightMode = false,
  ...props 
}) => {
  const { getCurrentHighlights } = useTypewriterHighlight();
  const highlights = getCurrentHighlights();
  
  // Filter data based on active filter
  const filteredData = useMemo(() => {
    if (activeFilter === 'all') {
      return data;
    }
    return data.filter(item => item.category?.toLowerCase() === activeFilter);
  }, [data, activeFilter]);
  
  // Sort data by date (newest first)
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const dateA = new Date(a.date || '1900-01-01');
      const dateB = new Date(b.date || '1900-01-01');
      return dateB - dateA;
    });
  }, [filteredData]);
  
  return (
    <div className={`timeline ${lightMode ? 'timeline--light' : 'timeline--dark'} ${className}`} {...props}>
      
      {/* Timeline content */}
      <div className="timeline__content">
        {/* Timeline line */}
        <div className="timeline__line" />
        
        {/* Timeline items */}
        <div className="timeline__items">
          {sortedData.length > 0 ? (
            sortedData.map((item, index) => (
              <div key={index} className="timeline__item">
                {/* Timeline dot with icon */}
                <div className="timeline__dot glass glass-interactive">
                  {item.icon && <item.icon />}
                </div>
                <TimelineCard
                  title={item.title}
                  date={item.date}
                  category={item.category}
                  description={item.description}
                  location={item.location}
                  volume={item.volume}
                  lightMode={lightMode}
                  className="timeline__card"
                  isHighlighted={highlights.timelineCards.includes(item.title)}
                />
              </div>
            ))
          ) : (
            <div className="timeline__empty">
              <p>No items found for the selected filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timeline; 