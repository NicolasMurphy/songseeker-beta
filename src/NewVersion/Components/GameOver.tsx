import React from "react";
import useGameStore from "../store/useGameStore";

export const GameOver: React.FC<{ onPlayAgain: () => void, playAgainButtonRef: React.RefObject<HTMLButtonElement> }> = ({
  onPlayAgain,
  playAgainButtonRef,
}) => {
  const { result, correctAnswer, score, resetGame } = useGameStore();

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
