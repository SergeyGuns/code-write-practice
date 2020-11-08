import cx from "classnames";
import React, { useEffect } from "react";
import { useWindowEvent } from "../globalHandlers";
import useSetStateWithPromise from "../useSetStateWithPromise";
import keycode from "keycode";
import "./LineInputRequest.scss";

const SPACE_KEY_CODE = keycode("space");
const ENTER_KEY_CODE = keycode("enter");
const BACKSPACE_KEY_CODE = keycode("backspace");

const popLine = (line) => (line.length ? line.substr(0, line.length - 1) : "");

export function Letter({
  letter,
  isTyped,
  isMissLetter,
  isSpace,
  id,
  isLastTypedLetter,
}) {
  return (
    <span
      key={id}
      className={cx("Letter", {
        isMissLetter,
        isTyped,
        isSpace,
        isLastTypedLetter,
      })}
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
  const line = requireLine.split("").map((letter, i) => ({
    letter,
    isSpace: letter === " ",
    isTyped: i < typedLine.length,
    isMissLetter: ((a, b) => b !== undefined && a !== b)(letter, typedLine[i]),
    typedLetter: typedLine[i],
    isLastTypedLetter: i === typedLine.length,
  }));

  return (
    <pre className="LineInputRequest">
      {line.map(
        (
          {
            letter,
            isTyped,
            isMissLetter,
            typedLetter,
            isSpace,
            isLastTypedLetter,
          },
          i
        ) => (
          <Letter
            isSpace={isSpace}
            key={i + letter}
            letter={isMissLetter ? typedLetter : letter}
            isTyped={isTyped}
            isMissLetter={isMissLetter}
            isLastTypedLetter={isLastTypedLetter}
          />
        )
      )}
      {isEqualLine(requireLine, typedLine) && <NewLineIndicator />}
    </pre>
  );
}

let newLine = "";
function LineInputRequest({ requireLine }) {
  const [typedLine, setTypedLine] = useSetStateWithPromise("");
  console.log(typedLine, BACKSPACE_KEY_CODE);
  useEffect(() => {
    newLine = "";
  }, []);
  async function handleInputAddLetter(ev) {
    let currLine = newLine !== typedLine ? newLine : typedLine;
    if (ev.keyCode === SPACE_KEY_CODE) {
      ev.preventDefault();
    }

    if (ev.keyCode === ENTER_KEY_CODE) {
      newLine = currLine + "\n";
      return await setTypedLine(newLine);
    }
    if (ev.keyCode === BACKSPACE_KEY_CODE) {
      return await setTypedLine(popLine(newLine));
    }
    newLine = currLine + ev.key;
    return await setTypedLine(newLine);
  }
  async function handleBackSpace(ev) {
    let currLine = newLine !== typedLine ? newLine : typedLine;
    if (ev.keyCode === BACKSPACE_KEY_CODE) {
      ev.preventDefault();
      return await setTypedLine((newLine = popLine(currLine)));
    }
  }

  const throttledHandleBackSpace = throttle(handleBackSpace, 100);
  useWindowEvent("keydown", throttledHandleBackSpace);
  useWindowEvent("keypress", handleInputAddLetter);

  return (
    <div>
      <Line requireLine={requireLine} typedLine={typedLine} />
    </div>
  );
}

export default LineInputRequest;

function throttle(callback, wait, immediate = false) {
  let timeout = null;
  let initialCall = true;

  return function () {
    const callNow = immediate && initialCall;
    const next = () => {
      callback.apply(this, arguments);
      timeout = null;
    };

    if (callNow) {
      initialCall = false;
      next();
    }

    if (!timeout) {
      timeout = setTimeout(next, wait);
    }
  };
}
