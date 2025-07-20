import './LeftSidebar.css';

const LeftSidebar = ({ 
  filters = [], 
  activeFilter = 'all', 
  visibleCategory = 'all',
  onFilterChange, 
  lightMode = false,
  className = ''
}) => {
  return (
    <div className={`left-sidebar glass glass-strong ${lightMode ? 'left-sidebar--light' : 'left-sidebar--dark'} ${className}`}>
      {/* Filter pills - direct layout without container */}
      <div className="left-sidebar__filters">
        {filters.map((filter) => {
          // Determine if this filter should be highlighted
          const isActive = activeFilter === filter.key;
          const isScrollHighlighted = activeFilter === 'all' && visibleCategory === filter.key;
          const shouldHighlight = isActive || isScrollHighlighted;
          
          return (
            <button
              key={filter.key}
              className={`left-sidebar__pill ${
                shouldHighlight ? 'left-sidebar__pill--active' : ''
              } ${isScrollHighlighted ? 'left-sidebar__pill--scroll-highlight' : ''}`}
              onClick={() => onFilterChange(filter.key)}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LeftSidebar; 