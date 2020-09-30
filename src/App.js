import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { APP_STATE } from "./constants";
import useGlobal from "./globalHook.js";
import lessons from "./lessons";
import LineInputRequest from "./LineInputRequest";
import Menu from "./Menu";

const setAppInitState = (setter) =>
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
    <Router>
      <div className="App">
        {lessons.map((lesson, index) => (
          <Route key={index} path={`/${index}`}>
            <LineInputRequest requireLine={lesson.value} />)
          </Route>
        ))}
        <Menu lessons={lessons} />
      </div>
    </Router>
  );
}

export default App;
