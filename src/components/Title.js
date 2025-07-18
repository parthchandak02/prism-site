import './Title.css';
import useTypewriter from '../hooks/useTypewriter';

const Title = ({ lightMode, className = '' }) => {
  const phrases = [
    'Creative Technologist',
    'Engineer', 
    'Researcher',
    'Leader'
  ];

  const { currentText } = useTypewriter({ 
    phrases, 
    typeSpeed: 100,
    deleteSpeed: 20,
    delayBetweenPhrases: 1000
  });

  return (
    <div className={`title ${lightMode ? 'title--light' : 'title--dark'} ${className}`}>
      <h1 className="title__heading">
        Parth Chandak
      </h1>
      <p className="title__subtitle text-display">
        {currentText}
        <span className="typewriter-cursor">|</span>
      </p>
    </div>
  );
};

export default Title; 