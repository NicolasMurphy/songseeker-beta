import React from 'react';

interface StartGameButtonProps {
  handleStartGame: () => void;
}

const StartGameButton: React.FC<StartGameButtonProps> = ({ handleStartGame }) => (
  <button
    className="my-4 btn btn-primary"
    onClick={handleStartGame}
  >
    Start Game
  </button>
);

export default StartGameButton;
