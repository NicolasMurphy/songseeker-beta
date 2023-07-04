import React from "react";
import SpotifyIcon from "./SpotifyIcon";

const TrackInfo = ({ track, isCorrectGuess }) => {
  if (!track) {
    return null;
  }

  if (!track.location) {
    return (
      <div>
        <p>Location information is not available for this track.</p>
        <div className="spotify-link">
          <a
            href={track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SpotifyIcon />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="m-6 text-center">
    <div className="text-center">
      <div className="custom-player">
        <img src={track.album.images[0].url} alt="Album Art" />
      </div>

      <p className="font-bold">
        {track.name}
        <div className="dropdown dropdown-right dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-circle btn-ghost btn-xs text-info"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-4 h-4 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </label>
          <div
            tabIndex={0}
            className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-primary text-primary-content"
          >
            <div className="card-body">
              <h2 className="card-title">Title</h2>
              <p>Track info to be added here!</p>
            </div>
          </div>
        </div>
        <p></p>
        By <span className="font-bold">{track.artists[0].name}</span>
      </p>
      <div className="spotify-link">
        <a
          href={track.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SpotifyIcon />
        </a>
      </div>
    </div>
    </div>
  );
};

export default TrackInfo;
