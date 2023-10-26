const GameEnded = ({
  score,
  submittingScore,
  username,
  setUsername,
  handleSubmitScoreToLeaderboard,
  handleStartNewGame,
}) => (
  <div>
    <p className="text-3xl">
      Your final score is: <span className="font-bold">{score}</span>
    </p>
    {submittingScore ? (
      <div>
        <p className="pt-6">Submit your score to the leaderboard:</p>
        <input
          className="my-2 input input-bordered input-info w-full max-w-xs"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br></br>
        <button
          className="px-4 py-2 my-2 bg-info hover:bg-[#2c93bf] text-white rounded transition-colors"
          onClick={handleSubmitScoreToLeaderboard}
        >
          Submit Score to Leaderboard
        </button>
        <br></br>
        <button
          className="px-4 py-2 my-2 bg-primary hover:bg-primary-focus text-white rounded transition-colors"
          onClick={handleStartNewGame}
        >
          Play Again
        </button>
      </div>
    ) : (
      <button
        className="px-4 py-2 my-2 mt-4 bg-primary hover:bg-primary-focus text-white rounded transition-colors"
        onClick={handleStartNewGame}
      >
        Play Again
      </button>
    )}
  </div>
);

export default GameEnded;
