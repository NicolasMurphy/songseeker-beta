import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/scores/">Scores</NavLink>
          </li>
          <li>
            <NavLink to="/about/">About</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end"></div>
    </div>
  )
}

export default Nav;
