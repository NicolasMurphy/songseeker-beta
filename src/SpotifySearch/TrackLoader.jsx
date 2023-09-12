import React from 'react';

const TrackLoader = ({ isLoading, handleGetRandomTrack, handleEndGame, isFinalRound }) => {
  const buttonClass = isFinalRound
    ? "px-4 py-2 bg-info hover:bg-info-focus text-white rounded transition-colors"
    : "px-4 py-2 bg-primary hover:bg-primary-focus text-white rounded transition-colors";

  return (
    <button
      className={buttonClass}
      onClick={isFinalRound ? handleEndGame : handleGetRandomTrack}
      disabled={isLoading}
    >
      {!isFinalRound
        ? isLoading
          ? 'Loading...'
          : 'Next Round'
        : 'See Score'}
    </button>
  );
};

export default TrackLoader;
