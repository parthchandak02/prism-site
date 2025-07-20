import { useState, useEffect } from 'react';
import { ReactTyped } from 'react-typed';
import { useTypewriterHighlight } from '../contexts/TypewriterHighlightContext';
import './UITypewriter.css';

const UITypewriter = ({ lightMode }) => {
  const { updateCurrentPhrase, getTypewriterData, getFullSentences } = useTypewriterHighlight();
  const [showCursor, setShowCursor] = useState(true);
  
  // Get professional titles and sentences from the centralized context
  const professionalTitles = getTypewriterData();
  const fullSentences = getFullSentences();

  // Cursor blinking effect for static typewriter
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ui-typewriter-container">
      {/* Static introduction typewriter - appears once */}
      <div className={`ui-typewriter-static ${lightMode ? 'ui-typewriter--light' : 'ui-typewriter--dark'}`}>
        <ReactTyped
          strings={['Hi, my name is Parth Chandak']}
          typeSpeed={50}
          startDelay={500}
          showCursor={false}
          loop={false}
          onComplete={() => {
            // Once the static typewriter is done, we can enable the cursor
            setShowCursor(true);
          }}
        />
        <span className={`ui-typewriter__cursor ${showCursor ? 'ui-typewriter__cursor--visible' : ''}`}>
          |
        </span>
      </div>
      
      {/* Cycling professional titles typewriter */}
      <div className={`ui-typewriter-cycling ${lightMode ? 'ui-typewriter--light' : 'ui-typewriter--dark'}`}>
        <ReactTyped
          strings={fullSentences}
          typeSpeed={80}
          backSpeed={50}
          backDelay={2500}
          startDelay={3000} // Start after the static typewriter finishes
          loop={true}
          showCursor={true}
          smartBackspace={true}
          onStringTyped={(arrayPos) => {
            // Only pass the title part (not the prefix) to the highlight context
            const titleOnly = professionalTitles[arrayPos].title;
            updateCurrentPhrase(titleOnly);
          }}
          onDestroy={() => {
            updateCurrentPhrase('');
          }}
        />
      </div>
    </div>
  );
};

export default UITypewriter; 