import { createContext, useContext, useState } from 'react';
import timelineData, { typewriterData } from '../data/timelineData';

/**
 * =============================================================================
 * TYPEWRITER HIGHLIGHT SYSTEM - SINGLE SOURCE OF TRUTH
 * =============================================================================
 * 
 * ✅ All data now lives in timelineData.js - single source of truth!
 * ✅ Typewriter data directly references timeline cards by ID
 * ✅ No more string matching or sync issues
 * ✅ Cleaner architecture with data separated from logic
 */

// Helper function to resolve timeline card IDs to card titles
const resolveTimelineCards = (cardIds) => {
  return cardIds.map(id => {
    const card = timelineData.find(item => item.id === id);
    return card ? card.title : `Unknown Card ${id}`;
  });
};

// Create legacy highlight mappings from timelineData for backward compatibility
const highlightMappings = typewriterData.reduce((acc, item) => {
  acc[item.title] = {
    navigationIcons: item.navigationIcons,
    timelineCards: resolveTimelineCards(item.timelineCardIds),
    sidebarCategories: item.sidebarCategories
  };
  return acc;
}, {});

// Create the context
const TypewriterHighlightContext = createContext();

// Provider component
export const TypewriterHighlightProvider = ({ children }) => {
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [isUserActive, setIsUserActive] = useState(false);

  // Get current highlight configuration
  const getCurrentHighlights = () => {
    if (isUserActive || !currentPhrase) {
      return { navigationIcons: [], timelineCards: [], sidebarCategories: [] };
    }
    return highlightMappings[currentPhrase] || { navigationIcons: [], timelineCards: [], sidebarCategories: [] };
  };

  // Update the current phrase (called by typewriter when phrase is complete)
  const updateCurrentPhrase = (phrase) => {
    setCurrentPhrase(phrase);
  };

  // Set user activity state (pause highlighting when user is interacting)
  const setUserActivity = (active) => {
    setIsUserActive(active);
  };

  // Get typewriter data for the UITypewriter component (imported from timelineData.js)
  const getTypewriterData = () => typewriterData;
  
  // Get full sentences for typing (generated from imported data)
  const getFullSentences = () => {
    return typewriterData.map(item => `${item.prefix} ${item.title}`);
  };

  const value = {
    currentPhrase,
    updateCurrentPhrase,
    getCurrentHighlights,
    isUserActive,
    setUserActivity,
    highlightMappings,
    getTypewriterData,
    getFullSentences
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