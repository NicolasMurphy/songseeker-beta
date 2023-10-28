const ScoreAndRoundInfo = ({ score, isGameEnded, trackCount, selectedCountry }) => (
  <div className="grid grid-cols-3">
    <p>Current score: {score}</p>
    <p>Round {isGameEnded ? 6 : trackCount}/6</p>
    <p>Selected Country: {selectedCountry}</p>
  </div>
);

export default ScoreAndRoundInfo;
