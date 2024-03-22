import React from "react";

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
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center my-4">
      <div className="w-36 mx-auto">
        <a
          href={track.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="transition duration-300 ease-in-out hover:scale-105"
            src={track.album.images[0].url}
            alt="Album Art"
          />
        </a>
      </div>

      <button
        className="btn btn-circle btn-ghost btn-xs text-info"
        onClick={() => document.getElementById("information").showModal()}
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
      </button>
      <dialog id="information" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-lg font-bold">
            {track.name} - {track.artists[0].name}
          </h3>
          <p className="py-4">
            {track.description.description.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
                <br />
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
      </dialog>
    </div>
  );
};

export default TrackInfo;
