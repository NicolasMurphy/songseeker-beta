import React, { useEffect, useRef, useState } from "react";
import refreshAccessToken from "../api/refreshAccessToken";
import AudioPlayer from "./AudioPlayer";
import Map from "../Map/Map";
import { haversineDistance } from "../utils/utils";
import TrackLoader from "./TrackLoader";
import LocationGuess from "./LocationGuess";
import TrackDetails from "./TrackDetails";
import useGetRandomTrack from "../hooks/useGetRandomTrack";
import useSubmitGuess from "../hooks/useSubmitGuess";
import getFlagUrl from '../utils/getFlagUrl';

const SpotifySearch = () => {
  const [track, setTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [showTrackInfo, setShowTrackInfo] = useState(false);
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  const audioRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shouldResetMap, setShouldResetMap] = useState(false);
  const [markerLocation, setMarkerLocation] = useState([0, 0]);
  const [distanceMessage, setDistanceMessage] = useState("");
  const [correctLocation, setCorrectLocation] = useState(null);
  const [score, setScore] = useState(0);
  const [trackCount, setTrackCount] = useState(0);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [playedTracks, setPlayedTracks] = useState(new Set());
  const [isGameStarted, setIsGameStarted] = useState(false); // New state for game start

  useEffect(() => {
    const fetchData = async () => {
      await refreshAccessToken(setTrack);
      handleGetRandomTrack();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (shouldResetMap) {
      setSelectedCountry("");
      setShouldResetMap(false);
    }
  }, [shouldResetMap]);

  useEffect(() => {
    if (trackCount === 6) {
      setIsGameEnded(true);
    }
  }, [trackCount]);

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.reset();
    }
  };

  const handleStartNewGame = () => {
    setScore(0);
    setTrackCount(0);
    setPlayedTracks(new Set());
    setIsGameEnded(false);
    setIsGameStarted(true); // Set game started when "Play Again" is clicked
    handleGetRandomTrack();
  };

  const handleGetRandomTrack = useGetRandomTrack(
    setShowTrackInfo,
    setIsLoading,
    setIsSubmitted,
    setDistanceMessage,
    resetAudio,
    setLocation,
    setTrack,
    track,
    setCorrectLocation,
    setShouldResetMap,
    playedTracks,
    setPlayedTracks
  );

  const handleSubmit = useSubmitGuess(
    setIsCorrectGuess,
    setIsSubmitted,
    setShowTrackInfo,
    track,
    selectedCountry,
    setCorrectLocation,
    setShouldResetMap,
    markerLocation,
    setDistanceMessage,
    setScore,
    setTrackCount
  );

  const handleCountrySelection = (country, location) => {
    setLocation(country);
    setSelectedCountry(country);
    setMarkerLocation(location);
  };

  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-4xl font-bold mb-4">SongSeeker</h1>
      {!isGameStarted ? ( // Display start button if game not started
        <button onClick={handleStartNewGame}>Start Game</button>
      ) : isGameEnded ? (
        <div>
          <p>Your final score is: {score}</p>
          <button onClick={handleStartNewGame}>Play Again?</button>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <Map
              handleCountrySelection={handleCountrySelection}
              selectedCountry={selectedCountry}
              correctLocation={correctLocation}
              shouldReset={shouldResetMap}
            />
            <p>Selected Country: {selectedCountry}</p>
            <p>Round {trackCount + 1}/6</p> {/* Add Round indicator */}
            <p>{distanceMessage}</p>
          </div>
          {isSubmitted && (
            <TrackLoader
              isLoading={isLoading}
              handleGetRandomTrack={handleGetRandomTrack}
            />
          )}
          <AudioPlayer ref={audioRef} track={track} />
          {isSubmitted ? (
            <TrackDetails
              isCorrectGuess={isCorrectGuess}
              track={track}
              getFlagUrl={getFlagUrl}
              trackLocation={track.location}
            />
          ) : (
            <LocationGuess
              selectedCountry={selectedCountry}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SpotifySearch;
