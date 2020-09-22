import React, { useEffect, useState } from 'react';
import './App.css';

import texts from './texts';

import TextContainer from './components/TextContainer';
import Menu from './components/Menu';
import BackdropCmp from './components/Backdrop';
import themes from './themes';

import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core/styles";

import LinearProgress from '@material-ui/core/LinearProgress';

const ST = { RUNNING: 'running', PAUSE: 'pause', STOP: 'stop' };
const DEFAULT = { SPEED: 20, TEXT: texts.es[0], CHARACTERS: 15 };



const useStyles = makeStyles(() => ({
  body: {
    backgroundColor: ({ background }) => background,
    height: '100vh',
  },
  progress: {
    zIndex: '100'
  }
}));

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 7,
  },
  progress: {
    zIndex: '100'
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.id === 'light' ? 200 : 700],
  },
  bar: {
    backgroundColor: 'yellow',
  },
}))(LinearProgress);


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

    let timer;

    if (counter < text.content.length) {
      timer = setInterval(() => setCounter(counter + 1), speed);
    } else {
      setState(ST.STOP);
      setCounter(0);
    }
    return () => clearInterval(timer);
  }, [counter, speed, text, state]);

  //ON SPACEBAR CLICK;
  useEffect(() => {
    document.body.onkeyup = function (e) {
      if (e.keyCode === 32) {
        if (state === ST.RUNNING) {
          setState(ST.PAUSE);
          setCounter(counter- 40); // go a bit back to ease recovery
        } else if (state === ST.PAUSE) {
          setState(ST.RUNNING);
        } else if (state === ST.STOP) {
          setState(ST.RUNNING);
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

  const changeTheme = (theme) => {
    setTheme(themes[theme.id === 'light' ? 'dark' : 'light']);
  }

  return (
    <>
      <div className={classes.body} onClick={handleBodyClick}>
        <BorderLinearProgress
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
        <Menu
          open={state === ST.PAUSE}
          title={text.title}
          theme={theme}
          changeTheme={changeTheme}
          stop={handleStop}
        />
        <BackdropCmp
          open={state === ST.STOP}
          start={() => setState(ST.RUNNING)}
        />
      </div>
    </>
  );

}

export default App;