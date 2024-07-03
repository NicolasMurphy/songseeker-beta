import React, { useState, useEffect, useRef } from "react";
import useTracks from "./useTracks";
import getDescriptionOptions from "../utils/DescriptionOptions";
import AudioPlayer from "./AudioPlayer";
import Autosuggest from "react-autosuggest";
import { Description } from "./types";

const NewVersion: React.FC = () => {
  const { tracks, loading } = useTracks();
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const [randomIndex, setRandomIndex] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [score, setScore] = useState(3000);
  const [guesses, setGuesses] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
  const [trackKey, setTrackKey] = useState(0); // force re-mount

  useEffect(() => {
    const descriptions: Description[] = getDescriptionOptions();
    setRandomIndex(getRandomInt(descriptions.length));
  }, []);

  const descriptions: Description[] = getDescriptionOptions();
  const countries = descriptions.map((desc) => desc.country);

  const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * max);
  };

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : countries.filter(
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
      if (guesses === 1) {
        setGameOver(true);
      }
    }
    setInputValue("");
  };

  const handlePlayAgain = () => {
    setInputValue("");
    setResult("");
    setScore(3000);
    setGuesses(3);
    setGameOver(false);
    setWrongGuesses([]);
    setRandomIndex(getRandomInt(descriptions.length));
    setTrackKey(trackKey + 1); // force re-mount
  };

  const handleSuggestionSelected = (
    event: React.FormEvent<any>,
    { suggestion }: { suggestion: string }
  ) => {
    checkAnswer(suggestion);
  };

  const playAgainButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!gameOver && event.key === "Enter" && suggestions.length > 0) {
        event.preventDefault();
        const topSuggestion = suggestions[0];
        setInputValue(topSuggestion);
        checkAnswer(topSuggestion);
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
    suggestionsContainer: "mx-auto bg-gray-400 m-1 w-full max-w-xs z-10",
    suggestion: "p-2 cursor-pointer text-black",
    suggestionHighlighted: "bg-gray-300",
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
                      renderSuggestion={(suggestion) => <div>{suggestion}</div>}
                      inputProps={{
                        placeholder: "Enter country",
                        value: inputValue,
                        onChange: handleInputChange,
                        className: theme.input,
                        autoFocus: true,
                      }}
                      onSuggestionSelected={handleSuggestionSelected}
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
                    {guesses !== 3 && (
                      <>
                        <div>
                          {result} {guesses} guesses left.
                        </div>
                      </>
                    )}
                  </>
                )}
                {guesses !== 3 && (
                  <table className="table">
                    {wrongGuesses.map((wrongGuess) => (
                      <tbody>
                        <tr>
                          <td>flag</td>
                          <td>{wrongGuess}</td>
                        </tr>
                      </tbody>
                    ))}
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
