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
    // Improved throttling using requestAnimationFrame for better performance
    if (isThrottled) return;
    
    setIsThrottled(true);
    requestAnimationFrame(() => {
      setTimeout(() => setIsThrottled(false), 16); // 16ms (60fps) for smoother performance
    });
    
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

    // Check if we've actually scrolled into the timeline area
    // If the user is still at the very top, don't apply any scroll highlighting
    const timeline = document.querySelector('.timeline');
    if (timeline) {
      const timelineRect = timeline.getBoundingClientRect();
      // Only apply scroll highlighting if the timeline is meaningfully visible
      // (at least 5% of the timeline container is visible for better responsiveness)
      const timelineVisibleHeight = Math.min(timelineRect.bottom, containerRect.bottom) - Math.max(timelineRect.top, containerRect.top);
      const timelineVisibilityRatio = timelineVisibleHeight / timelineRect.height;
      
      if (timelineVisibilityRatio < 0.05) {
        // Timeline is not meaningfully visible yet - reset highlighting
        setCentermostCard(null);
        setVisibleCategory('all');
        return;
      }
    }

    let centermostItem = null;
    let smallestDistance = Infinity;
    let centermostCategory = 'all';

    // Find the timeline item whose center is closest to the viewport center
    timelineItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.top + rect.height * 0.5;
      const distanceFromCenter = Math.abs(itemCenter - viewportCenter);

      // Only consider items that are reasonably visible (not just barely peeking)
      const itemVisibleHeight = Math.min(rect.bottom, containerRect.bottom) - Math.max(rect.top, containerRect.top);
      const itemHeight = rect.height;
      const itemVisibilityRatio = itemVisibleHeight / itemHeight;
      
      if (itemVisibilityRatio > 0.15) { // Item must be at least 15% visible for smooth transitions
        // Find centermost for highlighting
        if (distanceFromCenter < smallestDistance) {
          smallestDistance = distanceFromCenter;
          centermostItem = item;
          centermostCategory = item.getAttribute('data-category') || 'all';
        }
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