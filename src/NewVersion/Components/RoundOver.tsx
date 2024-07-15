import React from "react";
import useStore from "../store/useStore";

export const RoundOver: React.FC<{
  onNextRound: () => void;
  nextRoundButtonRef: React.RefObject<HTMLButtonElement>;
}> = ({ onNextRound, nextRoundButtonRef }) => {
  const { score, resetRound } = useStore();

  return (
    <>
      <button
        ref={nextRoundButtonRef}
        className="btn btn-primary m-4"
        onClick={() => {
          resetRound();
          onNextRound();
        }}
      >
        Next Round
      </button>
      <div className="m-4">Round Score: {score}</div>
    </>
  );
};
