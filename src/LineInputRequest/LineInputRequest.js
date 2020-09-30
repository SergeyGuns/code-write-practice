import cx from "classnames";
import React, { useEffect, useRef } from "react";
import "./LineInputRequest.scss";

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

  function handleInputAddLetter(ev) {
    console.log(ev);
    console.log({ typedLine, setTypedLine });
    const SPACE_KEY_CODE = 32;
    const ENTER_KEY_CODE = 13;
    let newLine = typedLine;
    if (ev.keyCode === SPACE_KEY_CODE) {
      ev.preventDefault();
    }
    if (ev.keyCode === ENTER_KEY_CODE) {
      newLine = typedLine + "\n";
      return setTypedLine(newLine);
    }
    newLine = typedLine + ev.key;
    return setTypedLine(newLine);
  }

  useEventListener("keypress", handleInputAddLetter);

  return (
    <div>
      <Line requireLine={requireLine} typedLine={setTypedLine} />
    </div>
  );
}

// Hook
function useEventListener(eventName, handler, element = window) {
  // Create a ref that stores handler
  const savedHandler = useRef();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event);

      // Add event listener
      element.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}

export default LineInputRequest;
