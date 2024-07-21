import React, { useState, useEffect, useRef } from "react";
import useTracks from "../hooks/useTracks";
import getDescriptionHintOptions from "../utils/DescriptionHintOptions";
import AudioPlayer from "./AudioPlayer";
import { Description } from "../utils/types";
import { BigLoader } from "./Loaders";
import { RoundOver } from "./RoundOver";
import useStore from "../store/useStore";
import GuessesTable from "./GuessesTable";
import GuessForm from "./GuessForm";
import GameInfo from "./GameInfo";
import TrackInfo from "./TrackInfo";
import { GameOver } from "./GameOver";
import StartGameButton from "./StartGameButton";
import LogoAndName from "./LogoAndName";
import HintsTable from "./HintsTable";

const NewVersion: React.FC = () => {
  const { tracks, loading, error, trackIndices, refetchTracks } = useTracks();
  const [trackKey, setTrackKey] = useState(0); // force re-mount
  const [descriptions, setDescriptions] = useState<Description[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  const {
    roundOver,
    guesses,
    resetRound,
    setCorrectAnswer,
    setAvailableCountries,
    round,
    setRound,
    gameOver,
    resetGame,
    selectedCountry,
    correctAnswer,
  } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      const descriptions = getDescriptionHintOptions();
      setDescriptions(descriptions);
      setAvailableCountries(descriptions.map((desc) => desc.country).sort());
      if (trackIndices.length > 0) {
        setCorrectAnswer(descriptions[trackIndices[0]].country);
      }
    };

    fetchData();
  }, [trackIndices, setAvailableCountries, setCorrectAnswer]);

  const handleNextRound = () => {
    const newRound = round + 1;
    setRound(newRound);
    resetRound();
    if (descriptions.length > 0 && trackIndices.length >= newRound) {
      setCorrectAnswer(descriptions[trackIndices[newRound - 1]].country);
      setAvailableCountries(descriptions.map((desc) => desc.country).sort());
    }
    setTrackKey(trackKey + 1); // force re-mount
  };

  const handleNewGame = () => {
    resetGame();
    refetchTracks();
    setTrackKey(trackKey + 1); // force re-mount
    setGameStarted(false);
  };

  const nextRoundButtonRef = useRef<HTMLButtonElement>(null);
  const playAgainButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (roundOver && nextRoundButtonRef.current) {
        nextRoundButtonRef.current.click();
      }
      if (gameOver && playAgainButtonRef.current) {
        playAgainButtonRef.current.click();
      }
    };
    document.addEventListener("keypress", handleKeyPress as EventListener);
    return () => {
      document.removeEventListener("keypress", handleKeyPress as EventListener);
    };
  });

  return (
    // <div className="grid grid-cols-3 auto-rows-min gap-4 p-4">
    //   <div className="col-start-1">
    //     <div className="bg-gray-200 p-4 h-40">test1</div>
    //     <div className="bg-gray-200 p-4 h-40 mt-4">test1</div>
    //   </div>
    //   <div className="col-start-2">
    //     <div className="bg-gray-200 p-4 h-20">test2</div>
    //     <div className="bg-gray-200 p-4 h-20 mt-4">test2</div>
    //   </div>
    //   <div className="col-start-3">
    //     <div className="bg-gray-200 p-4">test3</div>
    //   </div>
    // </div>
    <div className="min-h-screen mx-auto">
      <div className="mx-auto my-16 text-center">
        {!gameStarted && <LogoAndName />}
        {loading ? (
          <BigLoader />
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : (
          <>
            {tracks.length === 0 ? (
              <div>No tracks available</div>
            ) : (
              <section className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-min md:grid-flow-row-dense">
                {!gameStarted ? (
                  <StartGameButton setGameStarted={setGameStarted} />
                ) : (
                  <>
                    {/* 🚨 GRID 1 🚨 */}
                    <div>
                      {/* Hints Table Card */}
                      <HintsTable
                        track={tracks[trackIndices[round - 1]]}
                        hint={descriptions[trackIndices[round - 1]].hint}
                      />
                    </div>
                    {/* 🚨 GRID 2 🚨 */}
                    <div>
                      {/* Audio and Game Info Card */}
                      <div className="card bg-base-300 text-base-content py-4 my-4 max-w-xs mx-auto md:col-start-2">
                        <GameInfo />
                        {tracks[trackIndices[round - 1]]?.preview_url ? (
                          <AudioPlayer
                            key={trackKey}
                            src={tracks[trackIndices[round - 1]].preview_url}
                          />
                        ) : (
                          <div>No preview available for this track</div>
                        )}
                      </div>
                      {/* Game Over Card */}
                      {gameOver && (
                        <GameOver
                          onNewGame={handleNewGame}
                          playAgainButtonRef={playAgainButtonRef}
                        />
                      )}
                      {/* Round Score Card */}
                      {roundOver && (
                        <RoundOver
                          onNextRound={handleNextRound}
                          nextRoundButtonRef={nextRoundButtonRef}
                        />
                      )}
                      {/* Guesses Table Card */}
                      <GuessesTable />
                      {/* Guess Form Card */}
                      {!gameOver && !roundOver && <GuessForm />}
                    </div>
                    {/* 🚨 GRID 3 🚨 */}
                    <div>
                      {/* Track Info Card */}
                      {(guesses === 0 || selectedCountry === correctAnswer) &&
                        tracks[trackIndices[round - 1]] && (
                          <TrackInfo
                            track={tracks[trackIndices[round - 1]]}
                            description={
                              descriptions[trackIndices[round - 1]].description
                            }
                            link={descriptions[trackIndices[round - 1]].link}
                          />
                        )}
                    </div>
                  </>
                )}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewVersion;
