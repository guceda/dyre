import React, { useEffect, useState } from 'react';
import './App.css';

import texts from './texts';

import TextContainer from './components/TextContainer';
import FooterMenu from './components/FooterMenu';

import LinearProgress from '@material-ui/core/LinearProgress';



const ST = { RUNNING: 'running', PAUSE: 'pause', STOP: 'stop' };
const DEFAULT = { SPEED: 40, TEXT: texts.es[0] };

function App() {
  const [counter, setCounter] = useState(0);
  const [state, setState] = useState(ST.STOP);

  const [text, setText] = useState(DEFAULT.TEXT);
  const [speed, setSpeed] = useState(DEFAULT.SPEED);


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
    return (counter*100)/text.content.length;
  }

  return (
    <div>
      <TextContainer
        state={state}
        text={text}
        caretPos={counter}
        selection={30}
      />
      <FooterMenu
        speed={speed}
        state={state}
        onPlay={() => setTState(ST.RUNNING)}
        onPause={() => setTState(ST.PAUSE)}
        onStop={() => setTState(ST.STOP)}
        onSpeedChange={setSpeed}
      />
      <LinearProgress variant="determinate" value={progressPct()} />
    </div>
  );
}

export default App;
