import Nav from "./Components/Nav";
import CoreLogic from "./CoreLogic/CoreLogic";
import NotFound from "./NotFound";
import Footer from "./Components/Footer";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { database, firestore } from "./firebaseConfig";
import NewVersion from "./NewVersion/NewVersion";

const App = () => {
  return (
    <BrowserRouter>
      <Nav database={database} />
      <Routes>
        <Route path="/" element={<CoreLogic database={database} />} />
        {/* <Route path="/" element={<NewVersion />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer firestore={firestore} />
    </BrowserRouter>
  );
};

export default App;
