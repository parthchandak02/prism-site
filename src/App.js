// eslint-disable-next-line no-unused-vars
import React from 'react';
import Layout from './components/Layout';
import Canvas3D from './components/Canvas3D';
import GlassNavigation from './components/GlassNavigation';
import LightToggle from './components/LightToggle';
import Title from './components/Title';
import Timeline from './components/Timeline';
import useLightMode from './hooks/useLightMode';
import { timelineData } from './data/timelineData';

/**
 * Main App component - Clean, modular structure following React 2024 best practices
 * 
 * Features:
 * - Modular component structure
 * - Separation of concerns (UI, 3D, logic)
 * - Custom hooks for state management
 * - CSS modules for styling
 * - Reusable components
 */
export default function App() {
  const { lightMode, toggleLightMode } = useLightMode(false);

  return (
    <Layout darkMode={!lightMode}>
      {/* 3D Canvas Background */}
      <Canvas3D lightMode={lightMode} />
      
      {/* UI Overlay Layer */}
      <div className="layout__ui">
        {/* Fixed UI Components */}
        <LightToggle lightMode={lightMode} onToggle={toggleLightMode} />
        
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
  );
}
