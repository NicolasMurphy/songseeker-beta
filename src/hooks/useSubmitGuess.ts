import { handleGeocoding } from "../utils/helpers";
import { haversineDistance } from "../utils/utils";
import useStore from "../store";

interface Track {
  location: string;
}

interface MarkerLocation {
  lat: number;
  lng: number;
}

type Coordinates = [number, number];

const useSubmitGuess = (
  setShowTrackInfo: (show: boolean) => void,
  track: Track,
  selectedCountry: string,
  setCorrectLocation: (location: MarkerLocation) => void,
  markerLocation: MarkerLocation,
  setDistanceMessage: (message: [string, string]) => void
) => {

  const { setIsCorrectGuess, setIsSubmitted, score, setScore } = useStore();

  const calculateScore = (distance: number): number => {
    return Math.max(6000 - distance, 0);
  };

  const handleSubmit = async () => {
    if (selectedCountry) {
      const isGuessCorrect =
        selectedCountry.toLowerCase() === track.location.toLowerCase();
      setIsCorrectGuess(isGuessCorrect);
      setIsSubmitted(true);
      setShowTrackInfo(true);

      if (!isGuessCorrect) {
        try {
          // Call the geocoding function and assert the return type as Coordinates
          const trackLocationCoords = await handleGeocoding(track.location) as Coordinates;

          // Set the correct location with the obtained coordinates
          setCorrectLocation({
            lat: trackLocationCoords[0],
            lng: trackLocationCoords[1],
          });

          // Create a tuple for marker location coordinates
          const markerLocationCoords: Coordinates = [markerLocation.lat, markerLocation.lng];

          // Calculate the distance between the track location and the marker location
          const distanceStr = haversineDistance(
            trackLocationCoords,
            markerLocationCoords
          );

          // Convert the returned distance string to a number
          const distance = parseFloat(distanceStr);

          if (!isNaN(distance)) {
            const roundScore = calculateScore(distance);
            setScore(score + roundScore); // Update the score
            setDistanceMessage([distanceStr, roundScore.toString()]); // Set the distance message as strings
          } else {
            console.error("Distance is not a valid number:", distanceStr);
          }
        } catch (error) {
          console.error("Error in geocoding:", error);
        }
      } else {
        setScore(score + 6000);
      }
    }
  };

  return handleSubmit;
};

export default useSubmitGuess;
