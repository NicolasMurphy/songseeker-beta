import React from 'react';

const LocationGuess = ({ selectedCountry, handleSubmit }) => (
  <div className="flex justify-center p-6">
    <button
      className={`px-4 py-2 text-white rounded ${
        selectedCountry ? 'bg-accent hover:bg-accent-focus transition-colors' : 'bg-gray-500 opacity-50 cursor-not-allowed'
      }`}
      onClick={handleSubmit}
      disabled={!selectedCountry}
    >
      Submit
    </button>
  </div>
);

export default LocationGuess;
