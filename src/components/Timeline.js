import { useState, useMemo } from 'react';
import TimelineCard from './TimelineCard';
import './Timeline.css';

const Timeline = ({ 
  data = [], 
  className = '',
  showFilters = true,
  defaultFilter = 'all',
  lightMode = false,
  ...props 
}) => {
  const [activeFilter, setActiveFilter] = useState(defaultFilter);
  
  // Get unique categories for filter buttons
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(data.map(item => item.category?.toLowerCase()).filter(Boolean))];
    return cats;
  }, [data]);
  
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
      {/* Filter buttons */}
      {showFilters && categories.length > 1 && (
        <div className="timeline__filters">
          {categories.map(category => (
            <button
              key={category}
              className={`timeline__filter glass glass-interactive ${activeFilter === category ? 'active' : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )}
      
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