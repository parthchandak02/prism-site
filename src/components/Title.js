import './Title.css';
import useTypewriter from '../hooks/useTypewriter';
// import useTypewriterAdvanced from '../hooks/useTypewriterAdvanced'; // TypeIt version (needs DOM ref)

const Title = ({ lightMode, className = '' }) => {
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

  // ⚡ Optimized timing for comprehensive phrase cycling
  const { currentText } = useTypewriter({ 
    phrases: typewriterPhrases, 
    typeSpeed: 180,           // Slightly slower for readability with more phrases
    deleteSpeed: 60,          // Fast deletion
    delayBetweenPhrases: 2800, // Longer pause to appreciate each complete phrase
    startDelay: 300           // Brief startup delay
  });

  return (
    <div className={`title ${lightMode ? 'title--light' : 'title--dark'} ${className}`}>
      <h1 className="title__heading">
        Parth Chandak
      </h1>
      <p className="title__subtitle">
        {currentText}
        <span className="typewriter-cursor">|</span>
      </p>
    </div>
  );
};

export default Title; 