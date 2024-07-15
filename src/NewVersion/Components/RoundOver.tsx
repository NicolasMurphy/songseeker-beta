import React from "react";
import useStore from "../store/useStore";

export const RoundOver: React.FC<{
  onNextRound: () => void;
  nextRoundButtonRef: React.RefObject<HTMLButtonElement>;
}> = ({ onNextRound, nextRoundButtonRef }) => {
  const { score, resetRound, gameOver } = useStore();

  return (
    <div className="card bg-base-300 text-base-content my-4">
      <div className="card-body items-center">
      <div className="my-2">Round Score: {score}</div>
      <div className="card-actions">
      {!gameOver && (
        <button
          ref={nextRoundButtonRef}
          className="btn btn-primary"
          onClick={() => {
            resetRound();
            onNextRound();
          }}
        >
          Next Round
        </button>
      )}
      </div>
      </div>
    </div>
  );
};
