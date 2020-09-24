import React, { useEffect, useState } from 'react';
import './App.css';

import texts from './texts';

import TextContainer from './components/TextContainer';
import Menu from './components/Menu';
import BackdropCmp from './components/Backdrop';
import Progress from './components/Progress';
import themes from './themes';

import { makeStyles } from "@material-ui/core/styles";

import { WPMtoMSC } from './utils/utils';
import CountDown from './components/CountDown';


const ST = { RUNNING: 'running', PAUSE: 'pause', STOP: 'stop', READY: 'ready' };
const DEFAULT = {
  SPEED: 250, //wpm
  TEXT: texts[4],
  CHARACTERS: 15,
  THEME: themes.dark,
  STATUS: ST.STOP,
};



const useStyles = makeStyles(() => ({
  body: {
    backgroundColor: ({ background }) => background,
    height: '100vh',
    overflow: 'hidden',
  },
  progress: {
    zIndex: '100'
  },
  speed: {
    color: 'rgba(112,112,112,0.8)',
    position: 'absolute',
    width: '100%',
    textAlign: 'right',
    padding: '20px',
  }
}));




function App() {

  const [counter, setCounter] = useState(0);
  const [state, setState] = useState(DEFAULT.STATUS);
  const [theme, setTheme] = useState(DEFAULT.THEME);
  const [text, setText] = useState(DEFAULT.TEXT);
  const [speed, setSpeed] = useState(DEFAULT.SPEED);
  const [characters, setCharacters] = useState(DEFAULT.CHARACTERS);

  const classes = useStyles(theme);


  // HANDLE SELECTION MOVEMENT;
  useEffect(() => {
    if (state !== ST.RUNNING) return;

    let timer;

    if (counter < text.content.length) {
      timer = setInterval(() => {
        setCounter(counter + 1)
      }, WPMtoMSC(text.words, text.characters, speed));
    } else {
      setState(ST.STOP);
      setCounter(0);
      console.log(`Done at ${Date.now()}`)
    }
    return () => clearInterval(timer);
  }, [counter, speed, text, state]);

  //ON SPACEBAR CLICK;
  useEffect(() => {
    document.body.onkeyup = function (e) {
      if (e.keyCode === 32) {
        if (state === ST.RUNNING) {
          setState(ST.PAUSE);
          //go a bit back to ease recovery
          setCounter(counter > 42 ? counter - 40 : counter); //FIXME: make it better
        } else if (state === ST.PAUSE) {
          setState(ST.READY);
        } else if (state === ST.STOP) {
          console.log(`Start at ${Date.now()}`)
          setState(ST.READY);
        }
      }
    }
  }, [state, counter])


  const handleStop = () => {
    setCounter(0);
    setState(ST.STOP);
  }

  const progressPct = () => {
    return (counter * 100) / text.content.length;
  }

  const handleBodyClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const changeTheme = () => {
    setTheme(themes[theme.id === 'light' ? 'dark' : 'light']);
  }

  return (
    <>
      <div className={classes.body} onClick={handleBodyClick}>
        <Progress
          thickness={14}
          variant="determinate"
          value={progressPct()}
          className={classes.progress}
        />
        <div className={classes.speed}>{speed} WPM</div>
        <TextContainer
          theme={theme}
          state={state}
          text={text}
          caretPos={counter}
          characters={characters}
        />
        <Menu
          open={state === ST.PAUSE}
          title={text.title}
          theme={theme}
          changeTheme={changeTheme}
          stop={handleStop}
          speed={speed}
          setSpeed={setSpeed}
          defaultSpeed={DEFAULT.SPEED}
          characters={characters}
          setCharacters={setCharacters}
          defaultCharacters={DEFAULT.CHARACTERS}
        />
        <BackdropCmp
          texts={texts}
          selectedText={text}
          setText={setText}
          theme={theme}
          open={state === ST.STOP}
          start={() => setState(ST.RUNNING)}
          speed={speed}
          setSpeed={setSpeed}
        />
        {
          state === ST.READY &&
          <CountDown
            open={state === ST.READY}
            close={() => setState(ST.RUNNING)}
          />
        }
      </div>
    </>
  );

}

export default App;