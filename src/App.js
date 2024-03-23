import Nav from "./Nav";
import SpotifySearch from "./SpotifySearch/SpotifySearch";
import NotFound from "./NotFound";
import Footer from "./Footer";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { database, firestore } from "./firebaseConfig";

const App = () => {
  return (
    <BrowserRouter>
      <Nav database={database}/>
      <Routes>
        <Route path="/" element={<SpotifySearch database={database} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer firestore={firestore}/>
    </BrowserRouter>
  );
};

export default App;
