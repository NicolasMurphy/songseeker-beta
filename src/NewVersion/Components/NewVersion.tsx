import React, { useState, useEffect, useRef } from "react";
import Autosuggest from "react-autosuggest";
import useTracks from "../hooks/useTracks";
import getDescriptionOptions from "../../utils/DescriptionOptions";
import AudioPlayer from "./AudioPlayer";
import { Description } from "../utils/types";
import getFlagUrl from "../utils/getFlagUrl";
import { Loader } from "./Loader";
import { GameOver } from "./GameOver";
import useGameStore from "../store/useGameStore";
import WrongGuesses from "./WrongGuesses";
import { INITIAL_GUESSES } from "../utils/constants";

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};

// helpers

const getSuggestions = (value: string, availableCountries: string[]) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? availableCountries
    : availableCountries.filter(
        (country) => country.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const NewVersion: React.FC = () => {
  const { tracks, loading } = useTracks();
  const [inputValue, setInputValue] = useState("");
  const [randomIndex, setRandomIndex] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [trackKey, setTrackKey] = useState(0); // force re-mount
  const [highlightedSuggestion, setHighlightedSuggestion] = useState<
    string | null
  >(null);
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [availableCountries, setAvailableCountries] = useState<string[]>([]);

  const {
    gameOver,
    setGameOver,
    result,
    setResult,
    score,
    setScore,
    guesses,
    setGuesses,
    wrongGuesses,
    setWrongGuesses,
    resetGame,
  } = useGameStore();

  useEffect(() => {
    const descriptions: Description[] = getDescriptionOptions();
    setRandomIndex(getRandomInt(descriptions.length));
    setAvailableCountries(descriptions.map((desc) => desc.country).sort());
  }, []);

  const descriptions: Description[] = getDescriptionOptions();

  const correctAnswer =
    randomIndex !== null ? descriptions[randomIndex].country : "";

  // handlers

  const handleInputChange = (
    event: React.FormEvent<any>,
    { newValue }: { newValue: string }
  ) => {
    setInputValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value, availableCountries));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleSuggestionSelected = (
    event: React.FormEvent<any>,
    { suggestion }: { suggestion: string }
  ) => {
    checkAnswer(suggestion);
  };

  const onSuggestionHighlighted = ({
    suggestion,
  }: {
    suggestion: string | null;
  }) => {
    setHighlightedSuggestion(suggestion);
  };

  const handleInputClick = () => {
    setIsInputClicked(true);
    setSuggestions(availableCountries);
  };

  const handlePlayAgain = () => {
    resetGame();
    setInputValue("");
    const newDescriptions: Description[] = getDescriptionOptions();
    setRandomIndex(getRandomInt(newDescriptions.length));
    setAvailableCountries(newDescriptions.map((desc) => desc.country).sort());
    setTrackKey(trackKey + 1); // force re-mount
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (!gameOver && event.key === "Enter" && suggestions.length > 0) {
      event.preventDefault();
      const suggestionToUse = highlightedSuggestion;
      if (suggestionToUse !== null) {
        setInputValue(suggestionToUse);
        checkAnswer(suggestionToUse);
      }
      setIsInputClicked(false);
    }
    if (gameOver && playAgainButtonRef.current) {
      playAgainButtonRef.current.click();
    }
  };

  // game logic

  const checkAnswer = (selectedCountry: string) => {
    if (!selectedCountry.trim()) return;

    const inputLower = selectedCountry.toLowerCase();

    if (wrongGuesses.includes(selectedCountry)) {
      setResult(`You already guessed "${selectedCountry}". Try another one.`);
      setInputValue("");
      return;
    }

    if (inputLower === correctAnswer.toLowerCase()) {
      setResult("Correct!");
      setGameOver(true);
    } else {
      setResult("Wrong.");
      setScore(Math.max(score - 1000, 0));
      setGuesses(guesses - 1);
      setWrongGuesses([...wrongGuesses, selectedCountry]);
      setAvailableCountries((prevCountries) =>
        prevCountries.filter((country) => country.toLowerCase() !== inputLower)
      );
      if (guesses === 1) {
        setGameOver(true);
      }
    }
    setInputValue("");
  };

  const playAgainButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress as EventListener);
    return () => {
      document.removeEventListener("keypress", handleKeyPress as EventListener);
    };
  });

  const theme = {
    input: "mx-auto input input-bordered w-full max-w-xs m-4",
    suggestionsContainer:
      "mx-auto bg-gray-300 m-1 w-full max-w-xs z-10 max-h-48 scrollbar",
    suggestion: "p-2 cursor-pointer text-black",
    suggestionHighlighted: "bg-blue-300",
  };

  return (
    <div className="flex min-h-screen">
      <div className="mx-auto mt-40 text-center">
        {loading ? (
          <Loader />
        ) : (
          <>
            {tracks.length === 0 || randomIndex === null ? (
              <div>No tracks available</div>
            ) : (
              <section>
                <AudioPlayer
                  key={trackKey} // force re-mount
                  src={tracks[randomIndex].preview_url}
                />
                {!gameOver && (
                  <div>
                    <Autosuggest
                      suggestions={suggestions}
                      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                      onSuggestionsClearRequested={onSuggestionsClearRequested}
                      getSuggestionValue={(suggestion) => suggestion}
                      renderSuggestion={(suggestion) => (
                        <div className="flex">
                          <img
                            className="object-contain w-6"
                            src={getFlagUrl(suggestion)}
                            alt={`${suggestion} flag`}
                          ></img>
                          <div className="mx-4">{suggestion}</div>
                        </div>
                      )}
                      inputProps={{
                        placeholder: "Enter country",
                        value: inputValue,
                        onChange: handleInputChange,
                        onClick: handleInputClick,
                        className: theme.input,
                        autoFocus: true,
                      }}
                      onSuggestionSelected={handleSuggestionSelected}
                      onSuggestionHighlighted={onSuggestionHighlighted}
                      highlightFirstSuggestion={true}
                      shouldRenderSuggestions={() => true || isInputClicked} // always render suggestions
                      theme={{
                        suggestionsContainer: theme.suggestionsContainer,
                        suggestion: theme.suggestion,
                        suggestionHighlighted: theme.suggestionHighlighted,
                      }}
                    />
                  </div>
                )}
                {gameOver ? (
                  <GameOver
                    onPlayAgain={handlePlayAgain}
                    playAgainButtonRef={playAgainButtonRef}
                  />
                ) : (
                  <>
                    {guesses !== INITIAL_GUESSES && (
                      <>
                        <div>
                          {result} {guesses} guesses left.
                        </div>
                      </>
                    )}
                  </>
                )}
                {guesses !== INITIAL_GUESSES && <WrongGuesses />}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewVersion;
