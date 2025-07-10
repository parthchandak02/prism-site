import React from 'react';
import { FaReact, FaNode, FaGitAlt, FaCode } from 'react-icons/fa';
import GlassPill from './GlassPill';
import './GlassNavigation.css';

const GlassNavigation = () => {
  const navigationItems = [
    { icon: FaReact, text: 'React', action: () => console.log('React clicked!') },
    { icon: FaNode, text: 'Node.js', action: () => console.log('Node.js clicked!') },
    { icon: FaGitAlt, text: 'Git', action: () => console.log('Git clicked!') },
    { icon: FaCode, text: 'Code', action: () => console.log('Code clicked!') }
  ];

  return (
    <nav className="glass-navigation">
      {navigationItems.map((item, index) => (
        <GlassPill
          key={index}
          icon={item.icon}
          text={item.text}
          onClick={item.action}
        />
      ))}
    </nav>
  );
};

export default GlassNavigation; 