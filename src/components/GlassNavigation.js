import { FaReact, FaNode, FaGitAlt, FaCode } from 'react-icons/fa';
import GlassPill from './GlassPill';
import './GlassNavigation.css';

const GlassNavigation = ({ lightMode = false }) => {
  const navigationItems = [
    { icon: FaReact, text: 'React', action: () => {} },
    { icon: FaNode, text: 'Node.js', action: () => {} },
    { icon: FaGitAlt, text: 'Git', action: () => {} },
    { icon: FaCode, text: 'Code', action: () => {} }
  ];

  return (
    <nav className="glass-navigation">
      <div className="glass-navigation__grid">
        {navigationItems.map((item, index) => (
          <GlassPill
            key={index}
            icon={item.icon}
            text={item.text}
            onClick={item.action}
            lightMode={lightMode}
          />
        ))}
      </div>
    </nav>
  );
};

export default GlassNavigation; 