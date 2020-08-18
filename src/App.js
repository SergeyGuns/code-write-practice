import React, { useState, useEffect } from "react";
import LineInputRequest from "./LineInputRequest";
import "./App.css";
import useGlobal from "./globalHook.js";
import { APP_STATE } from "./constants";

const setAppInitState = (setter) => () =>
  setter({
    mode: APP_STATE.MODE.CHOSE_LESSON,
    currentLesson: null,
  });

function App() {
  const [globalState, globalActions] = useGlobal();

  useEffect(() => {
    setAppInitState(globalActions.setAppState);
  }, [setAppInitState]);

  return (
    <div className="App">
      <button
        onClick={() => globalActions.setAppMode(APP_STATE.MODE.CHOSE_LESSON)}
      >
        CHOSE_LESSON
      </button>
      <button
        onClick={() => globalActions.setAppMode(APP_STATE.MODE.WRITE_LESSON)}
      >
        WRITE_LESSON
      </button>
      <LineInputRequest />
    </div>
  );
}

export default App;
