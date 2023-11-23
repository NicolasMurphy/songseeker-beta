import React from "react";
import Nav from "./Nav";
import SpotifySearch from "./SpotifySearch/SpotifySearch";
import NotFound from "./NotFound";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

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
const firestore = getFirestore(firebaseApp);

const App = () => {
  return (
    <BrowserRouter>
      <Nav database={database} firestore={firestore}/>
      <Routes>
        <Route path="/" element={<SpotifySearch database={database} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
