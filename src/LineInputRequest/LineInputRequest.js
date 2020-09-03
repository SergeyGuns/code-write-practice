import React, { useEffect } from "react";
import "./LineInputRequest.scss";
import cx from "classnames";
import { useGlobalKeyPress, useGlobalKeyDown } from "../globalHandlers";

const ADD_LETTER = "ADD_LETTER";
const ADD_NEW_LINE = "ADD_NEW_LINE";
const REMOVE_LAST_LETTER = "REMOVE_LAST_LETTER";

const popLine = (line) => (line.length ? line.substr(0, line.length - 1) : "");

function reducer(state, action) {
  console.log({ state, action });
  const actions = {
    ADD_LETTER: () => {
      state.typedLine += action.payload;
      return { ...state };
    },
    ADD_NEW_LINE: () => {
      state.typedLine += "\n";
      return { ...state };
    },
    REMOVE_LAST_LETTER: () => {
      state.typedLine = popLine(state.typedLine);
      return { ...state };
    },
  };

  if (actions[action.type]) {
    return actions[action.type]();
  }

  throw new Error();
}

export function Letter({ letter, isTyped, isMissLetter, isSpace, id }) {
  return (
    <span key={id} className={cx("Letter", { isMissLetter, isTyped, isSpace })}>
      {isSpace ? "•" : letter}
    </span>
  );
}

export function NewLineIndicator() {
  return <span className="NewLineIndicator">↵ Enter</span>;
}

export function isEqualLine(a, b) {
  if (typeof a === "string" && typeof b === "string") {
    return a === b;
  }
}

export function Line({ requireLine, typedLine }) {
  const line = requireLine.split("").map((letter, i) => ({
    letter,
    isSpace: letter === " ",
    isTyped: i < typedLine.length,
    isMissLetter: ((a, b) => b !== undefined && a !== b)(letter, typedLine[i]),
    typedLetter: typedLine[i],
  }));

  return (
    <pre className="LineInputRequest">
      {line.map(
        ({ letter, isTyped, isMissLetter, typedLetter, isSpace }, i) => (
          <Letter
            isSpace={isSpace}
            key={i + letter}
            letter={isMissLetter ? typedLetter : letter}
            isTyped={isTyped}
            isMissLetter={isMissLetter}
          />
        )
      )}
      {isEqualLine(requireLine, typedLine) && <NewLineIndicator />}
    </pre>
  );
}

function LineInputRequest({ requireLine }) {
  const [typedLine, setTypedLine] = React.useState("");
  const [state, dispatch] = React.useReducer(reducer, { typedLine: "" });
  const handleInputAddLetter = (ev) => {
    console.log(ev);
    const SPACE_KEY_CODE = 32;
    const ENTER_KEY_CODE = 13;

    if (ev.keyCode === SPACE_KEY_CODE) {
      ev.preventDefault();
    }

    if (ev.keyCode === ENTER_KEY_CODE) {
      // return setTypedLine(typedLine + "\n");
      return dispatch({ type: ADD_NEW_LINE });
    }

    return dispatch({ type: ADD_LETTER, payload: ev.key });
  };
  useEffect(() => {
    console.log({ typedLine });
  }, [typedLine]);

  const handleBackspacePress = (callback) => ({ keyCode }) => {
    const BACKSPACE_KEY_CODE = 8;
    if (keyCode === BACKSPACE_KEY_CODE) callback();
  };

  useGlobalKeyPress(handleInputAddLetter);
  useGlobalKeyDown(
    handleBackspacePress(() => dispatch({ type: REMOVE_LAST_LETTER }))
  );
  return (
    <div>
      <Line requireLine={requireLine} typedLine={state.typedLine} />
    </div>
  );
}

export default LineInputRequest;
