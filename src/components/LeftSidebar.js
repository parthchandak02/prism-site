import './LeftSidebar.css';
import { useTypewriterHighlight } from '../contexts/TypewriterHighlightContext';

const LeftSidebar = ({ 
  filters = [], 
  activeFilters = [], // Now an array of active filter keys
  visibleCategory = 'all',
  onFilterToggle, // Now toggles filters instead of changing single filter
  lightMode = false,
  className = ''
}) => {
  // Get current typewriter highlights
  const { getCurrentHighlights } = useTypewriterHighlight();
  const { sidebarCategories } = getCurrentHighlights();

  // Function to scroll to the timeline after filter change
  const scrollToTimeline = () => {
    // Small delay to allow filter change to process first
    setTimeout(() => {
      const timeline = document.querySelector('.timeline');
      const scrollContainer = document.querySelector('.main-content-scroll');
      
      if (timeline && scrollContainer) {
        // Calculate scroll position to show timeline prominently
        const timelineRect = timeline.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();
        const currentScrollTop = scrollContainer.scrollTop;
        
        // Calculate the target scroll position to center the timeline in view
        const targetScrollTop = currentScrollTop + timelineRect.top - containerRect.top - 100; // 100px offset from top
        
        scrollContainer.scrollTo({
          top: Math.max(0, targetScrollTop), // Ensure we don't scroll above 0
          behavior: 'smooth'
        });
      }
    }, 100); // Small delay to ensure filter change has been processed
  };

  // Handle filter toggle with scroll
  const handleFilterToggle = (filterKey) => {
    onFilterToggle(filterKey);
    scrollToTimeline();
  };

  return (
    <div className={`left-sidebar glass glass-strong ${lightMode ? 'left-sidebar--light' : 'left-sidebar--dark'} ${className}`}>
      {/* Filter pills - direct layout without container */}
      <div className="left-sidebar__filters">
        {filters.map((filter) => {
          // Determine if this filter should be highlighted
          const isActive = activeFilters.includes(filter.key);
          const isScrollHighlighted = activeFilters.length === 0 && visibleCategory === filter.key;
          const isTypewriterHighlighted = sidebarCategories.includes(filter.key);
          
          return (
            <button
              key={filter.key}
              className={`left-sidebar__pill ${
                isActive ? 'left-sidebar__pill--active' : ''
              } ${isScrollHighlighted ? 'left-sidebar__pill--scroll-highlight' : ''} ${
                isTypewriterHighlighted ? 'left-sidebar__pill--typewriter-highlight' : ''
              }`}
              onClick={() => handleFilterToggle(filter.key)}
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