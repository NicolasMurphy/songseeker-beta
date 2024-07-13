import React from "react";
import Select, { SingleValue } from "react-select";
import classNames from "classnames";
import useStore from "../store/useStore";
import getFlagUrl from "../utils/getFlagUrl";
import useCalculateDistance from "../hooks/useCalculateDistance";

const GuessForm: React.FC = () => {
  const {
    setResult,
    setRoundOver,
    setScore,
    setGuesses,
    setWrongGuesses,
    wrongGuesses,
    correctAnswer,
    score,
    guesses,
    inputValue,
    availableCountries,
    setInputValue,
    setAvailableCountries,
    setSelectedCountry,
    gameScore,
    setGameScore,
  } = useStore();

  const countryOptions = availableCountries.map((country) => ({
    value: country,
    label: (
      <div className="flex">
        <img
          className="object-contain w-6"
          src={getFlagUrl(country)}
          alt={`${country} flag`}
        />
        <div className="mx-4">{country}</div>
      </div>
    ),
  }));

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  const handleCalculateDistance = useCalculateDistance();

  const handleChange = (
    selectedOption: SingleValue<{ value: string; label: React.ReactNode }>
  ) => {
    if (selectedOption) {
      const selectedCountry = selectedOption.value;
      setSelectedCountry(selectedCountry);
      checkAnswer(selectedCountry);
      handleCalculateDistance(selectedCountry);
    }
  };

  const checkAnswer = (selectedCountry: string) => {
    if (!selectedCountry.trim()) return;

    const inputLower = selectedCountry.toLowerCase();

    if (inputLower === correctAnswer.toLowerCase()) {
      setGameScore(gameScore + score);
      setResult("Correct!");
      setRoundOver(true);
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
        setRoundOver(true);
      }
    }
    setInputValue("");
  };

  return (
    <div>
      <Select
        options={countryOptions}
        value={
          countryOptions.find((option) => option.value === inputValue) || null
        }
        onChange={handleChange}
        onInputChange={handleInputChange}
        placeholder="Enter country"
        className="bg-gray-700 m-4 max-w-xs mx-auto"
        autoFocus
        isSearchable
        unstyled
        defaultMenuIsOpen
        menuIsOpen={true}
        classNames={{
          menu: () =>
            classNames("bg-gray-300", "text-gray-900", "mt-1", "w-full"),
          option: ({ isFocused }) =>
            classNames(
              isFocused ? "bg-blue-300" : "bg-transparent",
              "py-2",
              "px-3"
            ),
          valueContainer: () => classNames("px-2"),
        }}
      />
    </div>
  );
};

export default GuessForm;
