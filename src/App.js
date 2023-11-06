import React, { useState } from "react";
import Nav from "./Nav";
import SpotifySearch from "./SpotifySearch/SpotifySearch";
import HighScoreList from "./HighScoreList";
import About from "./About";
import NotFound from "./NotFound";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

const App = () => {
  const [isGameStartedNav, setIsGameStartedNav] = useState(false);
  return (
    <BrowserRouter>
      {!isGameStartedNav && <Nav />}
      <Routes>
        <Route path="/" element={<SpotifySearch database={database} isGameStartedNav={isGameStartedNav} setIsGameStartedNav={setIsGameStartedNav} />} />
        <Route path="scores/" element={<HighScoreList database={database} />} />
        <Route path="about/" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
