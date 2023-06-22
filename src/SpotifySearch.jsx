import React, { useEffect, useRef, useState } from 'react';
import { refreshAccessToken, getRandomTrack, getLocationOptions } from './api';
import TrackInfo from './TrackInfo';
import AudioPlayer from './AudioPlayer';
import Map from './Map';

const SpotifySearch = () => {
  const [track, setTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [showTrackInfo, setShowTrackInfo] = useState(false);
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  const audioRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if the guess has been submitted

  useEffect(() => {
    const fetchData = async () => {
      await refreshAccessToken(setTrack);
      handleGetRandomTrack();
    };

    fetchData();
  }, []);

  const handleGetRandomTrack = async () => {
    setShowTrackInfo(false);
    setIsLoading(true);
    setIsSubmitted(false); // Reset the isSubmitted state to false

    try {
      const token = localStorage.getItem('accessToken');
      await getRandomTrack(
        token,
        track,
        setTrack,
        setIsLoading,
        resetAudio,
        setLocation,
        setShowTrackInfo
      );
    } catch (error) {
      console.error('Error retrieving random track:', error);
      setIsLoading(false);
    }
  };

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.reset();
    }
  };

  const handleCountrySelection = (country) => {
    setLocation(country);
    setSelectedCountry(country);
  };

  const handleSubmit = () => {
    const isGuessCorrect = selectedCountry.toLowerCase() === track.location.toLowerCase();
    setIsCorrectGuess(isGuessCorrect);
    setIsSubmitted(true);
    setShowTrackInfo(true);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">Guess the Track Location</h1>
      <div className="flex justify-center mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={handleGetRandomTrack}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Get Random Track'}
        </button>
      </div>
      <div className="mb-6">
        <Map handleCountrySelection={handleCountrySelection} selectedCountry={selectedCountry} />
        <p>Selected Country: {selectedCountry}</p>
      </div>
      <AudioPlayer ref={audioRef} track={track} />
      {isSubmitted ? (
        <div className="mb-6 text-center">
          {showTrackInfo && <TrackInfo track={track} />}
          {isCorrectGuess && <p className="text-green-500">Your guess is correct!</p>}
          {!isCorrectGuess && (
            <p className="text-red-500">
              You guessed wrong. The correct country is {track.location}.
            </p>
          )}
        </div>
      ) : (
        <div className="flex justify-center p-6">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default SpotifySearch;
