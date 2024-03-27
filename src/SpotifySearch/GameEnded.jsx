import useStore from "../store";

const GameEnded = ({
  submittingScore,
  username,
  setUsername,
  handleSubmitScoreToLeaderboard,
  handlePlayAgain,
}) => {
  const { score } = useStore();

  return (
  <div className="my-2">
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
          maxLength={30}
        />
        <br></br>
        <button
          className="my-2 btn btn-info"
          onClick={handleSubmitScoreToLeaderboard}
        >
          Submit Score to Leaderboard
        </button>
        <br></br>
        <button
          className="my-2 btn btn-primary"
          onClick={handlePlayAgain}
        >
          Play Again
        </button>
      </div>
    ) : (
      <button
        className="mt-4 btn btn-primary"
        onClick={handlePlayAgain}
      >
        Play Again
      </button>
    )}
  </div>
)};

export default GameEnded;
