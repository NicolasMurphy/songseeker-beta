import React from "react";

interface StartGameButtonProps {
  handleStartGame: () => void;
  isGameReady: boolean;
}

const StartGameButton: React.FC<StartGameButtonProps> = ({
  handleStartGame,
  isGameReady,
}) => (
  <>
    {!isGameReady ? (
      <div className="loading loading-bars loading-lg"></div>
    ) : (
      <button className="my-4 btn btn-primary" onClick={handleStartGame}>
        Start Game
      </button>
    )}
  </>
);

export default StartGameButton;
