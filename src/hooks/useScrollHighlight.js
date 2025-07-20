import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to track the centermost timeline card during scroll
 * and highlight both the card and corresponding sidebar filter
 */
const useScrollHighlight = (activeFilter) => {
  const [visibleCategory, setVisibleCategory] = useState('all');
  const [centermostCard, setCentermostCard] = useState(null);
  const [isThrottled, setIsThrottled] = useState(false);

  const updateCentermostCard = useCallback(() => {
    // Throttle updates for smoother auto-expansion
    if (isThrottled) return;
    
    setIsThrottled(true);
    setTimeout(() => setIsThrottled(false), 100); // 100ms throttle for smoothness
    
    const timelineItems = document.querySelectorAll('.timeline__item[data-category]');
    if (timelineItems.length === 0) {
      return;
    }

    const scrollContainer = document.querySelector('.main-content-scroll');
    if (!scrollContainer) {
      return;
    }

    const containerRect = scrollContainer.getBoundingClientRect();
    const viewportCenter = containerRect.top + containerRect.height * 0.5; // True center of viewport

    let centermostItem = null;
    let smallestDistance = Infinity;
    let centermostCategory = 'all';

    // Find the timeline item whose center is closest to the viewport center
    timelineItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.top + rect.height * 0.5;
      const distanceFromCenter = Math.abs(itemCenter - viewportCenter);

      // Only consider items that are at least partially visible
      const isVisible = rect.bottom > containerRect.top && rect.top < containerRect.bottom;
      
      if (isVisible && distanceFromCenter < smallestDistance) {
        smallestDistance = distanceFromCenter;
        centermostItem = item;
        centermostCategory = item.getAttribute('data-category') || 'all';
      }
    });

    // Get the title of the centermost card for highlighting
    let centermostTitle = null;
    if (centermostItem) {
      const titleElement = centermostItem.querySelector('.timeline-card__title');
      if (titleElement) {
        centermostTitle = titleElement.textContent;
      }
    }

    // Update both states
    setCentermostCard(centermostTitle);
    setVisibleCategory(centermostCategory);
  }, [isThrottled]);

  useEffect(() => {
    // Reset when not in 'all' mode
    if (activeFilter !== 'all') {
      setVisibleCategory(activeFilter);
      setCentermostCard(null);
      return;
    }

    // Small delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      const scrollContainer = document.querySelector('.main-content-scroll');
      if (!scrollContainer) {
        return;
      }
      
      // NO initial check - only respond to actual scroll events
      // This prevents the first card from being auto-expanded on page load
      
      // Add scroll listener
      scrollContainer.addEventListener('scroll', updateCentermostCard);
      
      // Add resize listener in case viewport changes
      window.addEventListener('resize', updateCentermostCard);
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(timeout);
      const scrollContainer = document.querySelector('.main-content-scroll');
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', updateCentermostCard);
      }
      window.removeEventListener('resize', updateCentermostCard);
    };
  }, [activeFilter, updateCentermostCard]);

  return {
    visibleCategory,
    centermostCard
  };
};

export default useScrollHighlight; 