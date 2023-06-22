import React from 'react';
import SpotifyIcon from './SpotifyIcon';

const TrackInfo = ({ track, isCorrectGuess }) => {
  if (!track) {
    return null;
  }

  if (!track.location) {
    return (
      <div>
        <p>Location information is not available for this track.</p>
        <div className="spotify-link">
          <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
            <SpotifyIcon />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="custom-player">
        <img src={track.album.images[0].url} alt="Album Art" />
      </div>
      <p className="font-bold">{track.name}</p>
      <p>By <span className="font-bold">{track.artists[0].name}</span></p>
      <div className="spotify-link">
        <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
          <SpotifyIcon />
        </a>
      </div>
    </div>
  );
};

export default TrackInfo;
