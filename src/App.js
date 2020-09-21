import React, { useEffect, useState } from 'react';
import './App.css';

import texts from './texts';

import TextContainer from './components/TextContainer';
import FooterMenu from './components/FooterMenu';

const st = {
  RUNNING: 'running',
  PAUSE: 'pause',
  STOP: 'stop'
}

function App() {
  const [counter, setCounter] = useState(0);
  const [state, setState] = useState(st.STOP);

  const [text, setText] = useState(texts.es[0]);
  const [speed, setSpeed] = useState(30);


  // HANDLE SELECTION MOVEMENT;
  useEffect(() => {
    console.log(counter);
    if (state !== st.RUNNING) return;

    let timer;

    if (counter < text.content.length) {
      timer = setInterval(() => setCounter(counter + 1), speed);
    } else {
      console.log('done');
      setState(st.STOP);
      setCounter(0);
    }
    return () => clearInterval(timer);
  }, [counter, speed, text, state]);


  const setTState = (stt) => {
    if(state === stt) return;
    if(stt === st.STOP) setCounter(0);
    setState(stt);
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
        onPlay={() => setTState(st.RUNNING)}
        onPause={() => setTState(st.PAUSE)}
        onStop={() => setTState(st.STOP)}
        onSpeedChange={setSpeed}
      />
    </div>
  );
}

export default App;
