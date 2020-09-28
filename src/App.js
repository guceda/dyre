import React, { useEffect, useState } from "react";
import "./App.css";

import TextContainer from "./components/TextContainer";
import Menu from "./components/Menu";
import BackdropCmp from "./components/Backdrop";
import Progress from "./components/Progress";

import { makeStyles } from "@material-ui/core/styles";

import { WPMtoMSC, MSCtoWPM } from "./utils/utils";
import CountDown from "./components/CountDown";

import interval from 'accurate-interval';

let t0;
let t1;

const useStyles = makeStyles(() => ({
  body: {
    backgroundColor: ({ background }) => background,
    height: "100vh",
    overflow: "hidden",
  },
  progress: {
    zIndex: "100",
  },
  speed: {
    color: "rgba(112,112,112,0.8)",
    position: "absolute",
    width: "100%",
    textAlign: "right",
    padding: "20px",
  },
}));

function App({ DEFAULT, ST, texts, themes }) {
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
    const msc = WPMtoMSC(text.words, text.allCharacters, speed);

    if (counter < text.content.length) {
      timer = interval(() => setCounter(counter + 1), msc, {aligned: true, immediate: true});
    } else {
      t1 = Date.now();
      window.logger.log("READING END");
      window.logger.log(
        "EXPECTED IN " + (text.words / speed).toFixed(3) + " min"
      );
      window.logger.log("DONE IN " + ((t1 - t0) / 60000).toFixed(3) + " min");
      window.logger.log(
        "WPM CALCULATED " + MSCtoWPM(text.words, text.allCharacters, msc)
      );
      window.logger.log("WPM BY TIME " + (text.words * 60000) / (t1 - t0));
      setState(ST.STOP);
      setCounter(0);
    }
    return () => timer && timer.clear();
  }, [counter, speed, text, state, ST.STOP, ST.RUNNING]);

  //ON SPACEBAR CLICK;
  useEffect(() => {
    document.body.onkeyup = function (e) {
      if (e.keyCode === 32) {
        if (state === ST.RUNNING) {
          window.logger.log("PAUSE");
          setState(ST.PAUSE);
          //go a bit back to ease recovery
          setCounter(counter > 42 ? counter - 40 : counter); //FIXME: make it better
        } else if (state === ST.PAUSE) {
          window.logger.log("COUNTDOWN");
          setState(ST.READY);
        } else if (state === ST.STOP) {
          window.logger.log("COUNTDOWN");
          setState(ST.READY);
        }
      }
    };
  }, [state, counter, ST.PAUSE, ST.READY, ST.RUNNING, ST.STOP]);

  const handleStop = () => {
    window.logger.log("STOP");
    setCounter(0);
    setState(ST.STOP);
  };

  const handleBodyClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const changeTheme = () => {
    window.logger.log("THEME CHANGE");
    setTheme(themes[theme.id === "light" ? "dark" : "light"]);
  };

  return (
    <>
      <div className={classes.body} onClick={handleBodyClick}>
        <Progress
          thickness={14}
          variant="determinate"
          value={(counter * 100) / text.content.length}
          className={classes.progress}
        />
        <div className={classes.speed}>{speed} WPS</div>
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
          setSpeed={(speed) => {
            setSpeed(speed);
            window.logger.log(`SET SPEED: ${speed}`);
          }}
          defaultSpeed={DEFAULT.SPEED}
          characters={characters}
          setCharacters={(characters) => {
            setCharacters(characters);
            window.logger.log(`SET CHARACTERS: ${characters}`);
          }}
          defaultCharacters={DEFAULT.CHARACTERS}
        />
        <BackdropCmp
          texts={texts}
          selectedText={text}
          setText={(text) => {
            setText(text);
            window.logger.log(`SET TEXT: ${text.title}`);
          }}
          theme={theme}
          open={state === ST.STOP}
          start={() => setState(ST.RUNNING)}
          speed={speed}
          setSpeed={(speed) => {
            setSpeed(speed);
            window.logger.log(`SET SPEED: ${speed}`);
          }}
        />
        {state === ST.READY && (
          <CountDown
            open={state === ST.READY}
            close={() => {
              window.logger.log("READING START");
              t0 = Date.now();
              setState(ST.RUNNING);
            }}
          />
        )}
      </div>
    </>
  );
}

export default App;
