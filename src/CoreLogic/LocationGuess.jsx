import { useEffect, useRef } from "react";

const LocationGuess = ({
  selectedCountry,
  handleSubmit,
  onSubmitButtonClick,
}) => {
  // click enter instead of clicking button
  const buttonRef = useRef();
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && selectedCountry && buttonRef.current) {
        buttonRef.current.click();
      }
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [selectedCountry]);

  return (
    <div className="flex justify-center my-2 md:my-4">
      <button
        ref={buttonRef}
        className="btn btn-accent"
        onClick={() => {
          onSubmitButtonClick(); // Call the callback function when "Submit" is clicked
          handleSubmit(); // Continue with the submit logic
        }}
        disabled={!selectedCountry}
        title={selectedCountry ? "Keyboard shortcut: Enter" : ""}
      >
        Submit
      </button>
    </div>
  );
};

export default LocationGuess;
