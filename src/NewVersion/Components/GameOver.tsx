import React from "react";
import useStore from "../store/useStore";

export const GameOver: React.FC<{
  onNewGame: () => void;
  playAgainButtonRef: React.RefObject<HTMLButtonElement>;
}> = ({ onNewGame, playAgainButtonRef }) => {
  const { gameScore, resetGame } = useStore();

  const getFinalScoreMessage = (score: number): string => {
    if (score > 12500) {
      return "Ethnomusicology Wizard!!!";
    } else if (score > 10000) {
      return "Mr. Worldwide!!";
    } else if (score > 7500) {
      return "Musicophile!";
    } else if (score > 5000) {
      return "Tune Explorer";
    } else {
      return "Rhythm Rookie";
    }
  };

  return (
    <div className="card bg-base-300 text-base-content my-4 max-w-xs mx-auto">
      <div className="m-4">Final Score: {gameScore}</div>
      <div className="text-secondary text-4xl font-bold m-4">
        {getFinalScoreMessage(gameScore)}
      </div>
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
    </div>
  );
};
