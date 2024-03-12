import React, { useEffect, useRef } from "react";

const LocationGuess = ({ selectedCountry, handleSubmit, onSubmitButtonClick, isLoading }) => {
  // click enter instead of clicking button
  const buttonRef = useRef();
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && selectedCountry && !isLoading && buttonRef.current) {
        buttonRef.current.click();
      }
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [selectedCountry, isLoading]);

  return (
    <div className="flex justify-center my-4">
      <button
        ref={buttonRef}
        className={`py-2 ${
          selectedCountry && !isLoading
            ? "btn btn-accent"
            : "btn btn-neutral"
        }`}
        onClick={() => {
          onSubmitButtonClick(); // Call the callback function when "Submit" is clicked
          handleSubmit(); // Continue with the submit logic
        }}
        disabled={!selectedCountry || isLoading}
        title={selectedCountry && !isLoading ? "Keyboard shortcut: Enter" : ""}
      >
        Submit
      </button>
    </div>
  );
};

export default LocationGuess;
