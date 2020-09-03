import React from "react";
import useGlobal from "../globalHook";
import { APP_STATE } from "../constants";

const Lesson = ({ handleChoseLesson, index, name }) => (
  <div onClick={() => handleChoseLesson(index)} key={index}>
    {name}
  </div>
);

const ChoseLesson = ({ lessons }) => {
  const [, globalActions] = useGlobal();

  const handleChoseLesson = (index) => {
    globalActions.setAppMode(APP_STATE.MODE.WRITE_LESSON);
    globalActions.setAppCurrentLesson(lessons[index]);
  };

  return lessons.map(({ name }, index) => (
    <Lesson key={index} {...{ name, index, handleChoseLesson }} />
  ));
};

export default ChoseLesson;
