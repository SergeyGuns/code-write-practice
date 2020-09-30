import React from "react";
import "./LineInputRequest.scss";
import cx from "classnames";
import {
  useGlobalKeyPress,
  useGlobalKeyDown,
} from "./LineInputRequestHandlers";

export function Letter({ letter, isTyped, isMissLetter, isSpace, key }) {
  return (
    <span
      key={key}
      className={cx("Letter", { isMissLetter, isTyped, isSpace })}
    >
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
  console.log({ requireLine, typedLine });
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

function LineInputRequest(props) {
  const [requireLine, setRequireLine] = React.useState("abc dfe");
  const [typedLine, setTypedLine] = React.useState("");

  React.useEffect(() => {
    const listener = (e) => console.log({ e });
    const addListeners = () => {
      window.addEventListener("keypress", listener);
    };
    const removeListeners = () => {
      window.removeEventListener(listener);
    };
    addListeners();
    return removeListeners;
  }, []);

  const handleInputAddLetter = ({ key }) => {
    setTypedLine(typedLine + key);
  };
  const popLine = (line) =>
    line.length ? line.substr(0, line.length - 1) : "";

  const handleBackspacePress = (callback) => ({ keyCode }) => {
    const BACKSPACE_KEY_CODE = 8;
    if (keyCode === BACKSPACE_KEY_CODE) callback();
  };
  const handleEnterPress = (callback) => ({ keyCode }) => {
    const ENTER_KEY_CODE = 13;
    if (keyCode === ENTER_KEY_CODE) callback();
  };
  useGlobalKeyPress(handleInputAddLetter);
  useGlobalKeyDown(
    handleBackspacePress(() => setTypedLine(popLine(typedLine)))
  );
  return (
    <div>
      <Line requireLine={requireLine} typedLine={typedLine} />
    </div>
  );
}

export default LineInputRequest;