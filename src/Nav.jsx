import React from "react";
import SpotifySearch from "./SpotifySearch/SpotifySearch";
import HighScoreList from "./HighScoreList";
import About from "./About";
import {
  NavLink,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

const Nav = () => (
  <Router>
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
    <Routes>
      <Route path="/" element={<SpotifySearch database={database} />} />
      <Route path="scores/" element={<HighScoreList database={database} />} />
      <Route path="about/" element={<About />} />
    </Routes>
  </Router>
);

export default Nav;
