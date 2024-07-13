import React, { useState, useEffect, useRef } from "react";
import useTracks from "../hooks/useTracks";
import getDescriptionOptions from "../utils/DescriptionOptions";
import AudioPlayer from "./AudioPlayer";
import { Description } from "../utils/types";
import { BigLoader } from "./Loaders";
import { RoundOver } from "./RoundOver";
import useStore from "../store/useStore";
import GuessesTable from "./GuessesTable";
import GuessForm from "./GuessForm";
// import HintsTable from "./HintsTable";
import { INITIAL_GUESSES } from "../utils/constants";

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};

const NewVersion: React.FC = () => {
  const { tracks, loading, error } = useTracks();
  const [trackKey, setTrackKey] = useState(0); // force re-mount

  const {
    roundOver,
    score,
    guesses,
    resetRound,
    setCorrectAnswer,
    setAvailableCountries,
    setRandomIndex,
    randomIndex,
    round,
    setRound
  } = useStore();

  useEffect(() => {
    const descriptions: Description[] = getDescriptionOptions();
    const newIndex = getRandomInt(descriptions.length);
    setRandomIndex(newIndex);
    setAvailableCountries(descriptions.map((desc) => desc.country).sort());
    setCorrectAnswer(descriptions[newIndex].country);
  }, [resetRound, setAvailableCountries, setCorrectAnswer, setRandomIndex]);

  const handleNextRound = () => {
    setRound(round + 1);
    resetRound();
    const descriptions: Description[] = getDescriptionOptions();
    const newIndex = getRandomInt(descriptions.length);
    setRandomIndex(newIndex);
    setAvailableCountries(descriptions.map((desc) => desc.country).sort());
    setCorrectAnswer(descriptions[newIndex].country);
    setTrackKey(trackKey + 1); // force re-mount
  };

  const nextRoundButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (roundOver && nextRoundButtonRef.current) {
        nextRoundButtonRef.current.click();
      }
    };
    document.addEventListener("keypress", handleKeyPress as EventListener);
    return () => {
      document.removeEventListener("keypress", handleKeyPress as EventListener);
    };
  });

  return (
    <div className="flex min-h-screen">
      <div className="mx-auto mt-20 text-center">
        {loading ? (
          <BigLoader />
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : (
          <>
            {tracks.length === 0 || randomIndex === null ? (
              <div>No tracks available</div>
            ) : (
              <section>
                <div>Round: {round}</div>
                <AudioPlayer
                  key={trackKey} // force re-mount
                  src={tracks[randomIndex].preview_url}
                />
                {/* <HintsTable /> */}
                {roundOver ? (
                  <RoundOver
                    onNextRound={handleNextRound}
                    nextRoundButtonRef={nextRoundButtonRef}
                  />
                ) : (
                  <>
                    {guesses !== INITIAL_GUESSES && (
                      <>
                        <div className="mb-2 mt-8">Score: {score}</div>
                        <div className="mb-2 mt-4">Guesses left: {guesses}</div>
                      </>
                    )}
                  </>
                )}
                <GuessesTable />
                {!roundOver && <GuessForm />}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewVersion;
