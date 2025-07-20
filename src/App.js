import React, { useEffect, useState, useMemo } from 'react';
import Layout from './components/Layout';
import Canvas3D from './components/Canvas3D';
import GlassNavigation from './components/GlassNavigation';
import LightToggle from './components/LightToggle';
import LockToggle from './components/LockToggle';
import Timeline from './components/Timeline';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import UITypewriter from './components/UITypewriter';
import useLightMode from './hooks/useLightMode';
import useGlobalMouse from './hooks/useGlobalMouse';
import { timelineData } from './data/timelineData';
import { TypewriterHighlightProvider } from './contexts/TypewriterHighlightContext';

/**
 * Main App component - Clean, modular structure following React 2024 best practices
 * 
 * Features:
 * - Modular component structure
 * - Separation of concerns (UI, 3D, logic)
 * - Custom hooks for state management
 * - CSS modules for styling
 * - Reusable components
 * - Light beam lock/unlock functionality
 * - Responsive sidebar layout with timeline filters and social links
 * - Fast typewriter effect in UI layer
 */
export default function App() {
  const { lightMode, toggleLightMode } = useLightMode(false);
  // Single source of truth for all mouse state
  const { isLocked, toggleLock, viewportPosition } = useGlobalMouse();
  
  // Filter state for the timeline
  const [activeFilter, setActiveFilter] = useState('all');

  // Get unique categories for filter buttons
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(timelineData.map(item => item.category?.toLowerCase()).filter(Boolean))];
    return cats;
  }, []);

  // Format filters for sidebar components
  const filters = useMemo(() => {
    return categories.map(category => ({
      key: category,
      label: category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)
    }));
  }, [categories]);

  // Sync html and body background with light mode to prevent edge bleeding
  useEffect(() => {
    const className = lightMode ? 'light-mode' : 'dark-mode';
    document.documentElement.className = className;
    document.body.className = className;
  }, [lightMode]);

  return (
    <TypewriterHighlightProvider>
      <Layout 
        darkMode={!lightMode}
        leftSidebar={categories.length > 1 ? (
          <LeftSidebar
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            lightMode={lightMode}
          />
        ) : null}
        rightSidebar={
          <RightSidebar
            lightMode={lightMode}
          />
        }
      >
        {/* 3D Canvas Background */}
        <Canvas3D 
          lightMode={lightMode} 
          viewportPosition={viewportPosition} 
          isLocked={isLocked}
        />
        
        {/* UI Overlay Layer */}
        <div className="layout__ui">
          {/* Fixed UI Components */}
          <LightToggle lightMode={lightMode} onToggle={toggleLightMode} />
          <LockToggle isLocked={isLocked} onToggle={toggleLock} />
          
          {/* Main Content Area with Timeline */}
          <div className="main-content-scroll">
            {/* Typewriter that scrolls with content */}
            <UITypewriter lightMode={lightMode} />
            
            <GlassNavigation lightMode={lightMode} />
            <Timeline 
               data={timelineData}
               activeFilter={activeFilter}
               showFilters={false} // Filters are now handled by LeftSidebar
               lightMode={lightMode}
               className="timeline-in-scroll"
             />
          </div>
        </div>
      </Layout>
    </TypewriterHighlightProvider>
  );
}
