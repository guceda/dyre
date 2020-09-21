import React, { useEffect, useRef } from 'react';


const TextContainer = function ({ text, caretPos, selection }) {
  
  const textRef = useRef(null);

  useEffect(() => {
    textRef.current.focus();
  },[]) 

  useEffect(() => {
    const textEl = textRef.current;

    (selection > 0) ?
      setSelectionRange(textEl, caretPos, caretPos + selection) :
      setCaretToPos(textEl, caretPos);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caretPos, selection])

  const setSelectionRange = (element, selectionStart, selectionEnd) => {
    element.setSelectionRange(selectionStart, selectionEnd);
  }

  const setCaretToPos = (el, pos) => setSelectionRange(el, pos, pos);

  return <textarea
    ref={textRef}
    readOnly
    style={{ width: '100%', height: '100vh', backgroundColor:'black'}}
    onClick={() => {}}
    value={text.content}
  ></textarea>;
};


export default TextContainer;