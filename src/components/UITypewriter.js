import { useState, useEffect } from 'react';
import { ReactTyped } from 'react-typed';
import { useTypewriterHighlight } from '../contexts/TypewriterHighlightContext';
import './UITypewriter.css';

const UITypewriter = ({ lightMode }) => {
  const { updateCurrentPhrase } = useTypewriterHighlight();
  const [showCursor, setShowCursor] = useState(true);
  
  // Professional titles with contextual prefixes
  const professionalTitles = [
    { prefix: 'I am a', title: 'Full Stack Developer' },
    { prefix: 'I am a', title: 'Python Developer' },
    { prefix: 'I am a', title: 'JavaScript Engineer' },
    { prefix: 'I am a', title: 'Systems Programmer' },
    { prefix: 'I am a', title: 'Hardware Engineer' },
    { prefix: 'I am an', title: 'Embedded Systems Developer' },
    { prefix: 'I am a', title: 'Robotics Engineer' },
    { prefix: 'I am a', title: 'CAD Specialist' },
    { prefix: 'I am a', title: 'UX Designer' },
    { prefix: 'I am a', title: 'Creative Technologist' },
    { prefix: 'I am a', title: '3D Designer' },
    { prefix: 'I am a', title: 'Project Manager' },
    { prefix: 'I have been a', title: 'Team Lead' },
    { prefix: 'I am a', title: 'Game Developer' },
    { prefix: 'I was a', title: 'Manufacturing Engineer' },
    { prefix: 'I am a', title: 'Design Engineer' },
    { prefix: 'I am a', title: 'Prototyping Expert' },
    { prefix: 'I am a', title: 'Research Engineer' },
    { prefix: 'I do', title: 'AI Research' },
    { prefix: 'I am a', title: 'Patent Inventor' },
    { prefix: 'I am a', title: 'Technical Writer' },
    { prefix: 'I am a', title: 'Data Analyst' },
    { prefix: 'I am an', title: 'Automation Specialist' }
  ];

  // Create the full sentences for typing
  const fullSentences = professionalTitles.map(item => `${item.prefix} ${item.title}`);

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