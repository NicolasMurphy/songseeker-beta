import { loadGoogleMapsScript } from "./loadGoogleMapsScript";

export const handleGeocoding = async (address: string) => {
  await loadGoogleMapsScript();

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

type Coordinates = [number, number];
