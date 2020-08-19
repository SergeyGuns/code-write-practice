import React, { useEffect } from "react";
import LineInputRequest from "./LineInputRequest";
import ChoseLesson from "./ChoseLesson";
import lessons from "./lessons";
import "./App.css";
import useGlobal from "./globalHook.js";
import { APP_STATE } from "./constants";

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
    <div>
      {globalState.app ? (
        <div className="App">
          <button
            disabled={globalState.app.mode === APP_STATE.MODE.CHOSE_LESSON}
            onClick={() =>
              globalActions.setAppMode(APP_STATE.MODE.CHOSE_LESSON)
            }
          >
            CHOSE_LESSON
          </button>
          <button
            disabled={globalState.app.mode === APP_STATE.MODE.WRITE_LESSON}
            onClick={() =>
              globalActions.setAppMode(APP_STATE.MODE.WRITE_LESSON)
            }
          >
            WRITE_LESSON
          </button>
          {globalState.app.currentLesson === null ? (
            <ChoseLesson lessons={lessons} />
          ) : (
            <LineInputRequest
              requireLine={globalState.app.currentLesson.value}
            />
          )}
        </div>
      ) : null}
    </div>
  );
}

export default App;
