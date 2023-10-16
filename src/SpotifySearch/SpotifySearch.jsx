import React, { useEffect, useRef, useState } from "react";
import refreshAccessToken from "../api/refreshAccessToken";
import AudioPlayer from "./AudioPlayer";
import Map from "../Map/Map";
import TrackLoader from "./TrackLoader";
import LocationGuess from "./LocationGuess";
import TrackInfo from "./TrackInfo";
import useGetRandomTrack from "../hooks/useGetRandomTrack";
import useSubmitGuess from "../hooks/useSubmitGuess";
import getFlagUrl from "../utils/getFlagUrl";
import { ref, push } from "firebase/database";

const SpotifySearch = ({ database }) => {
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
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isFinalRound, setIsFinalRound] = useState(false);
  const [submittingScore, setSubmittingScore] = useState(false);
  const [username, setUsername] = useState("");

  // Fetch access token and get a random track when component mounts
  useEffect(() => {
    const fetchData = async () => {
      await refreshAccessToken(setTrack);
      handleGetRandomTrack();
    };

    fetchData();
  }, []);

  // Reset map when the user submits a guess
  useEffect(() => {
    if (shouldResetMap) {
      setSelectedCountry("");
      setShouldResetMap(false);
    }
  }, [shouldResetMap]);

  // Handle game progress, checking if the game has ended or if it's the final round
  useEffect(() => {
    if (trackCount === 6) {
      setIsFinalRound(true);
    } else if (trackCount > 6) {
      setIsGameEnded(true);
    }
  }, [trackCount]);

  // Reset audio player
  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.reset();
    }
  };

  // Start a new game
  const handleStartNewGame = () => {
    // Reset game states
    setScore(0);
    setTrackCount(1);
    setPlayedTracks(new Set());
    setIsGameEnded(false);
    setIsGameStarted(true);
    setIsFinalRound(false);
    handleGetRandomTrack();
  };

  // Increment track count and fetch a new random track
  const handleGetRandomTrackClick = () => {
    setTrackCount((prevCount) => prevCount + 1);
    handleGetRandomTrack();
  };

  // Custom hook to get a random track
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
    setPlayedTracks,
    setTrackCount
  );

  // Custom hook to handle guess submission
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
    isFinalRound,
    setIsGameEnded
  );

  // Handle user's country selection on the map
  const handleCountrySelection = (country, location) => {
    setLocation(country);
    setSelectedCountry(country);
    setMarkerLocation(location);
  };

  // End the game
  const handleEndGame = () => {
    setIsGameEnded(true);
    setSubmittingScore(true);
  };

  // Submit score
  const submitScoreToFirebase = (username, score) => {
    const scoresRef = ref(database, "scores");
    push(scoresRef, {
      username: username,
      score: score,
    });
  };

  // Handle score submission to leaderboard
  const handleSubmitScoreToLeaderboard = () => {
    if (username.trim() === "") {
      alert("Please enter a username before submitting your score.");
      return; // Do not submit the score if the username is empty
    }

    submitScoreToFirebase(username, score);
    setSubmittingScore(false);
  };

  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-4xl font-bold mb-4">SongSeeker</h1>
      {!isGameStarted ? (
        <button
          className="px-4 py-2 bg-primary hover.bg-primary-focus text-white rounded transition-colors"
          onClick={handleStartNewGame}
        >
          Start Game
        </button>
      ) : (
        <div>
          <div className="mb-6">
            <div className="grid grid-cols-3">
              <p>Current score: {score}</p>
              <p>Round {isGameEnded ? 6 : trackCount}/6</p>
            </div>
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
                      <span className="font-bold">{track.location}</span>! That
                      is <span className="font-bold">6000 points</span>!!!
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
              handleGetRandomTrack={handleGetRandomTrackClick}
              handleEndGame={handleEndGame}
              isFinalRound={isFinalRound}
            />
          )}
          {isGameEnded && (
            <div>
              <p className="text-3xl">
                Your final score is: <span className="font-bold">{score}</span>
              </p>
              {submittingScore ? (
                <div>
                  <p>Submit your score to the leaderboard:</p>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <button
                    className="px-4 py-2 bg-info hover:bg-info-focus text-white rounded transition-colors"
                    onClick={handleSubmitScoreToLeaderboard}
                  >
                    Submit Score to Leaderboard
                  </button>
                  <button
                    className="px-4 py-2 mt-4 bg-primary hover:bg-primary-focus text-white rounded transition-colors"
                    onClick={handleStartNewGame}
                  >
                    Play Again
                  </button>
                </div>
              ) : (
                <button
                  className="px-4 py-2 mt-4 bg-primary hover:bg-primary-focus text-white rounded transition-colors"
                  onClick={handleStartNewGame}
                >
                  Play Again
                </button>
              )}
            </div>
          )}
          <AudioPlayer ref={audioRef} track={track} />
          {isSubmitted || isGameEnded ? (
            <TrackInfo track={track} />
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
