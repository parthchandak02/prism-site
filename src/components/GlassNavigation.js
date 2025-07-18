import { FaReact, FaNode, FaGitAlt, FaCode } from 'react-icons/fa';
import GlassPill from './GlassPill';
import { useTypewriterHighlight } from '../contexts/TypewriterHighlightContext';
import './GlassNavigation.css';

const GlassNavigation = ({ lightMode = false }) => {
  const { getCurrentHighlights } = useTypewriterHighlight();
  const highlights = getCurrentHighlights();
  
  const navigationItems = [
    { icon: FaReact, text: 'React', action: () => {} },
    { icon: FaNode, text: 'Node.js', action: () => {} },
    { icon: FaGitAlt, text: 'Git', action: () => {} },
    { icon: FaCode, text: 'Code', action: () => {} }
  ];

  return (
    <nav className="glass-navigation">
      <div className="glass-navigation__grid">
        {navigationItems.map((item, index) => {
          const isHighlighted = highlights.navigationIcons.includes(item.text);
          return (
            <GlassPill
              key={index}
              icon={item.icon}
              text={item.text}
              onClick={item.action}
              lightMode={lightMode}
              className={isHighlighted ? 'glass-pill--highlighted' : ''}
            />
          );
        })}
      </div>
    </nav>
  );
};

export default GlassNavigation; 