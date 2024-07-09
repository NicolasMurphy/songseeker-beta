import Nav from './Components/Nav';
import CoreLogic from './CoreLogic/CoreLogic';
import NotFound from './NotFound';
import Footer from './Components/Footer';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { database, firestore } from './firebaseConfig';
import NewVersion from './NewVersion/Components/NewVersion';
import { GoogleMapsProvider } from './NewVersion/context/GoogleMapsContext';

const App = () => {
  return (
    <BrowserRouter>
      <Nav database={database} />
      <Routes>
        <Route path="/" element={<CoreLogic database={database} />} />
        <Route
          path="/new"
          element={
            <GoogleMapsProvider>
              <NewVersion />
            </GoogleMapsProvider>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer firestore={firestore} />
    </BrowserRouter>
  );
};

export default App;
