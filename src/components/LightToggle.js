import { Sun, Moon } from 'lucide-react';
import './LightToggle.css';

const LightToggle = ({ lightMode, onToggle }) => {
  return (
    <button
      className="light-toggle glass glass-interactive"
      onClick={onToggle}
      aria-label={`Switch to ${lightMode ? 'dark' : 'light'} mode`}
    >
      <span className="light-toggle__icon">
        {lightMode ? <Moon size={20} /> : <Sun size={20} />}
      </span>
    </button>
  );
};

export default LightToggle; 