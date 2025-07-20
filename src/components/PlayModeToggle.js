import { Play, Pause } from 'lucide-react';
import './PlayModeToggle.css';

const PlayModeToggle = ({ isPlayMode, onToggle }) => {
  return (
    <button
      className={`play-mode-toggle glass glass-interactive ${isPlayMode ? 'play-mode' : ''}`}
      onClick={onToggle}
      aria-label={`Switch to ${isPlayMode ? 'resume reading' : 'play'} mode`}
    >
      <span className="play-mode-toggle__icon">
        {isPlayMode ? <Pause size={18} /> : <Play size={18} />}
      </span>
    </button>
  );
};

export default PlayModeToggle; 