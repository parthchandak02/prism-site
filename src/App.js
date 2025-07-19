// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import Layout from './components/Layout';
import Canvas3D from './components/Canvas3D';
import GlassNavigation from './components/GlassNavigation';
import LightToggle from './components/LightToggle';
import LockToggle from './components/LockToggle';
import Title from './components/Title';
import Timeline from './components/Timeline';
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
 */
export default function App() {
  const { lightMode, toggleLightMode } = useLightMode(false);
  // Single source of truth for all mouse state
  const { isLocked, toggleLock, viewportPosition } = useGlobalMouse();

  // Sync html and body background with light mode to prevent edge bleeding
  useEffect(() => {
    const className = lightMode ? 'light-mode' : 'dark-mode';
    document.documentElement.className = className;
    document.body.className = className;
  }, [lightMode]);

  return (
    <TypewriterHighlightProvider>
      <Layout darkMode={!lightMode}>
        {/* 3D Canvas Background - pass mouse state down */}
        <Canvas3D lightMode={lightMode} viewportPosition={viewportPosition} isLocked={isLocked} />
        
        {/* UI Overlay Layer */}
        <div className="layout__ui">
          {/* Fixed UI Components */}
          <LightToggle lightMode={lightMode} onToggle={toggleLightMode} />
          <LockToggle isLocked={isLocked} onToggle={toggleLock} />
          
          {/* Main Content Area with Title and Timeline */}
          <div className="main-content-scroll">
            <Title lightMode={lightMode} className="title-in-scroll" />
            <GlassNavigation lightMode={lightMode} />
            <Timeline 
               data={timelineData}
               showFilters={true}
               defaultFilter="all"
               lightMode={lightMode}
               className="timeline-in-scroll"
             />
          </div>
        </div>
      </Layout>
    </TypewriterHighlightProvider>
  );
}
