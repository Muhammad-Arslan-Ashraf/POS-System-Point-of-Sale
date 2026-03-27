import React from "react";
import { PAGE_LABELS } from "../constants/constant";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNavInHeader } from "../redux/showNav";

const LeftSideBar = () => {
  const dispatch = useDispatch();
  return (
    <aside className="sidebar">
      {/* Label */}
      <div className="sidebar-label">
        <p className="sidebar-label-text">Navigation</p>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {PAGE_LABELS.map((item) => (
          <NavLink
            onClick={() => dispatch(addNavInHeader(item.name))}
            to={item.path}
            key={item.id}
            className={({ isActive }) =>
              isActive ? "sidebar-nav-item-active" : "sidebar-nav-item"
            }
          >
            <span className="sidebar-nav-icon">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default LeftSideBar;
