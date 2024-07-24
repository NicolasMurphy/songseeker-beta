import Nav from "./FooterAndNavComponents/Nav";
import CoreLogic from "./CoreLogic/CoreLogic";
import NotFound from "./NotFound";
import Footer from "./FooterAndNavComponents/Footer";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { database, firestore } from "./firebaseConfig";
import NewVersion from "./NewVersion/Components/NewVersion";
import { GoogleMapsProvider } from "./NewVersion/context/GoogleMapsContext";
import { GoogleMapsProviderLegacy } from "./Map/useGoogleMapsLegacy";
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
            <GoogleMapsProviderLegacy>
              <LegacyLayout>
                <CoreLogic database={database} />
              </LegacyLayout>
            </GoogleMapsProviderLegacy>
          }
        />
        <Route
          path="/new"
          element={
            <GoogleMapsProvider>
              <NewVersionLayout>
                <NewVersion />
              </NewVersionLayout>
            </GoogleMapsProvider>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
