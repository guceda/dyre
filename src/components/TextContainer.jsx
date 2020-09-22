import React, { useEffect, useRef } from 'react';

import { makeStyles } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';



const useStyles = makeStyles(() => ({
  container: {
    margin: '10rem 10rem',
    overflow: 'hidden',
  },
  textArea: {
    overflow: 'hidden',
    width: '100%',
    height: 'calc(100vh - 20rem)',
    backgroundColor: ({ background }) => background, // text area background
    color: ({ font }) => font, //text color
    resize: 'none',
    border: '0px',
  },
}));


const TextContainer = function ({ text, caretPos, characters, state, theme }) {

  const textRef = useRef(null);
  const classes = useStyles(theme);

  // FOCUS THE TEXT AREA
  //useEffect(() => textRef.current.focus(), [state])

  // Move everytime any of them change.
  useEffect(() => {
    textRef.current.focus(); // FIXME: remove;
    switch (state) {
      case 'running':
        setSelectionRange(textRef.current, caretPos, caretPos + characters);
        break;
      case 'pause':
        //nothing
        break;
      case 'stop':
        setSelectionRange(textRef.current, 0, caretPos + characters);
        break;
      default:
        break;
    }
  }, [caretPos, characters, state])


  const setSelectionRange = (element, selectionStart, selectionEnd) => {
    element.setSelectionRange(selectionStart, selectionEnd);
  }

  return (
    <div className={classes.container}>
      <TextareaAutosize
        rowsMin={40}
        rowsMax={40}
        ref={textRef}
        readOnly
        className={classes.textArea}
        value={text.content}
      ></TextareaAutosize>
    </div>
  )
};


export default TextContainer;