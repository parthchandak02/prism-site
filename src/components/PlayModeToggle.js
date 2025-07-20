import { Rainbow, Glasses, Pyramid } from 'lucide-react';
import './PlayModeToggle.css';

const PlayModeToggle = ({ isPlayMode, onToggle }) => {
  return (
    <button
      className={`play-mode-toggle glass glass-interactive ${isPlayMode ? 'play-mode' : ''}`}
      onClick={onToggle}
      aria-label={`Switch to ${isPlayMode ? 'reading mode' : 'prism play mode'}`}
    >
      <span className="play-mode-toggle__icon">
        {isPlayMode ? (
          <Glasses size={18} />
        ) : (
          <span className="play-mode-toggle__icon-container">
            <span className="play-mode-toggle__icon-primary">
              <Pyramid size={18} />
            </span>
            <span className="play-mode-toggle__icon-secondary">
              <Rainbow size={18} />
            </span>
          </span>
        )}
      </span>
    </button>
  );
};

export default PlayModeToggle; 