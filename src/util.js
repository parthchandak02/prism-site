import * as THREE from 'three'

export function lerp(object, prop, goal, speed = 0.1) {
  object[prop] = THREE.MathUtils.lerp(object[prop], goal, speed)
}

const color = new THREE.Color()
export function lerpC(value, goal, speed = 0.1) {
  value.lerp(color.set(goal), speed)
}

const vector = new THREE.Vector3()
export function lerpV3(value, goal, speed = 0.1) {
  value.lerp(vector.set(...goal), speed)
}

export function calculateRefractionAngle(incidentAngle, glassIor = 2.5, airIor = 1.000293) {
  const theta = Math.asin((airIor * Math.sin(incidentAngle)) / glassIor) || 0
  return theta
}

/**
 * Dynamically balance sidebar widths by measuring the left sidebar
 * and setting a CSS custom property for the right sidebar's margin
 */
export const balanceSidebarWidths = () => {
  const leftSidebar = document.querySelector('.layout__left-sidebar');
  const rightSidebar = document.querySelector('.layout__right-sidebar');
  
  if (!leftSidebar) {
    // eslint-disable-next-line no-console
    console.warn('🚫 Sidebar balancing: Left sidebar not found');
    return;
  }
  
  if (!rightSidebar) {
    // eslint-disable-next-line no-console
    console.warn('🚫 Sidebar balancing: Right sidebar not found');
    return;
  }
  
  const leftSidebarWidth = leftSidebar.getBoundingClientRect().width;
  document.documentElement.style.setProperty('--left-sidebar-width', `${leftSidebarWidth}px`);
  
  // eslint-disable-next-line no-console
  console.log(`✅ Sidebar balancing: Left=${leftSidebarWidth}px, CSS variable updated`);
};

/**
 * Set up automatic sidebar width balancing with ResizeObserver
 */
export const setupSidebarBalancing = () => {
  // Initial balance with retry mechanism for timing issues
  const tryBalance = () => {
    balanceSidebarWidths();
    
    // If sidebars not found, retry after a short delay
    const leftSidebar = document.querySelector('.layout__left-sidebar');
    const rightSidebar = document.querySelector('.layout__right-sidebar');
    
    if (!leftSidebar || !rightSidebar) {
      // eslint-disable-next-line no-console
      console.log('🔄 Retrying sidebar balancing in 100ms...');
      setTimeout(tryBalance, 100);
    }
  };
  
  // Try immediately
  tryBalance();
  
  // Also try after the page is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryBalance);
  }
  
  // Set up ResizeObserver to automatically rebalance when content changes
  if (window.ResizeObserver) {
    const resizeObserver = new ResizeObserver(() => {
      balanceSidebarWidths();
    });
    
    const leftSidebar = document.querySelector('.layout__left-sidebar');
    if (leftSidebar) {
      resizeObserver.observe(leftSidebar);
    }
  }
  
  // Fallback: rebalance on window resize
  window.addEventListener('resize', balanceSidebarWidths);
  
  // Cleanup function
  return () => {
    window.removeEventListener('resize', balanceSidebarWidths);
  };
};

/**
 * Visual debugging aid to verify centering
 * Adds temporary visual guides to check if timeline is properly centered
 * Call with showCenteringGuides(true) to show, showCenteringGuides(false) to hide
 */
export const showCenteringGuides = (show = true) => {
  const existingGuides = document.querySelectorAll('.centering-debug-guide');
  existingGuides.forEach(guide => guide.remove());
  
  if (!show) return;
  
  // Create visual center line
  const centerLine = document.createElement('div');
  centerLine.className = 'centering-debug-guide';
  centerLine.style.cssText = `
    position: fixed;
    top: 0;
    left: 50%;
    width: 2px;
    height: 100vh;
    background: red;
    z-index: 9999;
    pointer-events: none;
    opacity: 0.5;
  `;
  document.body.appendChild(centerLine);
  
  // Create sidebar width indicators
  const leftSidebar = document.querySelector('.layout__left-sidebar');
  const rightSidebar = document.querySelector('.layout__right-sidebar');
  
  if (leftSidebar) {
    const leftIndicator = document.createElement('div');
    leftIndicator.className = 'centering-debug-guide';
    const leftRect = leftSidebar.getBoundingClientRect();
    leftIndicator.style.cssText = `
      position: fixed;
      top: 10px;
      left: ${leftRect.left}px;
      width: ${leftRect.width}px;
      height: 20px;
      background: rgba(0, 255, 0, 0.5);
      z-index: 9999;
      pointer-events: none;
      border: 1px solid green;
    `;
    document.body.appendChild(leftIndicator);
  }
  
  if (rightSidebar) {
    const rightIndicator = document.createElement('div');
    rightIndicator.className = 'centering-debug-guide';
    const rightRect = rightSidebar.getBoundingClientRect();
    rightIndicator.style.cssText = `
      position: fixed;
      top: 10px;
      right: ${window.innerWidth - rightRect.right}px;
      width: ${rightRect.width}px;
      height: 20px;
      background: rgba(0, 0, 255, 0.5);
      z-index: 9999;
      pointer-events: none;
      border: 1px solid blue;
    `;
    document.body.appendChild(rightIndicator);
  }
  
  // Auto-remove after 10 seconds
  setTimeout(() => showCenteringGuides(false), 10000);
};

// Make debugging functions available globally for testing
if (typeof window !== 'undefined') {
  window.showCenteringGuides = showCenteringGuides;
  window.balanceSidebarWidths = balanceSidebarWidths;
  window.setupSidebarBalancing = setupSidebarBalancing;
  
  // Debug function to show current CSS variable value
  window.checkSidebarBalance = () => {
    const cssVar = getComputedStyle(document.documentElement).getPropertyValue('--left-sidebar-width');
    const leftSidebar = document.querySelector('.layout__left-sidebar');
    const rightSidebar = document.querySelector('.layout__right-sidebar');
    
    // eslint-disable-next-line no-console
    console.log('🔍 Sidebar Debug Info:');
    // eslint-disable-next-line no-console
    console.log(`  CSS Variable --left-sidebar-width: ${cssVar || 'NOT SET'}`);
    // eslint-disable-next-line no-console
    console.log(`  Left sidebar element: ${leftSidebar ? 'FOUND' : 'NOT FOUND'}`);
    // eslint-disable-next-line no-console
    console.log(`  Right sidebar element: ${rightSidebar ? 'FOUND' : 'NOT FOUND'}`);
    
    if (leftSidebar) {
      const leftRect = leftSidebar.getBoundingClientRect();
      // eslint-disable-next-line no-console
      console.log(`  Left sidebar actual width: ${leftRect.width}px`);
    }
    
    if (rightSidebar) {
      const rightRect = rightSidebar.getBoundingClientRect();
      const computedStyle = getComputedStyle(rightSidebar);
      // eslint-disable-next-line no-console
      console.log(`  Right sidebar actual width: ${rightRect.width}px`);
      // eslint-disable-next-line no-console
      console.log(`  Right sidebar margin-left: ${computedStyle.marginLeft}`);
    }
  };
}
