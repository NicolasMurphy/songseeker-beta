import { createContext, useContext } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const libraries = ["geometry", "drawing", "places"];
const GoogleMapsContext = createContext({ isLoaded: false });

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

if (!googleMapsApiKey) {
  throw new Error(
    "VITE_GOOGLE_MAPS_API_KEY is not set in the environment variables"
  );
}

export const GoogleMapsProviderLegacy = ({ children }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
    libraries,
  });

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  return (
    <GoogleMapsContext.Provider value={{ isLoaded }}>
      {isLoaded && children}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMapsLegacy = () => {
  return useContext(GoogleMapsContext);
};
