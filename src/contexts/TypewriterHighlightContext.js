import { createContext, useContext, useState } from 'react';

// Configuration object mapping typewriter phrases to highlight targets
const highlightConfig = {
  'Creative Technologist': {
    navigationIcons: ['React', 'Node.js'], // These will get expanded/highlighted
    timelineCards: ['Creative Technologist (User Experience Prototyping)'] // These will get blue highlight
  },
  'Engineer': {
    navigationIcons: ['Git', 'Code'],
    timelineCards: ['Manufacturing Engineer, Advanced Hardware Manufacturing Operations']
  },
  'Researcher': {
    navigationIcons: ['Node.js'], 
    timelineCards: ['Ethical, Governance, and Usability Challenges in AI-Powered Virtual Health Assistants', 'Systematic Review of Healthcare IoT and Rapid Prototyping Applications']
  },
  'Leader': {
    navigationIcons: ['React', 'Code'],
    timelineCards: ['Engineering Intern, Charging Special Projects']
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
    return highlightConfig[currentPhrase] || { navigationIcons: [], timelineCards: [] };
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
    highlightConfig
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