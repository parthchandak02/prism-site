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
  centermostCard = null, // Card title to highlight based on scroll position
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
  
  // Sort data by category first (when in 'all' mode), then by date within each category
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (activeFilter === 'all') {
        // Define category order for sorting
        const categoryOrder = ['experience', 'patent', 'speaking', 'volunteering', 'research', 'projects', 'education', 'awards', 'media'];
        
        const aCategoryIndex = categoryOrder.indexOf(a.category?.toLowerCase() || '');
        const bCategoryIndex = categoryOrder.indexOf(b.category?.toLowerCase() || '');
        
        // If categories are different, sort by category order
        if (aCategoryIndex !== bCategoryIndex) {
          return aCategoryIndex - bCategoryIndex;
        }
      }
      
      // Within same category (or when not in 'all' mode), sort by date (newest first)
      const dateA = new Date(a.date || '1900-01-01');
      const dateB = new Date(b.date || '1900-01-01');
      return dateB - dateA;
    });
  }, [filteredData, activeFilter]);
  
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
              <div 
                key={index} 
                className="timeline__item"
                data-category={item.category?.toLowerCase() || 'other'}
                data-index={index}
                data-debug={`${item.category}-${index}`}
              >
                <TimelineCard
                  title={item.title}
                  date={item.date}
                  category={item.category}
                  description={item.description}
                  location={item.location}
                  volume={item.volume}
                  url={item.url}
                  lightMode={lightMode}
                  className="timeline__card"
                  isHighlighted={highlights.timelineCards.includes(item.title) || item.title === centermostCard}
                  autoExpanded={activeFilter === 'all' && item.title === centermostCard}
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