import { handleGeocoding } from '../utils/helpers';
import { haversineDistance } from '../utils/utils';

const useSubmitGuess = (setIsCorrectGuess, setIsSubmitted, setShowTrackInfo, track, selectedCountry, setCorrectLocation, setShouldResetMap, markerLocation, setDistanceMessage, setScore, setTrackCount) => {
  const calculateScore = (distance) => {
    // Formula: score = 6000 - distance, but at least 0
    return Math.max(6000 - distance, 0);
  };

  const handleSubmit = async () => {
    if (selectedCountry) {
      const isGuessCorrect = selectedCountry.toLowerCase() === track.location.toLowerCase();
      setIsCorrectGuess(isGuessCorrect);
      setIsSubmitted(true);
      setShowTrackInfo(true);

      if (!isGuessCorrect) {
        try {
          const trackLocationCoords = await handleGeocoding(track.location);
          setCorrectLocation({ lat: trackLocationCoords[0], lng: trackLocationCoords[1] });
          const markerLocationCoords = Object.values(markerLocation);
          const distance = haversineDistance(trackLocationCoords, markerLocationCoords);
          if (distance) {
            const score = calculateScore(distance);
            setScore(prevScore => prevScore + score);
            setDistanceMessage(`You were ${distance} miles away. You earned ${score} points.`);
          }
        } catch (error) {
          console.error('Error in geocoding:', error);
        }
      } else {
        setCorrectLocation(null);
        setShouldResetMap(true);
        setScore(prevScore => prevScore + 6000);
      }
      setTrackCount(prevCount => prevCount + 1);
    }
  };

  return handleSubmit;
};

export default useSubmitGuess;
