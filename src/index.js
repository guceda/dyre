import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import CssBaseline from "@material-ui/core/CssBaseline";

import Logger from "./utils/Logger";
import texts from "./texts";
import themes from "./themes";

window.logger = new Logger();

const ST = { RUNNING: "running", PAUSE: "pause", STOP: "stop", READY: "ready" };



const DEFAULT = {
  SPEED: 250, //wpm
  TEXT: texts[3],
  CHARACTERS: 15,
  THEME: themes.dark,
  STATUS: ST.STOP,
};

//log default values:
window.logger.log(`DEFAULT SPEED:${DEFAULT.SPEED}`);
window.logger.log(`DEFAULT TEXT:${DEFAULT.TEXT.title}`);
window.logger.log(`DEFAULT CHARACTERS:${DEFAULT.CHARACTERS}`);
window.logger.log(`DEFAULT STATUS:${DEFAULT.STATUS}`);

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <App DEFAULT={DEFAULT} ST={ST} themes={themes} texts={texts}  />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
