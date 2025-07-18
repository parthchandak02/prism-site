import { useState, useEffect, useRef } from 'react';
import { useTypewriterHighlight } from '../contexts/TypewriterHighlightContext';

const useTypewriter = ({ phrases, typeSpeed = 150, deleteSpeed = 100, delayBetweenPhrases = 2000 }) => {
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

    // Start the animation
    timeoutRef.current = setTimeout(typeCharacter, 200); // Initial delay

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [phrases, typeSpeed, deleteSpeed, delayBetweenPhrases]);

  return { currentText };
};

export default useTypewriter; 