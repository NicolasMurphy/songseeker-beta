import useStore from "../store/useStore";

const GameInfo: React.FC = () => {
  const { round, score, guesses } = useStore();
  return (
    <div className="grid grid-cols-3">
      <div>Round: {round}/3</div>
      <div>Score: {score}</div>
      <div>Guesses: {guesses}/5</div>
    </div>
  );
};

export default GameInfo;
