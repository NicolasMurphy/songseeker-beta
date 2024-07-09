import React, { createContext, useContext, ReactNode } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

interface GoogleMapsProviderProps { // move
  children: ReactNode;
}

type Library = 'geometry' | 'drawing' | 'places' | 'visualization';

const libraries: Library[] = ['geometry', 'drawing', 'places'];
const GoogleMapsContext = createContext({ isLoaded: false });

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

if (!googleMapsApiKey) {
  throw new Error('REACT_APP_GOOGLE_MAPS_API_KEY is not set in the environment variables');
}

export const GoogleMapsProvider: React.FC<GoogleMapsProviderProps> = ({ children }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
    libraries,
  });

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  return (
    <GoogleMapsContext.Provider value={{ isLoaded }}>
      {!isLoaded ? <div>Loading...</div> : children}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => {
  return useContext(GoogleMapsContext);
};