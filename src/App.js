import Nav from "./Components/Nav";
import CoreLogic from "./CoreLogic/CoreLogic";
import NotFound from "./NotFound";
import Footer from "./Components/Footer";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { database, firestore } from "./firebaseConfig";
import NewVersion from "./NewVersion/Components/NewVersion";
import { GoogleMapsProvider } from "./NewVersion/context/GoogleMapsContext";
import LandingPage from "./LandingPage";

const LegacyLayout = ({ children }) => (
  <>
    <Nav database={database} />
    {children}
    <Footer firestore={firestore} />
  </>
);

const NewVersionLayout = ({ children }) => (
  <>
    {children}
    <Footer firestore={firestore} />
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/legacy"
          element={
            <LegacyLayout>
              <CoreLogic database={database} />
            </LegacyLayout>
          }
        />
        <Route
          path="/new"
          element={
            <NewVersionLayout>
              <GoogleMapsProvider>
                <NewVersion />
              </GoogleMapsProvider>
            </NewVersionLayout>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
