import React from "react";
import useStore from "../store/useStore";

export const RoundOver: React.FC<{
  onNextRound: () => void;
  nextRoundButtonRef: React.RefObject<HTMLButtonElement>;
}> = ({ onNextRound, nextRoundButtonRef }) => {
  const { score, resetRound, gameOver } = useStore();

  return (
    <div className="card bg-base-300 text-base-content my-4 py-4 w-full max-w-xs mx-auto md:col-start-2">
      <div className="m-4">Round Score: {score}</div>
      {!gameOver && (
        <button
          ref={nextRoundButtonRef}
          className="btn btn-primary m-4 mx-auto"
          onClick={() => {
            resetRound();
            onNextRound();
          }}
        >
          Next Round
        </button>
      )}
    </div>
  );
};
