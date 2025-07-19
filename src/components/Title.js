import './Title.css';
import { ReactTyped } from 'react-typed';
import { useTypewriterHighlight } from '../contexts/TypewriterHighlightContext';
// import useTypewriter from '../hooks/useTypewriter'; // Original implementation (backup)

const Title = ({ lightMode, className = '' }) => {
  const { updateCurrentPhrase } = useTypewriterHighlight();

  // Comprehensive phrases reflecting full skill range and career achievements
  const typewriterPhrases = [
    // Core Programming & Development
    'Full Stack Developer',
    'Python Developer', 
    'JavaScript Engineer',
    'Systems Programmer',
    
    // Hardware & Embedded Systems
    'Hardware Engineer',
    'Embedded Systems Developer',
    'Robotics Engineer',
    
    // Design & CAD Expertise  
    'CAD Specialist',
    'UX Designer',
    'Creative Technologist',
    '3D Designer',
    
    // Professional & Project Management
    'Project Manager',
    'Technical Lead',
    'Game Developer',
    
    // Manufacturing & Engineering
    'Manufacturing Engineer',
    'Design Engineer', 
    'Prototyping Expert',
    
    // Research & Innovation
    'Research Engineer',
    'AI Researcher',
    
    // Specialized Roles
    'Patent Inventor',
    'Technical Writer',
    'Data Analyst',
    'Automation Specialist'
  ];

  return (
    <div className={`title ${lightMode ? 'title--light' : 'title--dark'} ${className}`}>
      <h1 className="title__heading">
        Parth Chandak
      </h1>
      <p className="title__subtitle">
        <ReactTyped
          strings={typewriterPhrases}
          typeSpeed={60}
          backSpeed={40}
          backDelay={1800}
          startDelay={300}
          loop={true}
          showCursor={false}
          smartBackspace={true}
          onStringTyped={(arrayPos) => {
            // Update context when string is fully typed
            const phrase = typewriterPhrases[arrayPos];
            setTimeout(() => updateCurrentPhrase(phrase), 0);
          }}
          preStringTyped={() => {
            // Clear highlight before typing new string
            setTimeout(() => updateCurrentPhrase(''), 0);
          }}
          onBegin={() => {
            // Clear highlight when animation begins
            setTimeout(() => updateCurrentPhrase(''), 0);
          }}
        />
        <span className="typewriter-cursor">|</span>
      </p>
    </div>
  );
};

export default Title; 