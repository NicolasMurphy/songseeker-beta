import { useEffect } from "react";

export default function useResetMap(shouldResetMap, setSelectedCountry) {
  useEffect(() => {
    if (shouldResetMap) {
      setSelectedCountry("");
    }
  }, [shouldResetMap]);
}
