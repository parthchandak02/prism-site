import './GlassPill.css';

const GlassPill = ({ 
  icon: Icon, 
  text,
  onClick,
  lightMode = false,
  className = '',
  ...props 
}) => {
  return (
    <div
      className={`glass-card glass glass-interactive ${lightMode ? 'glass-card--light' : 'glass-card--dark'} ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className="glass-card__logo">
        {Icon && <Icon />}
      </div>
      <div className="glass-card__text">
        {text}
      </div>
    </div>
  );
};

export default GlassPill; 