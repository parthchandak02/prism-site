import { Rainbow, Glasses } from 'lucide-react';
import './PlayModeToggle.css';

const PlayModeToggle = ({ isPlayMode, onToggle }) => {
  return (
    <button
      className={`play-mode-toggle glass glass-interactive ${isPlayMode ? 'play-mode' : ''}`}
      onClick={onToggle}
      aria-label={`Switch to ${isPlayMode ? 'reading mode' : 'rainbow play mode'}`}
    >
      <span className="play-mode-toggle__icon">
        {isPlayMode ? <Glasses size={18} /> : <Rainbow size={18} />}
      </span>
    </button>
  );
};

export default PlayModeToggle; 