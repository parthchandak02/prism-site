import { useState, useEffect, useCallback } from 'react';

const useGlobalMouse = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [viewportPosition, setViewportPosition] = useState({ x: 0, y: 0 });

  const updateMousePosition = useCallback((e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Raw pixel coordinates
    setMousePosition({ x, y });
    
    // Normalized coordinates (-1 to 1) for R3F
    const normalizedX = (x / window.innerWidth) * 2 - 1;
    const normalizedY = -(y / window.innerHeight) * 2 + 1;
    
    setViewportPosition({ x: normalizedX, y: normalizedY });
  }, []);

  useEffect(() => {
    // Add event listener to document to catch ALL mouse movements
    document.addEventListener('mousemove', updateMousePosition, { passive: true });
    
    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
    };
  }, [updateMousePosition]);

  return {
    mousePosition,
    viewportPosition
  };
};

export default useGlobalMouse; 