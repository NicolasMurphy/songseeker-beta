import React, { useEffect, useRef } from "react";

const LocationGuess = ({ selectedCountry, handleSubmit }) => {
  // click enter instead of clicking button
  const buttonRef = useRef();
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && buttonRef.current) {
        buttonRef.current.click();
      }
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return (
    <div className="flex justify-center p-6">
      <button
        ref={buttonRef}
        className={`px-4 py-2 text-white rounded ${
          selectedCountry
            ? "bg-accent hover:bg-accent-focus transition-colors"
            : "bg-gray-500 opacity-50 cursor-not-allowed"
        }`}
        onClick={handleSubmit}
        disabled={!selectedCountry}
      >
        Submit
      </button>
    </div>
  );
};

export default LocationGuess;
