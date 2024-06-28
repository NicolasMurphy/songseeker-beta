import React, { useState, useEffect } from "react";
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
  const [score, setScore] = useState(0);

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

  const checkAnswer = () => {
    if (!inputValue.trim()) return;

    const correctAnswer =
      descriptions[randomIndex as number].country.toLowerCase();
    const inputLower = inputValue.toLowerCase();

    if (inputLower === correctAnswer) {
      setResult("Correct!");
      setScore(score + 3000);
    } else {
      setResult("Wrong");
      setScore(score - 1000);
    }
  };

  const theme = {
    input: "input input-bordered w-full max-w-xs m-4",
    suggestionsContainer: "ml-4 bg-gray-400 mt-1 w-full max-w-xs z-10",
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
                <AudioPlayer src={tracks[randomIndex].preview_url} />
                <div className="flex">
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
                    }}
                    theme={{
                      suggestionsContainer: theme.suggestionsContainer,
                      suggestion: theme.suggestion,
                      suggestionHighlighted: theme.suggestionHighlighted,
                    }}
                  />
                  <div className="m-4"></div>
                  <button className="btn btn-primary m-4" onClick={checkAnswer}>
                    Check
                  </button>
                </div>
                <div>{result}</div>
                <div>Score: {score}</div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewVersion;
