import { handleGeocoding } from "../utils/helpers";
import { haversineDistance } from "../utils/utils";
import useStore from '../store';

const useSubmitGuess = (
  setShowTrackInfo,
  track,
  selectedCountry,
  setCorrectLocation,
  markerLocation,
  setDistanceMessage,
  setScore
) => {
  const { setIsCorrectGuess } = useStore();
  const { setIsSubmitted } = useStore();

  const calculateScore = (distance) => {
    // Formula: score = 6000 - distance, but at least 0
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
          const trackLocationCoords = await handleGeocoding(track.location);
          setCorrectLocation({
            lat: trackLocationCoords[0],
            lng: trackLocationCoords[1],
          });
          const markerLocationCoords = Object.values(markerLocation);
          const distance = haversineDistance(
            trackLocationCoords,
            markerLocationCoords
          );
          if (distance) {
            const score = calculateScore(distance);
            setScore((prevScore) => prevScore + score);
            setDistanceMessage([distance, score]);
          }
        } catch (error) {
          console.error("Error in geocoding:", error);
        }
      } else {
        setScore((prevScore) => prevScore + 6000);
      }
    }
  };

  return handleSubmit;
};

export default useSubmitGuess;
