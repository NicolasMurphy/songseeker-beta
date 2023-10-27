const StartGameButton = ({ handleStartFirstGame }) => (
  <button
    className="px-4 py-2 bg-primary hover:bg-primary-focus text-white rounded transition-colors"
    onClick={handleStartFirstGame}
  >
    Start Game
  </button>
);

export default StartGameButton;
