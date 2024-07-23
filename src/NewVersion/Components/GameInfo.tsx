import useStore from "../store/useStore";
import { INITIAL_GUESSES, ROUNDS } from "../utils/constants";

const GameInfo: React.FC = () => {
  const { round, gameScore, guesses } = useStore();
  return (
    <div className="grid grid-cols-3">
      <div>
        Round: {round}/{ROUNDS}
      </div>
      <div>Score: {gameScore}</div>
      <div>
        Guesses: {guesses}/{INITIAL_GUESSES}
      </div>
    </div>
  );
};

export default GameInfo;
