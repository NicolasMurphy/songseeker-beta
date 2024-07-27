import { useHandleGeocoding } from "./useHandleGeocoding";
import { calculateBearing } from "../utils/bearing";
import useStore from "../store/useStore";
import { Coordinates } from "../utils/types";

const useCalculateBearing = () => {
  const { correctAnswer, bearings, setBearings } = useStore();
  const handleGeocoding = useHandleGeocoding();

  const calculateBearingValue = async (selectedCountry: string) => {
    if (!selectedCountry || !correctAnswer) return;

    try {
      const correctCoords = (await handleGeocoding(
        correctAnswer
      )) as Coordinates;
      const guessCoords = (await handleGeocoding(
        selectedCountry
      )) as Coordinates;

      const bearingStr = calculateBearing(correctCoords, guessCoords);
      const bearing = parseFloat(bearingStr);

      if (!isNaN(bearing)) {
        setBearings([...bearings, bearing]);
      } else {
        console.error("Bearing is not a valid number:", bearing);
      }
    } catch (error) {
      console.error("Error in geocoding:", error);
    }
  };

  return calculateBearingValue;
};

export default useCalculateBearing;
