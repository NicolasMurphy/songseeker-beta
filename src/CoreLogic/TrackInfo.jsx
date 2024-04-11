import React, { useState, useEffect } from "react";

const TrackInfo = ({ track }) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const infoSeen = localStorage.getItem("infoSeen");
    if (!infoSeen) {
      setShowNotification(true);
    }
  }, []);

  const handleInfoClick = () => {
    setShowInfoModal(true);
    setShowNotification(false);
    localStorage.setItem("infoSeen", "true");
  };

  if (!track) {
    return null;
  }

  return (
    <div className="text-center my-4 relative">
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

      <div className="absolute right-1/2 transform -translate-y-full mt-4">
        {showNotification && (
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-info">
              Check out the info button for more details!
            </div>
          </div>
        )}
      </div>

      <button
        className="btn btn-circle btn-ghost btn-xs text-info relative z-10"
        onClick={handleInfoClick}
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

      {showInfoModal && (
        <dialog open className="modal" id="information">
          <div className="modal-box">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setShowInfoModal(false)}
            >
              ✕
            </button>
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
              className="text-info underline hover:no-underline"
            >
              Read more
            </a>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default TrackInfo;
