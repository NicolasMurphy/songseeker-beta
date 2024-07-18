import React from "react";
import { StartGameButtonProps } from "../utils/types";

const StartGameButton: React.FC<StartGameButtonProps> = ({
  setGameStarted,
}) => {
  return (
    <button
      onClick={() => setGameStarted(true)}
      className="my-4 btn btn-primary"
    >
      Start Game
    </button>
  );
};

export default StartGameButton;
