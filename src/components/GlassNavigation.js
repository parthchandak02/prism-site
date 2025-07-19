import { FaReact, FaNode, FaGitAlt, FaCode, FaDatabase } from 'react-icons/fa';
import GlassPill from './GlassPill';
import { useTypewriterHighlight } from '../contexts/TypewriterHighlightContext';
import './GlassNavigation.css';

/**
 * =============================================================================
 * GLASS NAVIGATION - HOW TO ADD NEW ICONS
 * =============================================================================
 * 
 * STEP 1: Import your icon from react-icons
 * Example: import { FaYourIcon } from 'react-icons/fa';
 * 
 * STEP 2: Add to navigationItems array below
 * Example: { icon: FaYourIcon, text: 'Your Text', action: () => {} }
 * 
 * STEP 3: Update TypewriterHighlightContext.js highlightConfig
 * Use the EXACT same text in the navigationIcons array
 * 
 * The text field MUST match exactly between here and the context config!
 */

const GlassNavigation = ({ lightMode = false }) => {
  const { getCurrentHighlights } = useTypewriterHighlight();
  const highlights = getCurrentHighlights();
  
  const navigationItems = [
    { icon: FaReact, text: 'React', action: () => {} },
    { icon: FaNode, text: 'Node.js', action: () => {} },
    { icon: FaGitAlt, text: 'Git', action: () => {} },
    { icon: FaCode, text: 'Code', action: () => {} },
    // EXAMPLE: New icon added - now update TypewriterHighlightContext.js to use it
    { icon: FaDatabase, text: 'Database', action: () => {} }
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
              className={isHighlighted ? 'glass-pill--highlighted highlight-subtle' : ''}
            />
          );
        })}
      </div>
    </nav>
  );
};

export default GlassNavigation; 