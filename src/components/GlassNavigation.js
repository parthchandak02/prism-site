import { 
  // Core Technologies
  Code, Database, GitBranch, Globe,
  // Programming Languages  
  Cpu, Terminal, Settings, Zap,
  // Hardware & Robotics
  CircuitBoard, Microchip,
  // Design & Creative
  Figma, Palette, Layers, Box,
  // Engineering & CAD
  Printer, PenTool,
  // Professional Tools
  FileText,
  // Additional Tools
  Gamepad2, Trello, Mail, Monitor
} from 'lucide-react';
import GlassPill from './GlassPill';
import { useTypewriterHighlight } from '../contexts/TypewriterHighlightContext';
import './GlassNavigation.css';

/**
 * =============================================================================
 * GLASS NAVIGATION - PERFECT TRIANGULAR PRISM LAYOUT (RESUME-BASED)
 * =============================================================================
 * 
 * ✅ PERFECT TRIANGLE: 1-2-3-4-5-6 pattern (21 total skills)
 * ✅ Based on actual resume skills from @Resume_Shared.md
 * ✅ No broken triangle effect - proper pyramid shape
 * ✅ Uses real expertise: Python, C++, MATLAB, SolidWorks, Figma, Unity, etc.
 * 
 * PERFECT TRIANGULAR STRUCTURE:
 * Row 1: 1 skill (apex)
 * Row 2: 2 skills  
 * Row 3: 3 skills
 * Row 4: 4 skills
 * Row 5: 5 skills
 * Row 6: 6 skills (base) - PERFECT TRIANGLE!
 */

const GlassNavigation = ({ lightMode = false }) => {
  const { getCurrentHighlights } = useTypewriterHighlight();
  const highlights = getCurrentHighlights();
  
  // Perfect triangle using actual resume skills - NO broken triangle effect!
  const perfectTriangle = [
    // Row 1 (Apex) - Most important skill
    [
      { icon: Code, text: 'Python', action: () => {} }
    ],
    
    // Row 2 - Core programming languages
    [
      { icon: Terminal, text: 'JavaScript', action: () => {} },
      { icon: Settings, text: 'C++', action: () => {} }
    ],
    
    // Row 3 - Systems & Core Tech
    [
      { icon: Cpu, text: 'MATLAB', action: () => {} },
      { icon: Globe, text: 'Linux', action: () => {} },
      { icon: Database, text: 'Database', action: () => {} }
    ],
    
    // Row 4 - Hardware & Development
    [
      { icon: CircuitBoard, text: 'Arduino', action: () => {} },
      { icon: Microchip, text: 'Raspberry Pi', action: () => {} },
      { icon: GitBranch, text: 'Git', action: () => {} },
      { icon: Zap, text: 'React', action: () => {} }
    ],
    
    // Row 5 - Design & CAD Tools (from resume)
    [
      { icon: PenTool, text: 'SolidWorks', action: () => {} },
      { icon: Box, text: 'Fusion 360', action: () => {} },
      { icon: Figma, text: 'Figma', action: () => {} },
      { icon: Layers, text: 'Blender', action: () => {} },
      { icon: Printer, text: '3D Printing', action: () => {} }
    ],
    
    // Row 6 (Base) - Professional Tools & Platforms (from resume)
    [
      { icon: Gamepad2, text: 'Unity', action: () => {} },
      { icon: Palette, text: 'ProtoPie', action: () => {} },
      { icon: Monitor, text: 'Miro', action: () => {} },
      { icon: Trello, text: 'JIRA', action: () => {} },
      { icon: Mail, text: 'G-Suite', action: () => {} },
      { icon: FileText, text: 'Confluence', action: () => {} }
    ]
  ];

  return (
    <nav className="glass-navigation">
      <div className="glass-navigation__triangle">
        {perfectTriangle.map((row, rowIndex) => (
          <div key={rowIndex} className="glass-navigation__triangle-row">
            {row.map((skill, skillIndex) => {
              const isHighlighted = highlights.navigationIcons.includes(skill.text);
              return (
                <GlassPill
                  key={`${rowIndex}-${skillIndex}`}
                  icon={skill.icon}
                  text={skill.text}
                  onClick={skill.action}
                  lightMode={lightMode}
                  className={isHighlighted ? 'glass-pill--highlighted highlight-subtle' : ''}
                />
              );
            })}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default GlassNavigation; 