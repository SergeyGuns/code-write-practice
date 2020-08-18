import React from "react";
const ChoseLesson = (Lessons) => {
  return Lessons.map(({ name }, index) => {
    <div key={index}>{name}</div>;
  });
};
export default ChoseLesson;
