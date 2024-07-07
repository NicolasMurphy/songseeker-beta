import React from "react";
import useStore from "../store/useStore";

export const GameOver: React.FC<{
  onPlayAgain: () => void;
  playAgainButtonRef: React.RefObject<HTMLButtonElement>;
}> = ({ onPlayAgain, playAgainButtonRef }) => {
  const { score, resetGame } = useStore();

  return (
    <>
      <button
        ref={playAgainButtonRef}
        className="btn btn-primary m-4"
        onClick={() => {
          resetGame();
          onPlayAgain();
        }}
      >
        Play Again
      </button>
      <div className="m-4">Score: {score}</div>
    </>
  );
};
