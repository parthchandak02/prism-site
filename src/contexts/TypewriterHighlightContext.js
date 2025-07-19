import { createContext, useContext, useState } from 'react';

/**
 * =============================================================================
 * TYPEWRITER HIGHLIGHT SYSTEM - CONFIGURATION & DOCUMENTATION
 * =============================================================================
 * 
 * This system synchronizes highlighting between:
 * 1. Typewriter text (in Title component)
 * 2. Navigation icons (glass pills)
 * 3. Timeline cards
 * 
 * HOW TO ADD NEW NAVIGATION ICONS:
 * --------------------------------
 * 1. Go to src/components/GlassNavigation.js
 * 2. Import your new icon: import { FaYourIcon } from 'react-icons/fa';
 * 3. Add to navigationItems array:
 *    { icon: FaYourIcon, text: 'Your Text', action: () => {} }
 * 4. Update highlightConfig below with the same text
 * 
 * HOW TO HIGHLIGHT MULTIPLE TIMELINE CARDS:
 * -----------------------------------------
 * Just add more titles to the timelineCards array below.
 * Use the EXACT title text from your timeline data.
 * 
 * HOW TO ADD NEW TYPEWRITER PHRASES:
 * ----------------------------------
 * 1. Go to src/components/Title.js
 * 2. Add your phrase to the phrases array
 * 3. Add a new entry to highlightConfig below
 * 
 * EXAMPLE CONFIGURATION:
 * ----------------------
 * 'Your New Phrase': {
 *   navigationIcons: ['React', 'Your New Icon'], // Multiple icons
 *   timelineCards: [
 *     'First Timeline Card Title',
 *     'Second Timeline Card Title'  // Multiple cards
 *   ]
 * }
 */

// Configuration object mapping typewriter phrases to highlight targets
const highlightConfig = {
  'Creative Technologist': {
    navigationIcons: ['React', 'Node.js'], // These navigation pills get highlighted
    timelineCards: ['Creative Technologist (User Experience Prototyping)'] // These timeline cards get blue highlight
  },
  'Engineer': {
    navigationIcons: ['Git', 'Code'],
    timelineCards: ['Manufacturing Engineer, Advanced Hardware Manufacturing Operations']
  },
  'Researcher': {
    navigationIcons: ['Node.js'], 
    timelineCards: [
      'Ethical, Governance, and Usability Challenges in AI-Powered Virtual Health Assistants', 
      'Systematic Review of Healthcare IoT and Rapid Prototyping Applications'
    ] // Example: Multiple timeline cards highlighted for Researcher
  },
  'Leader': {
    navigationIcons: ['React', 'Code', 'Database'], // EXAMPLE: Multiple icons including new Database icon
    timelineCards: [
      'Engineering Intern, Charging Special Projects',
      'Creative Technologist (User Experience Prototyping)' // EXAMPLE: Multiple timeline cards
    ]
  }
  
  /* 
   * TO ADD MORE PHRASES: Copy this template and customize
   * 
   * 'Your Phrase Here': {
   *   navigationIcons: ['Icon1', 'Icon2', 'Icon3'], // Match text from GlassNavigation.js
   *   timelineCards: [
   *     'Exact Timeline Card Title 1',
   *     'Exact Timeline Card Title 2'
   *   ]
   * }
   */
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