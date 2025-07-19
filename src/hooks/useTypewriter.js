import { useState, useEffect, useRef, useCallback } from 'react';
import { useTypewriterHighlight } from '../contexts/TypewriterHighlightContext';

const useTypewriter = ({ 
  phrases, 
  typeSpeed = 80, 
  deleteSpeed = 40, 
  delayBetweenPhrases = 1500,
  variableSpeed = true, // Add natural typing rhythm
  startDelay = 200 
}) => {
  const { updateCurrentPhrase } = useTypewriterHighlight();
  const [currentText, setCurrentText] = useState('');
  const timeoutRef = useRef(null);
  const phraseIndexRef = useRef(0);
  const isDeleteRef = useRef(false);

  // Get variable speed for more natural typing
  const getVariableSpeed = useCallback((baseSpeed, currentChar) => {
    if (!variableSpeed) return baseSpeed;
    
    // Add randomness for more human-like typing
    const variation = baseSpeed * 0.2; // 20% variation
    const randomVariation = (Math.random() - 0.5) * variation;
    
    // Common letters type faster, uncommon letters slower
    const commonChars = 'etaoinshrdlcumwfgypbvkjxqz ';
    const isCommon = commonChars.includes(currentChar?.toLowerCase());
    const speedModifier = isCommon ? 0.8 : 1.2;
    
    return Math.max(20, baseSpeed * speedModifier + randomVariation);
  }, [variableSpeed]);

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
            const nextChar = currentPhrase[prevText.length];
            const speed = getVariableSpeed(typeSpeed, nextChar);
            timeoutRef.current = setTimeout(typeCharacter, speed);
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
            const speed = getVariableSpeed(deleteSpeed, '');
            timeoutRef.current = setTimeout(typeCharacter, speed);
            return newText;
          } else {
            // Finished deleting, move to next phrase
            isDeleteRef.current = false;
            phraseIndexRef.current = (phraseIndexRef.current + 1) % phrases.length;
            const speed = getVariableSpeed(typeSpeed, '');
            timeoutRef.current = setTimeout(typeCharacter, speed);
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
  }, [phrases, typeSpeed, deleteSpeed, delayBetweenPhrases, updateCurrentPhrase, getVariableSpeed, startDelay]);

  return { currentText };
};

export default useTypewriter; 