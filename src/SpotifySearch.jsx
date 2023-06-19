import React, { useEffect, useState, useRef } from "react";
import SpotifyIcon from "./SpotifyIcon";
import { refreshAccessToken, getRandomTrack } from "./api";

const SpotifySearch = () => {
  const [track, setTrack] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState("");
  const audioRef = useRef(null);
  const [showTrackInfo, setShowTrackInfo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await refreshAccessToken(setAccessToken); // Refresh the access token
      handleGetRandomTrack();
    };

    fetchData();
  }, []);


  const handleGetRandomTrack = async () => {
    setShowTrackInfo(false); // Hide the track info
    setIsLoading(true);

    try {
      const token = localStorage.getItem('accessToken');
      await getRandomTrack(token, setTrack, setIsLoading, resetAudio, setLocation);
    } catch (error) {
      console.error('Error retrieving random track:', error);
      setIsLoading(false);
    }
  };


  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
  };

  const handleShowTrackInfo = () => {
    setShowTrackInfo(true); // Show the track info
  };

  return (
    <div className="text-center my-12">
      <h1 className="my-12">Spotify Random Track</h1>
      <button className="btn btn-primary" onClick={handleGetRandomTrack}>
        Get Random Track
      </button>

      {isLoading && <div>Loading...</div>}

      {!isLoading && track && (
        <div>
          <div className="custom-player">
            <audio ref={audioRef} controls>
              <source src={track.preview_url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
          {!showTrackInfo && (
            <button className="btn btn-secondary mt-4" onClick={handleShowTrackInfo}>
              Show Track Info
            </button>
          )}
          {showTrackInfo && (
            <>
              <div className="custom-player">
                <img src={track.album.images[0].url} alt="Album Art" />
                <h2>{track.name}</h2>
                <p>By {track.artists[0].name}</p>
                <p>Location: {location}</p>
              </div>
              <div className="spotify-link">
                <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                  <SpotifyIcon />
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SpotifySearch;
