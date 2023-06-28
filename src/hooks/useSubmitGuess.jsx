import { handleGeocoding } from '../utils/helpers';
import { haversineDistance } from '../utils/utils';


const useSubmitGuess = (setIsCorrectGuess, setIsSubmitted, setShowTrackInfo, track, selectedCountry, setCorrectLocation, setShouldResetMap, markerLocation, setDistanceMessage) => {
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
            setDistanceMessage(`You were ${distance} miles away.`);
          }
        } catch (error) {
          console.error('Error in geocoding:', error);
        }
      } else {
        setCorrectLocation(null);
        setShouldResetMap(true);
      }
    }
  };

  return handleSubmit;
};

export default useSubmitGuess;
