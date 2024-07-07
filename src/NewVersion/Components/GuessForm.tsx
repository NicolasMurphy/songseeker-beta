import React from "react";
import Autosuggest from "react-autosuggest";
import useStore from "../store/useStore";
import getFlagUrl from "../utils/getFlagUrl";

const GuessForm: React.FC = () => {
  const {
    setResult,
    setGameOver,
    setScore,
    setGuesses,
    setWrongGuesses,
    wrongGuesses,
    correctAnswer,
    score,
    guesses,
    inputValue,
    suggestions,
    isInputClicked,
    availableCountries,
    setInputValue,
    setSuggestions,
    setHighlightedSuggestion,
    setIsInputClicked,
    setAvailableCountries,
    setSelectedCountry
  } = useStore();

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

  const handleSuggestionSelected = (
    event: React.FormEvent<any>,
    { suggestion }: { suggestion: string }
  ) => {
    setSelectedCountry(suggestion);
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

  const checkAnswer = (selectedCountry: string) => {
    if (!selectedCountry.trim()) return;

    const inputLower = selectedCountry.toLowerCase();

    if (inputLower === correctAnswer.toLowerCase()) {
      setResult("Correct!");
      setGameOver(true);
    } else {
      setResult("Wrong.");
      setScore(Math.max(score - 1000, 0));
      setGuesses(guesses - 1);
      setWrongGuesses([...wrongGuesses, selectedCountry]);
      setAvailableCountries((prevCountries: string[]) =>
        prevCountries.filter(
          (country: string) => country.toLowerCase() !== inputLower
        )
      );
      if (guesses === 1) {
        setGameOver(true);
      }
    }
    setInputValue("");
  };

  return (
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
          className: "mx-auto input input-bordered w-full max-w-xs m-4",
          autoFocus: true,
        }}
        onSuggestionSelected={handleSuggestionSelected}
        onSuggestionHighlighted={onSuggestionHighlighted}
        highlightFirstSuggestion={true}
        shouldRenderSuggestions={() => true || isInputClicked} // always render suggestions
        theme={{
          suggestionsContainer:
            "mx-auto bg-gray-300 mt-1 w-full max-w-xs z-10 max-h-48 scrollbar",
          suggestion: "p-2 cursor-pointer text-black",
          suggestionHighlighted: "bg-blue-300",
        }}
      />
    </div>
  );
};

export default GuessForm;
