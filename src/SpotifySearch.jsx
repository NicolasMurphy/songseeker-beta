import React, { useEffect, useState, useRef } from "react";
import { refreshAccessToken, getRandomTrack, getLocationOptions } from "./api";
import TrackInfo from "./TrackInfo";
import AudioPlayer from "./AudioPlayer";

const SpotifySearch = () => {
  const [track, setTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [showTrackInfo, setShowTrackInfo] = useState(false);
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      await refreshAccessToken(setTrack);
      handleGetRandomTrack();
    };

    fetchData();
  }, []);

  const handleGetRandomTrack = async () => {
    setShowTrackInfo(false);
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
      audioRef.current.reset();
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

      {isLoading && <><br></br><div className="loading loading-ring loading-lg my-8"></div></>}

      {!isLoading && track && (
        <>
          <AudioPlayer ref={audioRef} track={track} />

          {!showTrackInfo && (
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
              <button className="btn btn-secondary mt-4" onClick={handleEnterChoice}>
                Enter Choice
              </button>
            </div>
          )}

          {showTrackInfo && (
            <TrackInfo
              track={track}
              isCorrectGuess={isCorrectGuess}
              locationOptions={locationOptions}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SpotifySearch;
