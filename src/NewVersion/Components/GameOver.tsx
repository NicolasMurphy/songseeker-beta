import React from "react";
import useStore from "../store/useStore";

export const GameOver: React.FC<{
  onPlayAgain: () => void;
  playAgainButtonRef: React.RefObject<HTMLButtonElement>;
}> = ({ onPlayAgain, playAgainButtonRef }) => {
  const { result, correctAnswer, score, resetGame } = useStore();

  return (
    <>
      <div>
        {result} The answer was {correctAnswer}.
      </div>
      <div>Score: {score}</div>
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
    </>
  );
};
