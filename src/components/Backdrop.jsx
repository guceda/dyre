import React from 'react';

import { makeStyles, Backdrop, IconButton } from '@material-ui/core';
import SpaceBarIcon from '@material-ui/icons/SpaceBar';
import Card from './Card';



const useStyles = makeStyles(() => ({
  body: {
    backgroundColor: ({ background }) => background,
    height: '100vh',
  },
  helperText: {
    color: 'white',
    fontSize: 40,
    display: 'block'
  },
  backdrop: {
    zIndex: 10,
    color: 'rgba(0,0,0,0.6)'
  }
}));




const BackdropCmp = ({ open, start, texts, selectedText, setText, theme }) => {

  const classes = useStyles();

  debugger;

  return (
    <Backdrop className={classes.backdrop} open={open} onClick={() => { }}>
      {texts.map(text => (
        <Card
        selected={text.id === selectedText.id}
        onClick={() => setText(text)}
        title={text.title}
        lang={text.lang}
        words={text.words}
        level={text.level}
        />
      ))}
      <div className={classes.helperText}>Press space bar to start reading</div>
      <IconButton onClick={start} >
        <SpaceBarIcon style={{ fontSize: 100, color: 'white' }} />
      </IconButton>

    </Backdrop>
  );
}


export default BackdropCmp;