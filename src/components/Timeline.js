import { useMemo } from 'react';
import TimelineCard from './TimelineCard';
import { useTypewriterHighlight } from '../contexts/TypewriterHighlightContext';
import './Timeline.css';

const Timeline = ({ 
  data = [], 
  className = '',
  showFilters = false, // Now controlled by parent
  activeFilters = [], // Now receives array of active filters instead of single activeFilter
  lightMode = false,
  // centermostCard = null, // REMOVED: Card title to highlight based on scroll position
  ...props 
}) => {
  const { getCurrentHighlights } = useTypewriterHighlight();
  const highlights = getCurrentHighlights();
  
  // Filter data based on active filters
  const filteredData = useMemo(() => {
    if (activeFilters.length === 0) {
      // No filters selected - show all data
      return data;
    }
    // Show items that match any of the active filters
    return data.filter(item => activeFilters.includes(item.category?.toLowerCase()));
  }, [data, activeFilters]);
  
  // Sort data by category first (when no filters active), then by date within each category
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (activeFilters.length === 0) {
        // Define category order for sorting when showing all
        const categoryOrder = ['experience', 'patent', 'speaking', 'volunteering', 'research', 'projects', 'education', 'awards', 'media'];
        
        const aCategoryIndex = categoryOrder.indexOf(a.category?.toLowerCase() || '');
        const bCategoryIndex = categoryOrder.indexOf(b.category?.toLowerCase() || '');
        
        // If categories are different, sort by category order
        if (aCategoryIndex !== bCategoryIndex) {
          return aCategoryIndex - bCategoryIndex;
        }
      }
      
      // Within same category (or when filters are active), sort by date (newest first)
      const dateA = new Date(a.date || '1900-01-01');
      const dateB = new Date(b.date || '1900-01-01');
      return dateB - dateA;
    });
  }, [filteredData, activeFilters]);
  
  return (
    <div className={`timeline ${lightMode ? 'timeline--light' : 'timeline--dark'} ${className}`} {...props}>
      
      {/* Timeline content */}
      <div className="timeline__content">
        {/* Timeline line */}
        <div className="timeline__line" />
        
        {/* Timeline items */}
        <div className="timeline__items">
          {sortedData.length > 0 ? (
            sortedData.map((item, index) => {
              // REMOVED: Scroll-based expansion logic
              
              return (
                <div 
                  key={item.title} 
                  className="timeline__item"
                  data-category={item.category?.toLowerCase() || 'other'}
                  data-index={index}
                  data-debug={`${item.category}-${index}`}
                >
                  <TimelineCard
                    title={item.title}
                    company={item.company}
                    companyLogo={item.companyLogo}
                    projectImage={item.projectImage}
                    date={item.date}
                    category={item.category}
                    description={item.description}
                    location={item.location}
                    volume={item.volume}
                    url={item.url}
                    skills={item.skills || []}
                    lightMode={lightMode}
                    className="timeline__card"
                    // isScrollHighlighted={item.title === centermostCard} // REMOVED
                    isTypewriterHighlighted={highlights.timelineCards.includes(item.title)}
                  />
                </div>
              );
            })
          ) : (
            <div className="timeline__empty">
              <p>No items found for the selected filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timeline; 