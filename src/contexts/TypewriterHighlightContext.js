import { createContext, useContext, useState } from 'react';

/**
 * =============================================================================
 * TYPEWRITER HIGHLIGHT SYSTEM - LUCIDE REACT INTEGRATION
 * =============================================================================
 * 
 * ✅ Updated to work with new Lucide React icon names
 * ✅ Maintains comprehensive skills & achievements showcase
 * ✅ Preserves thematic groupings and career connections
 * ✅ Optimized for the new compact layout
 */

// Enhanced highlight mappings linking typewriter phrases to navigation icons and timeline cards
const highlightMappings = {
  // CORE PROGRAMMING (Triangle Row 1-3)
  'Full Stack Developer': {
    navigationIcons: ['Python', 'JavaScript', 'C++', 'MATLAB', 'React'],
    timelineCards: ['LLM Assisted Research Platform', 'Google Apps Script AI Integration Framework', 'Financial Trading API for Interactive Brokers (IBKR)', 'Calendar and Alarm Productivity System']
  },
  'Python Developer': {
    navigationIcons: ['Python', 'MATLAB', 'Database'],
    timelineCards: ['LLM Assisted Research Platform', 'Google Apps Script AI Integration Framework']
  },
  'JavaScript Engineer': {
    navigationIcons: ['JavaScript', 'React', 'Database'],
    timelineCards: ['Google Apps Script AI Integration Framework', 'Calendar and Alarm Productivity System']
  },
  'Systems Programmer': {
    navigationIcons: ['C++', 'MATLAB', 'Linux'],
    timelineCards: ['Boeing: Damping Ratios of Piloted Systems']
  },

  // HARDWARE & DEVELOPMENT (Triangle Row 4)
  'Hardware Engineer': {
    navigationIcons: ['Arduino', 'Raspberry Pi', 'C++', 'MATLAB'],
    timelineCards: ['IEEE Hardware Hackathon (WSU)', 'Center for Materials Research (WSU)']
  },
  'Embedded Systems Developer': {
    navigationIcons: ['Arduino', 'Raspberry Pi', 'C++', 'Linux'],
    timelineCards: ['IEEE Hardware Hackathon (WSU)', 'Crimson Code Software Hackathon (WSU)']
  },
  'Robotics Engineer': {
    navigationIcons: ['Arduino', 'Raspberry Pi', 'Python', 'C++'],
    timelineCards: ['IEEE Hardware Hackathon (WSU)', 'Crimson Code Software Hackathon (WSU)']
  },

  // DESIGN & CAD TOOLS (Triangle Row 5)
  'CAD Specialist': {
    navigationIcons: ['SolidWorks', 'Fusion 360', '3D Printing'],
    timelineCards: ['Center for Materials Research (WSU)', 'Tesla Motors']
  },
  'UX Designer': {
    navigationIcons: ['Figma', 'ProtoPie', 'Miro'],
    timelineCards: ['UC Berkeley Extension', 'Zoox - Creative Technologist']
  },
  'Creative Technologist': {
    navigationIcons: ['Figma', 'Blender', 'Unity', 'ProtoPie'],
    timelineCards: ['Zoox - Creative Technologist', 'UC Berkeley Extension']
  },
  '3D Designer': {
    navigationIcons: ['Blender', 'SolidWorks', 'Fusion 360', '3D Printing'],
    timelineCards: ['Tesla Motors', 'Center for Materials Research (WSU)']
  },

  // PROFESSIONAL TOOLS & PLATFORMS (Triangle Row 6)
  'Project Manager': {
    navigationIcons: ['JIRA', 'Confluence', 'Google Suite', 'Miro'],
    timelineCards: ['Zoox - Creative Technologist', 'Zoox - Manufacturing Engineer']
  },
  'Technical Lead': {
    navigationIcons: ['Git', 'JIRA', 'Confluence', 'Python'],
    timelineCards: ['Boeing: Damping Ratios of Piloted Systems', 'Zoox - Creative Technologist']
  },
  'Game Developer': {
    navigationIcons: ['Unity', 'C++', 'Blender'],
    timelineCards: ['Crimson Code Software Hackathon (WSU)', 'IEEE Hardware Hackathon (WSU)']
  },

  // MANUFACTURING & ENGINEERING
  'Manufacturing Engineer': {
    navigationIcons: ['SolidWorks', 'MATLAB', 'Python', '3D Printing'],
    timelineCards: ['Zoox - Manufacturing Engineer', 'Tesla Motors', 'BERG Manufacturing']
  },
  'Design Engineer': {
    navigationIcons: ['SolidWorks', 'Fusion 360', 'Figma', '3D Printing'],
    timelineCards: ['Tesla Motors', 'Center for Materials Research (WSU)']
  },
  'Prototyping Expert': {
    navigationIcons: ['3D Printing', 'SolidWorks', 'Arduino', 'Fusion 360'],
    timelineCards: ['Zoox - Creative Technologist', 'Center for Materials Research (WSU)']
  },

  // RESEARCH & INNOVATION
  'Research Engineer': {
    navigationIcons: ['MATLAB', 'Python', 'Blender'],
    timelineCards: ['Boeing: Damping Ratios of Piloted Systems', 'Center for Materials Research (WSU)', 'Ethical, Governance, and Usability Challenges in AI-Powered Virtual Health Assistants']
  },
  'AI Researcher': {
    navigationIcons: ['Python', 'MATLAB', 'Unity'],
    timelineCards: ['LLM Assisted Research Platform', 'Ethical, Governance, and Usability Challenges in AI-Powered Virtual Health Assistants', 'Augmented Reality Enhances Telemedicine Training']
  },

  // SPECIALIZED ROLES
  'Patent Inventor': {
    navigationIcons: ['Python', 'C++', 'Unity'],
    timelineCards: ['AUDIO PRIORITIZATION']
  },
  'Technical Writer': {
    navigationIcons: ['Confluence', 'Google Suite', 'Figma'],
    timelineCards: ['Ethical, Governance, and Usability Challenges in AI-Powered Virtual Health Assistants', 'Augmented Reality Enhances Telemedicine Training', 'The Evolution of Haptic Feedback Systems and User Experience']
  },
  'Data Analyst': {
    navigationIcons: ['Python', 'MATLAB', 'Database', 'Google Suite'],
    timelineCards: ['LLM Assisted Research Platform', 'Financial Trading API for Interactive Brokers (IBKR)']
  },
  'Automation Specialist': {
    navigationIcons: ['Python', 'Arduino', 'Linux', 'Git'],
    timelineCards: ['Google Apps Script AI Integration Framework', 'Calendar and Alarm Productivity System']
  }
};

