import React from "react";
import useStore from "../store/useStore";

export const RoundOver: React.FC<{
  onPlayAgain: () => void;
  playAgainButtonRef: React.RefObject<HTMLButtonElement>;
}> = ({ onPlayAgain, playAgainButtonRef }) => {
  const { score, resetRound } = useStore();

  return (
    <>
      <button
        ref={playAgainButtonRef}
        className="btn btn-primary m-4"
        onClick={() => {
          resetRound();
          onPlayAgain();
        }}
      >
        Play Again
      </button>
      <div className="m-4">Score: {score}</div>
    </>
  );
};
