import React from "react";
import "./LineInputRequest.scss";
import cx from "classnames";
import { useGlobalKeyPress, useGlobalKeyDown } from "../globalHandlers";

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
  const handleInputAddLetter = (ev) => {
    const SPACE_KEY_CODE = 32;
    const ENTER_KEY_CODE = 13;

    if (ev.keyCode === SPACE_KEY_CODE) {
      ev.preventDefault();
    }

    if (ev.keyCode === ENTER_KEY_CODE) {
      return setTypedLine(typedLine + "\n");
    }

    setTypedLine(typedLine + ev.key);
  };

  const popLine = (line) =>
    line.length ? line.substr(0, line.length - 1) : "";

  const handleBackspacePress = (callback) => ({ keyCode }) => {
    const BACKSPACE_KEY_CODE = 8;
    if (keyCode === BACKSPACE_KEY_CODE) callback();
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
