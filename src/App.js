import React from "react";
import Nav from "./Nav";
import SpotifySearch from "./SpotifySearch/SpotifySearch";
import NotFound from "./NotFound";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { database, firestore } from "./firebaseConfig";


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
