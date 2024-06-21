import { useEffect } from "react";

export default function useResetMap(shouldResetMap: boolean, setSelectedCountry: (country: string) => void) {
  useEffect(() => {
    if (shouldResetMap) {
      setSelectedCountry("");
    }
  }, [shouldResetMap, setSelectedCountry]);
}
