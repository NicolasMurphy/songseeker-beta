import React from 'react';
import TrackInfo from './TrackInfo';

const TrackDetails = ({ isCorrectGuess, track }) => (
  <div className="m-6 text-center">
    {isCorrectGuess ? (
      <p className="text-success">Your guess is correct!</p>
    ) : (
      <p className="text-error">
        You guessed wrong. The correct country is
        <span className="text-gray-300"> {track.location}</span>
      </p>
    )}
    <TrackInfo track={track} />
  </div>
);

export default TrackDetails;
