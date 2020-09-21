import React, { useEffect, useRef } from 'react';


const TextContainer = function ({ text, caretPos, selection, state }) {

  const textRef = useRef(null);

  // FOCUS THE THEX AREA
  useEffect(() => textRef.current.focus(), [state])

  // Move everytime any of them change.
  useEffect(() => {
    switch (state) {
      case 'running':
        setSelectionRange(textRef.current, caretPos, caretPos + selection);
        break;
      case 'pause':
        //nothing
        break;
      case 'stop':
        setSelectionRange(textRef.current, 0, 0);
        break;
      default:
        break;
    }
  }, [caretPos, selection, state])


  const setSelectionRange = (element, selectionStart, selectionEnd) => {
    element.setSelectionRange(selectionStart, selectionEnd);
  }

  return <textarea
    ref={textRef}
    readOnly
    style={{ width: '100%', height: '100px', backgroundColor: 'white' }}
    onClick={() => { }}
    value={text.content}
  ></textarea>;
};


export default TextContainer;