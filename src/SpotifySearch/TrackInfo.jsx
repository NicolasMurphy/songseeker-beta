import React from "react";
import SpotifyIcon from "./SpotifyIcon";
import getDescriptionOptions from "../utils/DescriptionOptions";

const TrackInfo = ({ track }) => {
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
        <div className="font-bold">
          {(track.name.length > 35) ? track.name.slice(0, 32) + "..." : track.name}
          <div className="dropdown dropdown-left lg:dropdown-right lg:dropdown-top">
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
              className="dropdown-content z-[1] rounded-3xl w-80 lg:w-[32rem] shadow bg-gray-800/95 text-neutral-content"
            >
              <div className="card-body">
                {/* This is where the description will go */}
                <p className="">
                  {track.description.description
                    .split("\n")
                    .map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br/>
                        <br/>
                      </React.Fragment>
                    ))}
                </p>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={track.description.link}
                  className="text-info underline hover:no-underline w-24 mx-auto"
                >
                  Read more
                </a>
              </div>
            </div>
          </div>
          <div>
            By <span className="font-bold">{track.artists[0].name}</span>
          </div>
        </div>
        <div className="spotify-link w-12 mx-auto">
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
