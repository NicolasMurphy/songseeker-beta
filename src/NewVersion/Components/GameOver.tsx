import React from "react";
import useStore from "../store/useStore";

export const GameOver: React.FC<{
  onNewGame: () => void;
  playAgainButtonRef: React.RefObject<HTMLButtonElement>;
}> = ({ onNewGame, playAgainButtonRef }) => {
  const { gameScore, resetGame } = useStore();

  return (
    <>
      <button
        ref={playAgainButtonRef}
        className="btn btn-primary m-4"
        onClick={() => {
          resetGame();
          onNewGame();
        }}
      >
        Play Again
      </button>
      {/* Give final score message here */}
      <div className="m-4">Final Score: {gameScore}</div>
    </>
  );
};
