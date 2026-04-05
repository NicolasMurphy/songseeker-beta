import Nav from "./FooterAndNavComponents/Nav";
import CoreLogic from "./CoreLogic/CoreLogic";
import NotFound from "./NotFound";
import Footer from "./FooterAndNavComponents/Footer";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { database, firestore } from "./firebaseConfig";
import { GoogleMapsProviderLegacy } from "./Map/useGoogleMapsLegacy";

const LegacyLayout = ({ children }) => (
  <>
    <Nav database={database} />
    {children}
    <Footer firestore={firestore} />
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <GoogleMapsProviderLegacy>
              <LegacyLayout>
                <CoreLogic database={database} />
              </LegacyLayout>
            </GoogleMapsProviderLegacy>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
