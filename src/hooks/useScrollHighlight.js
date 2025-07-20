import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to track which timeline category section is currently visible
 * and automatically highlight the corresponding sidebar filter
 */
const useScrollHighlight = (activeFilter) => {
  const [visibleCategory, setVisibleCategory] = useState('all');

  const updateVisibleCategory = useCallback(() => {
    // Only track when in 'all' mode
    if (activeFilter !== 'all') {
      return;
    }

    const timelineItems = document.querySelectorAll('.timeline__item[data-category]');
    if (timelineItems.length === 0) {
      return;
    }

    const scrollContainer = document.querySelector('.main-content-scroll');
    if (!scrollContainer) {
      return;
    }

    const containerRect = scrollContainer.getBoundingClientRect();
    const viewportTop = containerRect.top;
    const viewportBottom = containerRect.bottom;
    const viewportCenter = viewportTop + containerRect.height * 0.3; // 30% from top

    let bestCategory = 'all';
    let bestScore = 0;

    // Check each timeline item to see which category is most prominent
    timelineItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const category = item.getAttribute('data-category');
      
      if (!category) return;

      // Calculate how much of this item is visible in the viewport
      const visibleTop = Math.max(rect.top, viewportTop);
      const visibleBottom = Math.min(rect.bottom, viewportBottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const totalHeight = rect.bottom - rect.top;
      const visibilityRatio = visibleHeight / totalHeight;

      // Give extra weight to items near the center
      const itemCenter = rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(itemCenter - viewportCenter);
      const centerWeight = Math.max(0, 1 - (distanceFromCenter / containerRect.height));

      const score = visibilityRatio * (0.7 + 0.3 * centerWeight);

      if (score > bestScore) {
        bestScore = score;
        bestCategory = category;
      }
    });

    // If we're at the very top, default to first category
    if (scrollContainer.scrollTop < 50 && timelineItems.length > 0) {
      const firstCategory = timelineItems[0].getAttribute('data-category');
      if (firstCategory) {
        bestCategory = firstCategory;
      }
    }
    setVisibleCategory(bestCategory);
  }, [activeFilter]);

  useEffect(() => {
    // Reset to 'all' when not in all mode
    if (activeFilter !== 'all') {
      setVisibleCategory('all');
      return;
    }

    // Small delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      const scrollContainer = document.querySelector('.main-content-scroll');
      if (!scrollContainer) {
        return;
      }
      
      // Initial check
      updateVisibleCategory();

      // Add scroll listener
      scrollContainer.addEventListener('scroll', updateVisibleCategory);
      
      // Add resize listener in case viewport changes
      window.addEventListener('resize', updateVisibleCategory);
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(timeout);
      const scrollContainer = document.querySelector('.main-content-scroll');
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', updateVisibleCategory);
      }
      window.removeEventListener('resize', updateVisibleCategory);
    };
  }, [activeFilter, updateVisibleCategory]);

  return visibleCategory;
};

export default useScrollHighlight; 