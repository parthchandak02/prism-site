// React import removed - not needed with modern JSX transform
import { ReactTyped } from 'react-typed';
import { useTypewriterHighlight } from '../contexts/TypewriterHighlightContext';
import './UITypewriter.css';

const UITypewriter = ({ lightMode }) => {
  const { updateCurrentPhrase, getTypewriterData, getFullSentences } = useTypewriterHighlight();
  
  // Get professional titles and sentences from the centralized context
  const professionalTitles = getTypewriterData();
  const fullSentences = getFullSentences();

  return (
    <div className="ui-typewriter-container">
      {/* Static introduction typewriter - appears once */}
      <div className={`ui-typewriter-static ${lightMode ? 'ui-typewriter--light' : 'ui-typewriter--dark'}`}>
        <ReactTyped
          strings={['Hi, my name is Parth Chandak']}
          typeSpeed={50}
          startDelay={500}
          showCursor={false}
          loop={false}
        />
      </div>
      
      {/* Cycling professional titles typewriter */}
      <div className={`ui-typewriter-cycling ${lightMode ? 'ui-typewriter--light' : 'ui-typewriter--dark'}`}>
        <ReactTyped
          strings={fullSentences.map(sentence => {
            // Find the corresponding data item to get prefix and title
            const dataItem = professionalTitles.find(item => sentence === `${item.prefix} ${item.title}`);
            if (dataItem) {
              return `<span class="prefix-part">${dataItem.prefix}</span> <span class="title-part">${dataItem.title}</span>`;
            }
            return sentence;
          })}
          typeSpeed={80}
          backSpeed={50}
          backDelay={2500}
          startDelay={3000} // Start after the static typewriter finishes
          loop={true}
          showCursor={true}
          smartBackspace={true}
          html={true} // Enable HTML parsing for spans
          onStringTyped={(arrayPos) => {
            // Only pass the title part (not the prefix) to the highlight context
            const titleOnly = professionalTitles[arrayPos].title;
            updateCurrentPhrase(titleOnly);
          }}
          onDestroy={() => {
            updateCurrentPhrase('');
          }}
        />
      </div>
    </div>
  );
};

export default UITypewriter; 