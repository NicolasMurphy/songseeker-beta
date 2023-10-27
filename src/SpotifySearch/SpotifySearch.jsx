import React, { useEffect, useRef, useState } from "react";
import refreshAccessToken from "../api/refreshAccessToken";
import AudioPlayer from "./AudioPlayer";
import Map from "../Map/Map";
import TrackLoader from "./TrackLoader";
import LocationGuess from "./LocationGuess";
import TrackInfo from "./TrackInfo";
import StartGameButton from "./StartGameButton";
import Feedback from "./Feedback";
import GameEnded from "./GameEnded";
import ScoreAndRoundInfo from "./ScoreAndRoundInfo";
import useGetRandomTrack from "../hooks/useGetRandomTrack";
import useSubmitGuess from "../hooks/useSubmitGuess";
import useGameProgress from "../hooks/useGameProgress";
import useScoreSubmission from "../hooks/useScoreSubmission";

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
  const [playedTracks, setPlayedTracks] = useState(new Set());
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [submittingScore, setSubmittingScore] = useState(false);
  const [username, setUsername] = useState("");
  const [isMarkerPlacementAllowed, setIsMarkerPlacementAllowed] =
    useState(true);
  const { isFinalRound, isGameEnded, setIsFinalRound, setIsGameEnded } =
    useGameProgress(trackCount);
  const { submitScoreToFirebase } = useScoreSubmission(database);

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

  // Reset audio player
  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.reset();
    }
  };

  const handleSubmitButtonClick = () => {
    // Disable marker placement on the map
    setIsMarkerPlacementAllowed(false);
  };

  // Start a new game
  const handleStartNewGame = () => {
    setIsMarkerPlacementAllowed(true);
    // Reset game states
    setScore(0);
    setTrackCount(1);
    setPlayedTracks(new Set());
    setIsGameEnded(false);
    setIsGameStarted(true);
    setIsFinalRound(false);
    handleGetRandomTrack();
  };

  // Start a new game
  const handleStartFirstGame = () => {
    setIsMarkerPlacementAllowed(true);
    // Reset game states
    setScore(0);
    setTrackCount(1);
    setPlayedTracks(new Set());
    setIsGameEnded(false);
    setIsGameStarted(true);
    setIsFinalRound(false);
  };

  // Increment track count and fetch a new random track
  const handleGetRandomTrackClick = () => {
    setIsMarkerPlacementAllowed(true);
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
    markerLocation,
    setDistanceMessage,
    setScore
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

  // Handle score submission to leaderboard
  const handleSubmitScoreToLeaderboard = () => {
    if (!username) {
      alert("Please enter a username before submitting your score.");
      return; // Do not submit the score if the username is empty
    }

    if (username.length > 30) {
      alert("Username should not exceed 30 characters.");
      return; // Do not submit the score if the username is too long
    }

    if (username.startsWith(" ") || username.endsWith(" ")) {
      alert("Username cannot start or end with whitespace.");
      return; // Do not submit the score if the username starts or ends with whitespace
    }

    submitScoreToFirebase(username, score);
    setSubmittingScore(false);
  };

  return (
    <div className="container mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">SongSeeker</h1>
      {!isGameStarted ? (
        <StartGameButton handleStartFirstGame={handleStartFirstGame} />
      ) : (
        <div>
          <div className="mb-6">
            <ScoreAndRoundInfo
              score={score}
              isGameEnded={isGameEnded}
              trackCount={trackCount}
            />
            <Map
              handleCountrySelection={handleCountrySelection}
              selectedCountry={selectedCountry}
              correctLocation={correctLocation}
              shouldReset={shouldResetMap}
              isMarkerPlacementAllowed={isMarkerPlacementAllowed}
            />

            <p>Selected Country: {selectedCountry}</p>

            <Feedback
              isCorrectGuess={isCorrectGuess}
              isSubmitted={isSubmitted}
              track={track}
              distanceMessage={distanceMessage}
            />
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
            <GameEnded
              score={score}
              submittingScore={submittingScore}
              username={username}
              setUsername={setUsername}
              handleSubmitScoreToLeaderboard={handleSubmitScoreToLeaderboard}
              handleStartNewGame={handleStartNewGame}
            />
          )}
          <AudioPlayer ref={audioRef} track={track} isLoading={isLoading} />
          {isSubmitted || isGameEnded ? (
            <TrackInfo track={track} />
          ) : (
            <LocationGuess
              selectedCountry={selectedCountry}
              handleSubmit={handleSubmit}
              onSubmitButtonClick={handleSubmitButtonClick}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SpotifySearch;
