import React, { useEffect, useState } from 'react';
import './App.css';

import texts from './texts';

import TextContainer from './components/TextContainer';
import FooterMenu from './components/FooterMenu';
import themes from './themes';

import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core/styles";

import LinearProgress from '@material-ui/core/LinearProgress';
import Backdrop from '@material-ui/core/Backdrop';



const useStyles = makeStyles(() => ({
  body: {
    backgroundColor: ({background}) => background,
  },

  '::selection': {
    color: 'black',
    background: 'white',
  }

}));



// const useStyles = makeStyles((theme) => ({
//   backdrop: {
//     zIndex: theme.zIndex.drawer + 1,
//     color: "#fff"
//   }
// }));


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


  const setTState = (stt) => {
    console.log(stt);
    if (state === stt) return;
    if (stt === ST.STOP) setCounter(0);
    setState(stt);
  }

  const progressPct = () => {
    return (counter * 100) / text.content.length;
  }

  return (
      <div className={classes.body}>
        <LinearProgress thickness={14} variant="determinate" value={progressPct()} />
        <TextContainer
          theme={theme}
          state={state}
          text={text}
          caretPos={counter}
          characters={characters}
        />
        <FooterMenu
          speed={speed}
          state={state}
          onPlay={() => setTState(ST.RUNNING)}
          onPause={() => setTState(ST.PAUSE)}
          onStop={() => setTState(ST.STOP)}
          onSpeedChange={setSpeed}
          onCharactersChange={setCharacters}
        />
        {/* <Backdrop className={classes.backdrop} open={true} onClick={()=>{}}>
        <CircularProgress color="inherit" />
      </Backdrop> */}

      </div>
  );

}

export default App;