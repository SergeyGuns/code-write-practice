import React, { useState } from "react";
import { Link } from "react-router-dom";
import cx from "classnames";
import "./Menu.scss";
const Menu = ({ lessons }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <div className="Menu">
      <div
        hidden={!menuIsOpen}
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        className="Menu__wrapper"
      >
        <div className="Menu__list-wrapper">
          <div onClick={(e) => e.stopPropagation()} className="Menu__list">
            {lessons.map((lesson, index) => (
              <div key={index} className="Menu__item">
                <Link to={`/${index}`}>{lesson.name}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className={cx("Menu__toggle-btn", {
          "Menu__toggle-btn_close": menuIsOpen,
        })}
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      >
        <div className="Menu__toggle-btn-shape Menu__toggle-btn-shape_1"></div>
        <div className="Menu__toggle-btn-shape Menu__toggle-btn-shape_2"></div>
        <div className="Menu__toggle-btn-shape Menu__toggle-btn-shape_3"></div>
      </div>
    </div>
  );
};

export default Menu;
