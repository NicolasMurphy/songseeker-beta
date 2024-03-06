import React, { useEffect, useRef, useState } from "react";
import refreshAccessToken from "../api/refreshAccessToken";
import AudioPlayer from "./AudioPlayer";
import Map from "../Map/Map";
import TrackLoader from "./TrackLoader";
import LocationGuess from "./LocationGuess";
import TrackInfo from "./TrackInfo";
import StartGameButton from "./StartGameButton";
import GameEnded from "./GameEnded";
import ScoreAndRoundInfo from "./ScoreAndRoundInfo";
import useGetRandomTrack from "../hooks/useGetRandomTrack";
import useSubmitGuess from "../hooks/useSubmitGuess";
import useGameProgress from "../hooks/useGameProgress";
import useScoreSubmission from "../hooks/useScoreSubmission";
import getFlagUrl from "../utils/getFlagUrl";
import logo from "../Images/logo.svg";

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

    // if (username.length > 30) {
    //   alert("Username should not exceed 30 characters.");
    //   return; // Do not submit the score if the username is too long
    // }

    if (username.startsWith(" ") || username.endsWith(" ")) {
      alert("Username cannot start or end with whitespace.");
      return; // Do not submit the score if the username starts or ends with whitespace
    }

    submitScoreToFirebase(username, score);
    setSubmittingScore(false);
  };

  return (
    <div className="min-h-screen container mx-auto text-center">
      {!isGameStarted && (
        <>
          <img
            src={logo}
            alt="A logo of a location pin with music notes inside it"
            className="mx-auto w-32"
          />
          <h1 className="text-4xl font-bold mb-4">SongSeeker</h1>
        </>
      )}
      {!isGameStarted ? (
        <StartGameButton handleStartFirstGame={handleStartFirstGame} />
      ) : (
        <div>
          <div className="mb-6">
            <ScoreAndRoundInfo
              score={score}
              isGameEnded={isGameEnded}
              trackCount={trackCount}
              selectedCountry={selectedCountry}
            />
            <Map
              handleCountrySelection={handleCountrySelection}
              selectedCountry={selectedCountry}
              correctLocation={correctLocation}
              shouldReset={shouldResetMap}
              isMarkerPlacementAllowed={isMarkerPlacementAllowed}
            />

            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto_2fr_1fr]">
              {/* {column 1} */}
              <div className="order-3 md:order-1 mx-auto">
                {isSubmitted && (
                  <img
                    className="my-4"
                    width="96px"
                    src={getFlagUrl(track.location)}
                    alt={`${track.location} flag`}
                  />
                )}
              </div>
              {/* {column 2} */}
              <div className="order-2 md:order-2">
                <div className="my-2">
                  {isSubmitted && (
                    <div>
                      {isCorrectGuess ? (
                        <>
                          <p>
                            The correct country is{" "}
                            <span className="font-bold">{track.location}</span>!
                          </p>
                          <p>
                            That is{" "}
                            <span className="font-bold">6000 points</span>
                            !!!
                          </p>
                        </>
                      ) : (
                        <>
                          <p>
                            The correct country was{" "}
                            <span className="font-bold">{track.location}</span>.
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
                    </div>
                  )}
                </div>
              </div>
              {/* {column 3} */}
              <div className="order-5 md:order-3">
                {isGameEnded && (
                  <GameEnded
                    score={score}
                    submittingScore={submittingScore}
                    username={username}
                    setUsername={setUsername}
                    handleSubmitScoreToLeaderboard={
                      handleSubmitScoreToLeaderboard
                    }
                    handleStartNewGame={handleStartNewGame}
                  />
                )}
                <AudioPlayer
                  ref={audioRef}
                  track={track}
                  isLoading={isLoading}
                />
              </div>
              {/* {column 4} */}
              <div className="order-4 md:order-4 my-4">
                {isSubmitted || isGameEnded ? <TrackInfo track={track} /> : ""}
              </div>
              {/* {column 5} */}
              <div className="order-1 md:order-5">
                {isSubmitted || isGameEnded ? (
                  ""
                ) : (
                  <LocationGuess
                    selectedCountry={selectedCountry}
                    handleSubmit={handleSubmit}
                    onSubmitButtonClick={handleSubmitButtonClick}
                    isLoading={isLoading}
                  />
                )}
                {!isGameEnded && isSubmitted && (
                  <TrackLoader
                    isLoading={isLoading}
                    handleGetRandomTrack={handleGetRandomTrackClick}
                    handleEndGame={handleEndGame}
                    isFinalRound={isFinalRound}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotifySearch;
