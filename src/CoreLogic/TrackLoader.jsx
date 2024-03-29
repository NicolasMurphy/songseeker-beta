import { useEffect, useRef } from "react";

const TrackLoader = ({
  handleNextRound,
  handleEndGame,
  isFinalRound,
}) => {
  const buttonClass = isFinalRound
    ? "px-4 py-2 btn btn-info"
    : "px-4 py-2 btn btn-primary";

  // click enter instead of clicking button
  const buttonRef = useRef();
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && buttonRef.current) {
        buttonRef.current.click();
      }
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className={`${buttonClass} my-4`}
      onClick={isFinalRound ? handleEndGame : handleNextRound}
      title="Keyboard shortcut: Enter"
    >
      {!isFinalRound ? "Next Round" : "See Score"}
    </button>
  );
};

export default TrackLoader;
