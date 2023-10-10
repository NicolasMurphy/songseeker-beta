import React from 'react';
import SpotifySearch from './SpotifySearch/SpotifySearch';
import HighScoreList from "./HighScoreList";
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

const App = () => {
  return (
    <div>
      <SpotifySearch database={database} />
      <HighScoreList database={database} />
    </div>
  );
};

export default App;
