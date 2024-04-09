import { useEffect, useRef, useState } from "react";
import refreshAccessToken from "../api/refreshAccessToken";
import AudioPlayer from "./AudioPlayer";
import Map from "../Map/Map";
import TrackLoader from "./TrackLoader";
import LocationGuess from "./LocationGuess";
import TrackInfo from "./TrackInfo";
import StartGameButton from "./StartGameButton";
import GameEnded from "./GameEnded";
import ScoreAndRoundInfo from "./ScoreAndRoundInfo";
import getRandomTracks from "../api/getRandomTracks";
import useSubmitGuess from "../hooks/useSubmitGuess";
import useGameProgress from "../hooks/useGameProgress";
import useScoreSubmission from "../hooks/useScoreSubmission";
import getFlagUrl from "../utils/getFlagUrl";
import logo from "../Images/logo.svg";
import { handleGeocoding } from "../utils/helpers";
import useStore from "../store";
import getDescriptionOptions from "../utils/DescriptionOptions";

const CoreLogic = ({ database }) => {
  const { isCorrectGuess, isSubmitted, setIsSubmitted, setScore } = useStore();

  const [track, setTrack] = useState(null);
  const [location, setLocation] = useState("");
  const [showTrackInfo, setShowTrackInfo] = useState(false);
  const audioRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [shouldResetMap, setShouldResetMap] = useState(false);
  const [markerLocation, setMarkerLocation] = useState(null);
  const [distanceMessage, setDistanceMessage] = useState([]);
  const [correctLocation, setCorrectLocation] = useState(null);
  const [trackCount, setTrackCount] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [submittingScore, setSubmittingScore] = useState(false);
  const [username, setUsername] = useState("");
  const [isMarkerPlacementAllowed, setIsMarkerPlacementAllowed] =
    useState(true);
  const { isFinalRound, isGameEnded, setIsFinalRound, setIsGameEnded } =
    useGameProgress(trackCount);
  const { submitScoreToFirebase } = useScoreSubmission(database);
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
  const [isGameReady, setIsGameReady] = useState(false);
  const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);
  const [fiftyFiftyModalVisible, setFiftyFiftyModalVisible] = useState(false);
  const [fiftyFiftyOptions, setFiftyFiftyOptions] = useState([]);
  const [isFiftyFifty, setIsFiftyFifty] = useState(false);

  const handleFiftyFifty = () => {
    if (!usedFiftyFifty && tracks.length > 0 && currentTrackIndex >= 0) {
      const correctTrack = tracks[currentTrackIndex];
      let allTracks = getDescriptionOptions();
      let wrongOptions = allTracks.filter(
        (t) => t.country !== correctTrack.description.country
      );
      let wrongOption =
        wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
      setFiftyFiftyOptions(
        [correctTrack.description.country, wrongOption.country].sort(
          () => Math.random() - 0.5
        )
      );
      setFiftyFiftyModalVisible(true);
      setUsedFiftyFifty(true);
    }
  };

  const selectOption = (option) => {
    setSelectedCountry(option);
    setIsFiftyFifty(true);
    setFiftyFiftyModalVisible(false);
    setUsedFiftyFifty(true);

    handleGeocoding(option)
      .then((locationLatLng) => {
        const location = {
          lat: locationLatLng[0],
          lng: locationLatLng[1],
        };
        setMarkerLocation(location);
      })
      .catch((error) => {
        console.error("Geocoding failed: ", error);
        setMarkerLocation(null);
      });
  };

  useEffect(() => {
    const fetchAccessTokenAndTracks = async () => {
      const token = await refreshAccessToken();
      if (token) {
        const fetchedTracks = await getRandomTracks(token);
        setTracks(fetchedTracks);
        setIsGameReady(true);
      }
    };

    fetchAccessTokenAndTracks();
  }, []);

  const handleSubmitButtonClick = () => {
    setIsMarkerPlacementAllowed(false);
  };

  const handleStartGame = () => {
    setScore(0);
    setTrackCount(1);
    setIsGameEnded(false);
    setIsGameStarted(true);
    setIsGameReady(false);
    setCurrentTrackIndex(0);
    setTrack(tracks[0]);
  };

  const handleNextRound = () => {
    setShouldResetMap(true);
    const nextIndex =
      currentTrackIndex + 1 < tracks.length ? currentTrackIndex + 1 : 0;
    setCurrentTrackIndex(nextIndex);
    setTrack(tracks[nextIndex]);
    setIsSubmitted(false);
    setIsMarkerPlacementAllowed(true);
    setTrackCount((prevCount) => prevCount + 1);
    setSelectedCountry(null);
    setMarkerLocation(null);
    if (isFiftyFifty) {
      setIsFiftyFifty(false);
    }
  };

  const handlePlayAgain = () => {
    setShouldResetMap(true);
    setIsGameStarted(false);
    setIsGameReady(false);
    setCurrentTrackIndex(-1);
    refreshAccessToken().then((token) => {
      if (token) {
        getRandomTracks(token).then((fetchedTracks) => {
          setTracks(fetchedTracks);
          setIsGameReady(true);
        });
      }
    });
    setIsMarkerPlacementAllowed(true);
    setScore(0);
    setTrackCount(1);
    setIsGameEnded(false);
    setIsFinalRound(false);
    setIsSubmitted(false);
    setCorrectLocation(null);
    setUsedFiftyFifty(false);
    setMarkerLocation(null);
    setSelectedCountry(null);
  };

  const handleSubmit = useSubmitGuess(
    setShowTrackInfo,
    track,
    selectedCountry,
    setCorrectLocation,
    markerLocation,
    setDistanceMessage
  );

  const handleCountrySelection = (country, location) => {
    setLocation(country);
    setSelectedCountry(country);
    setMarkerLocation(location);
  };

  const handleEndGame = () => {
    setIsGameEnded(true);
    setSubmittingScore(true);
  };

  const handleSubmitScoreToLeaderboard = () => {
    if (!username) {
      alert("Please enter a username before submitting your score.");
      return;
    }
    if (username.startsWith(" ") || username.endsWith(" ")) {
      alert("Username cannot start or end with whitespace.");
      return;
    }
    submitScoreToFirebase(username);
    setSubmittingScore(false);
  };

  // For displaying results at end
  // let correctCountry = null;
  // if (isSubmitted) {
  //   correctCountry = track.location;
  // }

  // console.log(
  //   {
  //     "trackCount": currentTrackIndex,
  //     "correctLocationCoords": correctLocation,
  //     "markerLocationCoords": markerLocation,
  //     "selectedCountry": selectedCountry,
  //     "correctCountry": correctCountry,
  //   }
  // )

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
        <StartGameButton
          handleStartGame={handleStartGame}
          isGameReady={isGameReady}
        />
      ) : (
        <>
          {isGameStarted && (
            <div className="mb-6">
              <ScoreAndRoundInfo
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
                isFiftyFifty={isFiftyFifty}
                markerLocation={markerLocation}
                setShouldResetMap={setShouldResetMap}
                setCorrectLocation={setCorrectLocation}
              />

              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto_2fr_1fr]">
                {/* {column 1 (row 4) - 5050 and flag} */}
                <div className="order-3 md:order-1 mx-auto">
                  {!usedFiftyFifty && !isSubmitted && (
                    <button
                      onClick={handleFiftyFifty}
                      className="btn btn-circle btn-success my-4"
                    >
                      50/50
                    </button>
                  )}
                  {fiftyFiftyModalVisible && (
                    <dialog open className="modal" id="fiftyFiftyModal">
                      <div className="modal-box">
                        <form method="dialog"></form>
                        <h2 className="mb-4">Select Your Guess</h2>
                        {fiftyFiftyOptions.map((option) => (
                          <button
                            key={option}
                            className="m-2 transition duration-300 ease-in-out hover:scale-105"
                            onClick={() => selectOption(option)}
                          >
                            <img
                              width="96px"
                              src={getFlagUrl(option)}
                              alt={`${option} flag`}
                            />
                          </button>
                        ))}
                      </div>
                    </dialog>
                  )}

                  {isSubmitted && (
                    <img
                      className="my-4"
                      width="96px"
                      src={getFlagUrl(track.location)}
                      alt={`${track.location} flag`}
                    />
                  )}
                </div>
                {/* {column 2 (row 3)- is correct guess and distance message} */}
                <div className="order-2 md:order-2">
                  <div className="my-2">
                    {isSubmitted && (
                      <div>
                        {isCorrectGuess ? (
                          <>
                            <p>
                              The correct country is{" "}
                              <span className="font-bold">
                                {track.location}
                              </span>
                              !
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
                              <span className="font-bold">
                                {track.location}
                              </span>
                              .
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
                {/* {column 3 (row 1)- audio player, final score, play again, submit score} */}
                <div className="order-1 md:order-3">
                  {isGameEnded && (
                    <GameEnded
                      submittingScore={submittingScore}
                      username={username}
                      setUsername={setUsername}
                      handleSubmitScoreToLeaderboard={
                        handleSubmitScoreToLeaderboard
                      }
                      handlePlayAgain={handlePlayAgain}
                    />
                  )}
                  <AudioPlayer ref={audioRef} track={track} />
                </div>
                {/* {column 4 (row 5) - album art, info button (description, track name and artist)} */}
                <div className="order-4 md:order-4">
                  {isSubmitted || isGameEnded ? (
                    <TrackInfo track={track} />
                  ) : (
                    ""
                  )}
                </div>
                {/* {column 5 (row 2/6) - submit button, next round button} */}
                {isSubmitted || isGameEnded ? (
                  <div className="order-1 md:order-5">
                    {/* row 2 - next round*/}
                    {!isGameEnded && isSubmitted && (
                      <TrackLoader
                        handleNextRound={handleNextRound}
                        handleEndGame={handleEndGame}
                        isFinalRound={isFinalRound}
                      />
                    )}
                  </div>
                ) : (
                  <div className="order-5 md:order-5">
                    {/* row 6 - submit*/}
                    <LocationGuess
                      selectedCountry={selectedCountry}
                      handleSubmit={handleSubmit}
                      onSubmitButtonClick={handleSubmitButtonClick}
                    />
                    {!isGameEnded && isSubmitted && (
                      <TrackLoader
                        handleNextRound={handleNextRound}
                        handleEndGame={handleEndGame}
                        isFinalRound={isFinalRound}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CoreLogic;
