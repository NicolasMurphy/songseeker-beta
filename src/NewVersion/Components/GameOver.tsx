import React, { useRef } from "react";
import useGameStore from "../store/useGameStore";

export const GameOver: React.FC<{ onPlayAgain: () => void }> = ({
  onPlayAgain,
}) => {
  const { result, correctAnswer, score, resetGame } = useGameStore();
  const playAgainButtonRef = useRef<HTMLButtonElement>(null);

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
