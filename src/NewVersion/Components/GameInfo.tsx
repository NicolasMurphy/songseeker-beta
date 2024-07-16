import useStore from "../store/useStore";
import { ROUNDS } from "../utils/constants";

const GameInfo: React.FC = () => {
  const { round, gameScore, guesses } = useStore();
  return (
    <div className="grid grid-cols-3">
      <div>Round: {round}/{ROUNDS}</div>
      <div>Score: {gameScore}</div>
      <div>Guesses: {guesses}/5</div>
    </div>
  );
};

export default GameInfo;
