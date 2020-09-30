import React from "react";
import "./LineInputRequest.scss";
import cx from "classnames";

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
  const handleInputAddLetter = (setter) => (ev) => {
    console.log(ev);
    const SPACE_KEY_CODE = 32;
    const ENTER_KEY_CODE = 13;
    let newLine = typedLine;
    if (ev.keyCode === SPACE_KEY_CODE) {
      ev.preventDefault();
    }

    if (ev.keyCode === ENTER_KEY_CODE) {
      newLine = typedLine + "\n";
      return setter(newLine);
    }
    newLine = typedLine + ev.key;
    return setter(newLine);
  };
  React.useEffect(() => {
    const listener = handleInputAddLetter(setTypedLine);
    console.log("listener added");
    const addListeners = () => {
      window.addEventListener("keypress", listener);
    };
    const removeListeners = () => {
      console.log("listener removed");
      window.removeEventListener("keypress", listener);
    };
    addListeners();
    return removeListeners;
  }, []);

  return (
    <div>
      <Line requireLine={requireLine} typedLine={setTypedLine} />
    </div>
  );
}

export default LineInputRequest;
