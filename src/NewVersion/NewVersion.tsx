import React, { useState, useEffect, useRef } from "react";
import Autosuggest from "react-autosuggest";
import useTracks from "./useTracks";
import getDescriptionOptions from "../utils/DescriptionOptions";
import AudioPlayer from "./AudioPlayer";
import { Description } from "./types";
import getFlagUrl from "./getFlagUrl";

const INITIAL_SCORE = 3000;
const INITIAL_GUESSES = 3;

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};

const NewVersion: React.FC = () => {
  const { tracks, loading } = useTracks();
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const [randomIndex, setRandomIndex] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [score, setScore] = useState(INITIAL_SCORE);
  const [guesses, setGuesses] = useState(INITIAL_GUESSES);
  const [gameOver, setGameOver] = useState(false);
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
  const [trackKey, setTrackKey] = useState(0); // force re-mount
  const [highlightedSuggestion, setHighlightedSuggestion] = useState<string | null>(null);
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [availableCountries, setAvailableCountries] = useState<string[]>([]);

  useEffect(() => {
    const descriptions: Description[] = getDescriptionOptions();
    setRandomIndex(getRandomInt(descriptions.length));
    setAvailableCountries(descriptions.map((desc) => desc.country).sort());
  }, []);

  const descriptions: Description[] = getDescriptionOptions();

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? availableCountries
      : availableCountries.filter(
          (country) =>
            country.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const handleInputChange = (
    event: React.FormEvent<any>,
    { newValue }: { newValue: string }
  ) => {
    setInputValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const correctAnswer =
    randomIndex !== null ? descriptions[randomIndex].country : "";

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
      setWrongGuesses((prevGuesses) => [...prevGuesses, selectedCountry]);
      setAvailableCountries((prevCountries) => prevCountries.filter((country) => country.toLowerCase() !== inputLower));
      if (guesses === 1) {
        setGameOver(true);
      }
    }
    setInputValue("");
  };

  const handlePlayAgain = () => {
    setInputValue("");
    setResult("");
    setScore(INITIAL_SCORE);
    setGuesses(INITIAL_GUESSES);
    setGameOver(false);
    setWrongGuesses([]);
    const newDescriptions: Description[] = getDescriptionOptions();
    setRandomIndex(getRandomInt(newDescriptions.length));
    setAvailableCountries(newDescriptions.map((desc) => desc.country).sort());
    setTrackKey(trackKey + 1); // force re-mount
  };

  const handleSuggestionSelected = (
    event: React.FormEvent<any>,
    { suggestion }: { suggestion: string }
  ) => {
    checkAnswer(suggestion);
  };

  const playAgainButtonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
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
    document.addEventListener("keypress", handleKeyPress as EventListener);
    return () => {
      document.removeEventListener("keypress", handleKeyPress as EventListener);
    };
  });

  const theme = {
    input: "mx-auto input input-bordered w-full max-w-xs m-4",
    suggestionsContainer: "mx-auto bg-gray-300 m-1 w-full max-w-xs z-10 max-h-48 scrollbar",
    suggestion: "p-2 cursor-pointer text-black",
    suggestionHighlighted: "bg-blue-300",
  };

  return (
    <div className="flex min-h-screen">
      <div className="mx-auto mt-40 text-center">
        {loading ? (
          <span className="loading loading-bars loading-lg text-primary"></span>
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
                  <>
                    <div>
                      {result} The answer was {correctAnswer}.
                    </div>
                    <div>Score: {score}</div>
                    <button
                      ref={playAgainButtonRef}
                      className="btn btn-primary m-4"
                      onClick={handlePlayAgain}
                    >
                      Play Again
                    </button>
                  </>
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
                {guesses !== INITIAL_GUESSES && (
                  <table className="table w-100">
                    <tbody>
                      {wrongGuesses.map((wrongGuess) => (
                        <tr key={wrongGuess}>
                          <td className="w-20">
                            <img
                              src={getFlagUrl(wrongGuess)}
                              alt={`${wrongGuess} flag`}
                            ></img>
                          </td>
                          <td className="text-left">{wrongGuess}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
