import { useState, useEffect, useCallback, useRef } from 'react';

const useGlobalMouse = () => {
  // Initialize with center-left position for automatic rainbow effect
  const centerLeftX = window.innerWidth * 0.15; // 15% from left edge  
  const centerLeftY = window.innerHeight * 0.5; // Center vertically
  
  const [mousePosition, setMousePosition] = useState({ x: centerLeftX, y: centerLeftY });
  const [viewportPosition, setViewportPosition] = useState({ 
    x: (centerLeftX / window.innerWidth) * 2 - 1, // Convert to normalized coordinates
    y: -(centerLeftY / window.innerHeight) * 2 + 1 
  });
  
  const hasUserMoved = useRef(false);

  const updatePosition = useCallback((x, y) => {
    hasUserMoved.current = true;
    
    // Raw pixel coordinates
    setMousePosition({ x, y });
    
    // Normalized coordinates (-1 to 1) for R3F
    const normalizedX = (x / window.innerWidth) * 2 - 1;
    const normalizedY = -(y / window.innerHeight) * 2 + 1;
    
    setViewportPosition({ x: normalizedX, y: normalizedY });
  }, []);

  const updateMousePosition = useCallback((e) => {
    updatePosition(e.clientX, e.clientY);
  }, [updatePosition]);

  const updateTouchPosition = useCallback((e) => {
    // Use first touch point without preventing default behavior (allows scrolling)
    const touch = e.touches[0] || e.changedTouches[0];
    if (touch) {
      updatePosition(touch.clientX, touch.clientY);
    }
  }, [updatePosition]);

  // Programmatic position setter for automatic positioning
  const setAutomaticPosition = useCallback((pixelX, pixelY) => {
    if (hasUserMoved.current) return; // Don't override user input
    
    setMousePosition({ x: pixelX, y: pixelY });
    
    // Convert to normalized coordinates
    const normalizedX = (pixelX / window.innerWidth) * 2 - 1;
    const normalizedY = -(pixelY / window.innerHeight) * 2 + 1;
    
    setViewportPosition({ x: normalizedX, y: normalizedY });
  }, []);

  useEffect(() => {
    // Set initial position on page load (slight delay to ensure proper initialization)
    const initTimer = setTimeout(() => {
      if (!hasUserMoved.current) {
        const initialX = window.innerWidth * 0.15; // 15% from left
        const initialY = window.innerHeight * 0.5; // Center vertically
        setAutomaticPosition(initialX, initialY);
      }
    }, 100);

    // Add event listeners for both mouse and touch events
    document.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('touchstart', updateTouchPosition, { passive: true });
    document.addEventListener('touchmove', updateTouchPosition, { passive: true });
    
    return () => {
      clearTimeout(initTimer);
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('touchstart', updateTouchPosition);
      document.removeEventListener('touchmove', updateTouchPosition);
    };
  }, [updateMousePosition, updateTouchPosition, setAutomaticPosition]);

  return {
    mousePosition,
    viewportPosition,
    setAutomaticPosition,
    hasUserMoved: hasUserMoved.current
  };
};

export default useGlobalMouse; 