// Create the context
const TypewriterHighlightContext = createContext();

// Provider component
export const TypewriterHighlightProvider = ({ children }) => {
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [isUserActive, setIsUserActive] = useState(false);

  // Get current highlight configuration
  const getCurrentHighlights = () => {
    if (isUserActive || !currentPhrase) {
      return { navigationIcons: [], timelineCards: [] };
    }
    return highlightMappings[currentPhrase] || { navigationIcons: [], timelineCards: [] };
  };

  // Update the current phrase (called by typewriter when phrase is complete)
  const updateCurrentPhrase = (phrase) => {
    setCurrentPhrase(phrase);
  };

  // Set user activity state (pause highlighting when user is interacting)
  const setUserActivity = (active) => {
    setIsUserActive(active);
  };

  const value = {
    currentPhrase,
    updateCurrentPhrase,
    getCurrentHighlights,
    isUserActive,
    setUserActivity,
    highlightMappings
  };

  return (
    <TypewriterHighlightContext.Provider value={value}>
      {children}
    </TypewriterHighlightContext.Provider>
  );
};

// Custom hook to use the context
export const useTypewriterHighlight = () => {
  const context = useContext(TypewriterHighlightContext);
  if (!context) {
    throw new Error('useTypewriterHighlight must be used within a TypewriterHighlightProvider');
  }
  return context;
};

export default TypewriterHighlightContext; 