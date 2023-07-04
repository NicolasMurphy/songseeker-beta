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
import getFlagUrl from "../utils/getFlagUrl";

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
  const [distanceMessage, setDistanceMessage] = useState([]);
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
      {!isGameStarted ? (
        <button
          className="px-4 py-2 bg-primary hover:bg-primary-focus text-white rounded transition-colors"
          onClick={handleStartNewGame}
        >
          Start Game
        </button>
      ) : (
        <div>
          <div className="mb-6">
            <p>Round {isGameEnded ? 6 : trackCount + 1}/6</p>
            <Map
              handleCountrySelection={handleCountrySelection}
              selectedCountry={selectedCountry}
              correctLocation={correctLocation}
              shouldReset={shouldResetMap}
            />

            <p>Selected Country: {selectedCountry}</p>

            {isCorrectGuess ? (
              <>
                {isSubmitted && (
                  <>
                    {
                      <img
                        className="mx-auto my-4"
                        width="96px"
                        src={getFlagUrl(track.location)}
                        alt={`${track.location} flag`}
                      />
                    }
                    <p>
                      The correct country is{" "}
                      <span className="font-bold">{track.location}</span>!{" "}
                      That is <span className="font-bold">6000 points</span>!!!
                    </p>
                  </>
                )}
              </>
            ) : (
              <>
                {isSubmitted && (
                  <>
                    {
                      <img
                        className="mx-auto my-4"
                        width="96px"
                        src={getFlagUrl(track.location)}
                        alt={`${track.location} flag`}
                      />
                    }
                    <p>
                      The correct country is{" "}
                      <span className="font-bold">{track.location}</span>
                    </p>
                    <p>
                      You were{" "}
                      <span className="font-bold">
                        {distanceMessage[0]} miles
                      </span>{" "}
                      away. That is{" "}
                      <span className="font-bold">
                        {distanceMessage[1]} points
                      </span>
                      .
                    </p>
                  </>
                )}
              </>
            )}
          </div>
          {!isGameEnded && isSubmitted && (
            <TrackLoader
              isLoading={isLoading}
              handleGetRandomTrack={handleGetRandomTrack}
            />
          )}
          {isGameEnded && (
            <div>
              <p className="text-3xl">Your final score is: <span className="font-bold">{score}</span></p>
              <button
                className="px-4 py-2 mt-4 bg-primary hover:bg-primary-focus text-white rounded transition-colors"
                onClick={handleStartNewGame}
              >
                Play Again?
              </button>
            </div>
          )}
          <AudioPlayer ref={audioRef} track={track} />
          {isSubmitted || isGameEnded ? (
            <TrackDetails track={track} />
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
