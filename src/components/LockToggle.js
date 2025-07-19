import { Lock, Unlock } from 'lucide-react';
import './LockToggle.css';

const LockToggle = ({ isLocked, onToggle }) => {
  return (
    <button
      className={`lock-toggle glass glass-interactive ${isLocked ? 'locked' : ''}`}
      onClick={onToggle}
      aria-label={`${isLocked ? 'Unlock' : 'Lock'} light beam tracking`}
    >
      <span className="lock-toggle__icon">
        {isLocked ? <Lock size={18} /> : <Unlock size={18} />}
      </span>
    </button>
  );
};

export default LockToggle; 