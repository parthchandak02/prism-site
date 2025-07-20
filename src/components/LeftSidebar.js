import './LeftSidebar.css';

const LeftSidebar = ({ 
  filters = [], 
  activeFilter = 'all', 
  onFilterChange, 
  lightMode = false,
  className = ''
}) => {
  return (
    <div className={`left-sidebar glass glass-strong ${lightMode ? 'left-sidebar--light' : 'left-sidebar--dark'} ${className}`}>
      {/* Filter pills - direct layout without container */}
      <div className="left-sidebar__filters">
        {filters.map((filter) => (
          <button
            key={filter.key}
            className={`left-sidebar__pill ${
              activeFilter === filter.key ? 'left-sidebar__pill--active' : ''
            }`}
            onClick={() => onFilterChange(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar; 