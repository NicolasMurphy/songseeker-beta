import React, { useEffect, useState, useRef } from "react";
import { refreshAccessToken, getRandomTrack, getLocationOptions } from "./api";

const SpotifySearch = () => {
  const [track, setTrack] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [showTrackInfo, setShowTrackInfo] = useState(false);
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  const audioRef = useRef(null);

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
      const token = localStorage.getItem("accessToken");
      await getRandomTrack(
        token,
        track,
        setTrack,
        setIsLoading,
        resetAudio,
        setLocation,
        setShowTrackInfo
      );
    } catch (error) {
      console.error("Error retrieving random track:", error);
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

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleEnterChoice = () => {
    const selectedLocation = locationOptions.find(
      (option) => document.getElementById(option).checked
    );

    if (!selectedLocation) {
      alert("Please select a location before clicking Enter Choice.");
      return;
    }

    setLocation(selectedLocation);

    if (selectedLocation === track.location) {
      setIsCorrectGuess(true);
    } else {
      setIsCorrectGuess(false);
    }
    setShowTrackInfo(true);
  };

  const locationOptions = getLocationOptions();

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
            <>
              <div>
                <p>Choose a Country:</p>
                {locationOptions.map((option) => (
                  <div key={option}>
                    <input
                      type="radio"
                      id={option}
                      name="location"
                      value={option}
                      onChange={handleLocationChange}
                    />
                    <label htmlFor={option}>{option}</label>
                  </div>
                ))}
              </div>
              <button className="btn btn-secondary mt-4" onClick={handleEnterChoice}>
                Enter Choice
              </button>
            </>
          )}
          {showTrackInfo && (
            <>
              <div className="custom-player">
                <img src={track.album.images[0].url} alt="Album Art" />
              </div>
              <p>Track: {track.name}</p>
              <p>Artist: {track.artists[0].name}</p>
              <p>Album: {track.album.name}</p>
              <p>Location: {track.location}</p>
              {isCorrectGuess ? (
                <p className="text-success">You guessed correctly!</p>
              ) : (
                <p className="text-danger">You guessed wrong.</p>
              )}
              <button className="btn btn-primary" onClick={handleGetRandomTrack}>
                Play Again
              </button>
            </>
          )}
        </div>
      )}

      {!isLoading && !track && <div>No track available</div>}
    </div>
  );
};

export default SpotifySearch;
