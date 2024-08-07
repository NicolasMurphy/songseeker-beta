import { useGoogleMaps } from "../context/GoogleMapsContext";
import { Coordinates } from "../utils/types";

export const useHandleGeocoding = () => {
  const { isLoaded } = useGoogleMaps();

  const handleGeocoding = async (address: string): Promise<Coordinates> => {
    if (!isLoaded) throw new Error("Google Maps API is not loaded");

    const geocoder = new window.google.maps.Geocoder();
    return new Promise<Coordinates>((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const { location } = results[0].geometry;
          resolve([location.lat(), location.lng()]);
        } else {
          reject(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    });
  };

  return handleGeocoding;
};
