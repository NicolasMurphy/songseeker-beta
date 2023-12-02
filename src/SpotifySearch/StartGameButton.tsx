import React from 'react';

interface StartGameButtonProps {
  handleStartFirstGame: () => void;
}

const StartGameButton: React.FC<StartGameButtonProps> = ({ handleStartFirstGame }) => (
  <button
    className="px-4 py-2 my-4 bg-primary hover:bg-primary-focus text-white rounded transition-colors"
    onClick={handleStartFirstGame}
  >
    Start Game
  </button>
);

export default StartGameButton;
