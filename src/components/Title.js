import './Title.css';
import useTypewriter from '../hooks/useTypewriter';
// import useTypewriterAdvanced from '../hooks/useTypewriterAdvanced'; // TypeIt version (needs DOM ref)

const Title = ({ lightMode, className = '' }) => {
  const phrases = [
    'Creative Technologist',
    'Engineer', 
    'Researcher',
    'Leader'
  ];

  // ✨ Enhanced original typewriter with modern features
  const { currentText } = useTypewriter({ 
    phrases, 
    typeSpeed: 60,           // Faster, more modern feel
    deleteSpeed: 30,         // Quick deletion
    delayBetweenPhrases: 1200, // Shorter pause for better UX
    variableSpeed: true,     // Natural human-like typing rhythm
    startDelay: 300
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