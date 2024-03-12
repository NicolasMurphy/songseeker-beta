import React, { useEffect, useRef } from "react";

const TrackLoader = ({
  isLoading,
  handleGetRandomTrack,
  handleEndGame,
  isFinalRound,
}) => {
  const buttonClass = isFinalRound
    ? "px-4 py-2 bg-info hover:bg-[#2c93bf] text-white rounded transition-colors"
    : "px-4 py-2 bg-primary hover:bg-primary-focus text-white rounded transition-colors";

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
      onClick={isFinalRound ? handleEndGame : handleGetRandomTrack}
      disabled={isLoading}
      title="Keyboard shortcut: Enter"
    >
      {!isFinalRound ? (isLoading ? "Loading..." : "Next Round") : "See Score"}
    </button>
  );
};

export default TrackLoader;
