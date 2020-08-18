import React, { useState } from "react";
import LineInputRequest from "./LineInputRequest";
import "./App.css";
import useGlobalHook from './globalHook.js' 
enum AppMode {
  choseLesson = 1,
  writeLesson = 2
}

export interface Lesson {
  name: string
  value: string
}

interface IAppState {
  mode: AppMode
  currentLesson: Lesson | null
}

const appInitState: IAppState = {
  mode: AppMode.choseLesson,
  currentLesson: null
};

function App() {
  const [state, setState] = useGlobalHook<S>(React, appInitState)
  return (
    <div className="App">
      <LineInputRequest />
    </div>
  );
}

export default App;
