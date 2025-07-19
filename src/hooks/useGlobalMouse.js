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
  
  // Lock state - when true, position is completely frozen
  const [isLocked, setIsLocked] = useState(false);
  
  const hasUserMoved = useRef(false);

  const updatePosition = useCallback((x, y) => {
    // CRITICAL: If locked, completely ignore ALL mouse input
    if (isLocked) {
      return;
    }
    
    hasUserMoved.current = true;
    
    // Update both positions
    setMousePosition({ x, y });
    
    const normalizedX = (x / window.innerWidth) * 2 - 1;
    const normalizedY = -(y / window.innerHeight) * 2 + 1;
    
    setViewportPosition({ x: normalizedX, y: normalizedY });
  }, [isLocked]);

  const updateMousePosition = useCallback((e) => {
    updatePosition(e.clientX, e.clientY);
  }, [updatePosition]);

  const updateTouchPosition = useCallback((e) => {
    const touch = e.touches[0] || e.changedTouches[0];
    if (touch) {
      updatePosition(touch.clientX, touch.clientY);
    }
  }, [updatePosition]);

  const setAutomaticPosition = useCallback((pixelX, pixelY) => {
    if (hasUserMoved.current || isLocked) return;
    
    setMousePosition({ x: pixelX, y: pixelY });
    
    const normalizedX = (pixelX / window.innerWidth) * 2 - 1;
    const normalizedY = -(pixelY / window.innerHeight) * 2 + 1;
    
    setViewportPosition({ x: normalizedX, y: normalizedY });
  }, [isLocked]);

  // Simple lock toggle - just flips the boolean
  const toggleLock = useCallback(() => {
    setIsLocked(!isLocked);
  }, [isLocked]);

  useEffect(() => {
    // Initial automatic positioning
    const initTimer = setTimeout(() => {
      if (!hasUserMoved.current && !isLocked) {
        const initialX = window.innerWidth * 0.15;
        const initialY = window.innerHeight * 0.5;
        setAutomaticPosition(initialX, initialY);
      }
    }, 100);

    // Event listeners
    document.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('touchstart', updateTouchPosition, { passive: true });
    document.addEventListener('touchmove', updateTouchPosition, { passive: true });
    
    return () => {
      clearTimeout(initTimer);
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('touchstart', updateTouchPosition);
      document.removeEventListener('touchmove', updateTouchPosition);
    };
  }, [updateMousePosition, updateTouchPosition, setAutomaticPosition, isLocked]);

  return {
    mousePosition,
    viewportPosition, // This stays frozen when locked because updatePosition is blocked
    setAutomaticPosition,
    hasUserMoved: hasUserMoved.current,
    isLocked,
    toggleLock,
    lockedPosition: null // Simplified - not needed with this approach
  };
};

export default useGlobalMouse; 