import React, { useEffect, useState } from 'react';
import './App.css';

import texts from './texts';

import TextContainer from './components/TextContainer';
import FooterMenu from './components/FooterMenu';
import Backdrop from './components/Backdrop';
import themes from './themes';

import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core/styles";

import LinearProgress from '@material-ui/core/LinearProgress';



const useStyles = makeStyles(() => ({
  body: {
    backgroundColor: ({ background }) => background,
    height: '100vh',
  },
  progress: {
    zIndex:'11'
  }
}));


const ST = { RUNNING: 'running', PAUSE: 'pause', STOP: 'stop' };
const DEFAULT = { SPEED: 40, TEXT: texts.es[0], CHARACTERS: 30 };

function App() {


  const [counter, setCounter] = useState(0);
  const [state, setState] = useState(ST.STOP);

  const [theme, setTheme] = useState(themes.light);

  const [text, setText] = useState(DEFAULT.TEXT);
  const [speed, setSpeed] = useState(DEFAULT.SPEED);
  const [characters, setCharacters] = useState(DEFAULT.CHARACTERS);

  const classes = useStyles(theme);


  // HANDLE SELECTION MOVEMENT;
  useEffect(() => {
    if (state !== ST.RUNNING) return;
    console.log(counter);

    let timer;

    if (counter < text.content.length) {
      timer = setInterval(() => setCounter(counter + 1), speed);
    } else {
      console.log('done');
      setState(ST.STOP);
      setCounter(0);
    }
    return () => clearInterval(timer);
  }, [counter, speed, text, state]);

  //ON SPACEBAR CLICK;
  useEffect(() => {
    document.body.onkeyup = function (e) {
      if (e.keyCode === 32) {
        debugger;
        console.log('spacebar');
        if (state === ST.RUNNING) {
          setState(ST.PAUSE);
        } else if (state === ST.PAUSE || state === ST.STOP) {
          setState(ST.RUNNING);
        }
      }
    }
  }, [state])


  const setTState = (stt) => {
    console.log(stt);
    if (state === stt) return;
    if (stt === ST.STOP) setCounter(0);
    setState(stt);
  }

  const progressPct = () => {
    return (counter * 100) / text.content.length;
  }

  const handleBodyClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <>
      <div className={classes.body} onClick={handleBodyClick}>
        <LinearProgress
          thickness={14}
          variant="determinate"
          value={progressPct()}
          className={classes.progress}
        />
        <TextContainer
          theme={theme}
          state={state}
          text={text}
          caretPos={counter}
          characters={characters}
        />
        <Backdrop open={state !== ST.RUNNING} />
      </div>
    </>
  );

}

export default App;