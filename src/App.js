import React, { useEffect, useState } from 'react';
import './App.css';

import texts from './texts';

import TextContainer from './components/TextContainer';

function App() {
  const [counter, setCounter] = useState(0);
  const [text, setText] = useState(texts.es[0]);

  useEffect(() => {
    console.log(text.content.length);
    console.log(counter)
    const timer = (counter < text.content.length) &&
      setInterval(() => setCounter(counter + 1), 40);

    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div>
      <TextContainer
        text={text}
        caretPos={counter}
        selection={30}
      />
    </div>
  );
}

export default App;
