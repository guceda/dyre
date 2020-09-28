import React from 'react';

import { makeStyles, Backdrop, IconButton, Grid } from '@material-ui/core';
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
    display: 'block',
  },
  helperContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    zIndex: 10,
    color: 'rgba(0,0,0,0.6)'
  },
  list: {
    flexWrap: 'nowrap',
    overflow: 'scroll',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  container: {
    height: '100%',
  },
 
}));




const BackdropCmp = (
  { open, start, texts, selectedText, setText, theme, speed, setSpeed }) => {

  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={open} onClick={() => { }}>
      <Grid container className={classes.container} direction={'col'}>
        <Grid container className={classes.list} direction={'row'}>
            {texts.map(text => (
          <Grid item xs={3}>
              <Card
                selected={text.id === selectedText.id}
                onClick={() => setText(text)}
                title={text.title}
                lang={text.lang}
                words={text.words}
                level={text.level}
                speed={speed}
                setSpeed={setSpeed}
              />
          </Grid>
            ))}
        </Grid>
        <Grid container className={classes.helperContainer} direction={'row'}>
          <div className={classes.helperText}>Press space bar to start reading</div>
          <IconButton onClick={start}>
            <SpaceBarIcon style={{ fontSize: 100, color: 'white' }} />
          </IconButton>
        </Grid>
      </Grid>
    </Backdrop>
  );
}


export default BackdropCmp;