import useStore from "../store";

interface ScoreAndRoundInfoProps {
  isGameEnded: boolean;
  trackCount: number;
  selectedCountry: string;
}

const ScoreAndRoundInfo: React.FC<ScoreAndRoundInfoProps> = ({
  isGameEnded,
  trackCount,
  selectedCountry,
}) => {
  const { score } = useStore();

  return (
    <div className="grid grid-cols-3">
      <p>Current score: {score}</p>
      <p>Round {isGameEnded ? 6 : trackCount}/6</p>
      <p>
        Selected Country:{" "}
        {selectedCountry ? selectedCountry : "Awaiting selection..."}
      </p>
    </div>
  );
};

export default ScoreAndRoundInfo;
