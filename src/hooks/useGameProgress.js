import { useEffect, useState } from "react";

const useGameProgress = (trackCount) => {
  const [isFinalRound, setIsFinalRound] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);

  useEffect(() => {
    if (trackCount === 6) {
      setIsFinalRound(true);
    } else if (trackCount > 6) {
      setIsGameEnded(true);
    }
  }, [trackCount]);

  return { isFinalRound, isGameEnded, setIsFinalRound, setIsGameEnded };
};

export default useGameProgress;
