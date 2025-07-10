import React from 'react';
import Layout from './components/Layout';
import Canvas3D from './components/Canvas3D';
import GlassNavigation from './components/GlassNavigation';
import LightToggle from './components/LightToggle';
import Title from './components/Title';
import Attribution from './components/Attribution';
import useLightMode from './hooks/useLightMode';

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
      
      {/* UI Overlay Components */}
      <GlassNavigation />
      <LightToggle lightMode={lightMode} onToggle={toggleLightMode} />
      <Title lightMode={lightMode} />
      <Attribution lightMode={lightMode} />
    </Layout>
  );
}
