import { forwardRef } from "react";
import { StartGameButtonProps } from "../utils/types";

const StartGameButton = forwardRef<HTMLButtonElement, StartGameButtonProps>(
  ({ setGameStarted }, ref) => {
    return (
      <button
        ref={ref}
        onClick={() => setGameStarted(true)}
        className="my-4 btn btn-primary mx-auto md:col-start-2"
      >
        Start Game
      </button>
    );
  }
);

export default StartGameButton;
