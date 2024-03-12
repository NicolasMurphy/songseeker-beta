import React from 'react';

interface StartGameButtonProps {
  handleStartFirstGame: () => void;
}

const StartGameButton: React.FC<StartGameButtonProps> = ({ handleStartFirstGame }) => (
  <button
    className="my-4 btn btn-primary"
    onClick={handleStartFirstGame}
  >
    Start Game
  </button>
);

export default StartGameButton;
