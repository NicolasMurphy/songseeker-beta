import { GameOverProps } from "../utils/types";

export const GameOver: React.FC<GameOverProps> = ({
    result,
    correctAnswer,
    score,
    onPlayAgain,
    playAgainButtonRef,
  }) => (
    <>
      <div>
        {result} The answer was {correctAnswer}.
      </div>
      <div>Score: {score}</div>
      <button
        ref={playAgainButtonRef}
        className="btn btn-primary m-4"
        onClick={onPlayAgain}
      >
        Play Again
      </button>
    </>
  );
