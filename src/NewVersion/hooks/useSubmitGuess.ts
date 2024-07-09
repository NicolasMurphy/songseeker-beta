import { useHandleGeocoding } from './useHandleGeocoding';
import { haversineDistance } from '../utils/haversineDistance';
import useStore from '../store/useStore';

type Coordinates = [number, number]; // rename/move

const useSubmitGuess = () => {
  const { correctAnswer, distances, setDistances } = useStore();
  const handleGeocoding = useHandleGeocoding();

  const handleSubmit = async (selectedCountry: string) => {
    if (!selectedCountry || !correctAnswer) return;

    try {
      const correctCoords = (await handleGeocoding(correctAnswer)) as Coordinates;
      const guessCoords = (await handleGeocoding(selectedCountry)) as Coordinates;

      const distanceStr = haversineDistance(correctCoords, guessCoords);
      const distance = parseFloat(distanceStr);

      if (!isNaN(distance)) {
        setDistances([...distances, distance]);
      } else {
        console.error('Distance is not a valid number:', distanceStr);
      }
    } catch (error) {
      console.error('Error in geocoding:', error);
    }
  };

  return handleSubmit;
};

export default useSubmitGuess;
