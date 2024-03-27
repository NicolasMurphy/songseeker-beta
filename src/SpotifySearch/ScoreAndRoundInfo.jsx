import useStore from '../store';

const ScoreAndRoundInfo = ({ isGameEnded, trackCount, selectedCountry }) => {
  const { score } = useStore();

  return (
    <div className="grid grid-cols-3">
      <p>Current score: {score}</p>
      <p>Round {isGameEnded ? 6 : trackCount}/6</p>
      <p>Selected Country: {selectedCountry ? selectedCountry : "Awaiting selection..."}</p>
    </div>
  );
};

export default ScoreAndRoundInfo;
