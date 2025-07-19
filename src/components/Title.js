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

  // ⚡ Super fast timing: ~1 second to type, 0.5 second to delete, 1.5 seconds hold
  const { currentText } = useTypewriter({ 
    phrases, 
    typeSpeed: 200,           // Much faster: ~1 second for longest phrase
    deleteSpeed: 50,         // Very fast deletion: ~0.4 seconds
    delayBetweenPhrases: 2500, // 1.5 second hold when fully written
    startDelay: 200          // Minimal delay
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