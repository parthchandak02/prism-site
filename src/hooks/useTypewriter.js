import { useState, useEffect, useRef } from 'react';
import { useTypewriterHighlight } from '../contexts/TypewriterHighlightContext';

const useTypewriter = ({ 
  phrases, 
  typeSpeed = 80,        // Medium-fast typing (optimal: 50-100ms)
  deleteSpeed = 30,      // Fast deletion (optimal: 20-50ms)
  delayBetweenPhrases = 1500, // 1.5 second hold (optimal: 1-2 seconds)
  startDelay = 500       // Initial delay before starting
}) => {
  const { updateCurrentPhrase } = useTypewriterHighlight();
  const [currentText, setCurrentText] = useState('');
  const timeoutRef = useRef(null);
  const phraseIndexRef = useRef(0);
  const isDeleteRef = useRef(false);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;

    const typeCharacter = () => {
      const currentPhraseIndex = phraseIndexRef.current;
      const isDeleting = isDeleteRef.current;
      const currentPhrase = phrases[currentPhraseIndex];

      setCurrentText(prevText => {
        if (!isDeleting) {
          // Typing forward
          if (prevText.length < currentPhrase.length) {
            const newText = currentPhrase.substring(0, prevText.length + 1);
            timeoutRef.current = setTimeout(typeCharacter, typeSpeed);
            return newText;
          } else {
            // Finished typing - notify context about completed phrase
            updateCurrentPhrase(currentPhrase);
            // Wait then start deleting
            timeoutRef.current = setTimeout(() => {
              isDeleteRef.current = true;
              typeCharacter();
            }, delayBetweenPhrases);
            return prevText;
          }
        } else {
          // Deleting backward
          if (prevText.length > 0) {
            // Start clearing highlight when deletion begins
            if (prevText.length === currentPhrase.length) {
              updateCurrentPhrase('');
            }
            const newText = prevText.substring(0, prevText.length - 1);
            timeoutRef.current = setTimeout(typeCharacter, deleteSpeed);
            return newText;
          } else {
            // Finished deleting, move to next phrase
            isDeleteRef.current = false;
            phraseIndexRef.current = (phraseIndexRef.current + 1) % phrases.length;
            timeoutRef.current = setTimeout(typeCharacter, typeSpeed);
            return '';
          }
        }
      });
    };

    // Start the animation with initial delay
    timeoutRef.current = setTimeout(typeCharacter, startDelay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [phrases, typeSpeed, deleteSpeed, delayBetweenPhrases, updateCurrentPhrase, startDelay]);

  return { currentText };
};

export default useTypewriter; 