import React, { useState, useEffect } from "react";
import useTracks from "./useTracks";
import getDescriptionOptions from "../utils/DescriptionOptions";
import AudioPlayer from "./AudioPlayer";
import Autosuggest from "react-autosuggest";

interface Description {
  description: string;
  country: string;
}

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};

const NewVersion: React.FC = () => {
  const { tracks, loading } = useTracks();
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const [randomIndex, setRandomIndex] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const descriptions: Description[] = getDescriptionOptions();
    setRandomIndex(getRandomInt(descriptions.length));
  }, []);

  const descriptions: Description[] = getDescriptionOptions();
  const countries = descriptions.map(desc => desc.country);

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : countries.filter(
      country => country.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  const handleInputChange = (event: React.FormEvent<any>, { newValue }: { newValue: string }) => {
    setInputValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const checkAnswer = () => {
    if (
      inputValue.toLowerCase() ===
      descriptions[randomIndex as number].country.toLowerCase()
    ) {
      setResult("Correct");
    } else {
      setResult("Wrong");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="mx-auto mt-40 text-center">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {tracks.length === 0 || randomIndex === null ? (
              <div>No tracks available</div>
            ) : (
              <section>
                <AudioPlayer src={tracks[randomIndex].preview_url} />
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
                    className: "input input-bordered w-full max-w-xs m-4",
                  }}
                />
                <button className="btn btn-primary m-4" onClick={checkAnswer}>
                  Check
                </button>
                <div>{result}</div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewVersion;
