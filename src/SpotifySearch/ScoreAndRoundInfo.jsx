const ScoreAndRoundInfo = ({ score, isGameEnded, trackCount }) => (
  <div className="grid grid-cols-3">
    <p>Current score: {score}</p>
    <p>Round {isGameEnded ? 6 : trackCount}/6</p>
  </div>
);

export default ScoreAndRoundInfo;
