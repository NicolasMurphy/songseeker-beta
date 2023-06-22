import React, { useEffect, useRef, useState } from 'react';
import { refreshAccessToken, getRandomTrack } from './api';
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shouldResetMap, setShouldResetMap] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await refreshAccessToken(setTrack);
      handleGetRandomTrack();
    };

    fetchData();
  }, []);

  const handleGetRandomTrack = async () => {
    setShouldResetMap(true); // Move this line up
    setShowTrackInfo(false);
    setIsLoading(true);
    setIsSubmitted(false);

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
    if (selectedCountry) {
      const isGuessCorrect = selectedCountry.toLowerCase() === track.location.toLowerCase();
      setIsCorrectGuess(isGuessCorrect);
      setIsSubmitted(true);
      setShowTrackInfo(true);
    }
  };

  useEffect(() => {
    if (shouldResetMap) {
      setSelectedCountry('');
      setShouldResetMap(false);
    }
  }, [shouldResetMap]);

  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Guess the Track Location</h1>
      <div className="mb-6">
        <Map handleCountrySelection={handleCountrySelection} selectedCountry={selectedCountry} shouldReset={shouldResetMap} />
        <p>Selected Country: {selectedCountry}</p>
      </div>
      {isSubmitted && (
        <div className="flex justify-center mb-6">
          <button
            className="px-4 py-2 bg-primary hover:bg-primary-focus text-white rounded transition-colors"
            onClick={handleGetRandomTrack}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Get Random Track'}
          </button>
        </div>
      )}
      <AudioPlayer ref={audioRef} track={track} />
      {isSubmitted ? (
        <div className="m-6 text-center">
          {isCorrectGuess && <p className="text-success">Your guess is correct!</p>}
          {!isCorrectGuess && (
            <p className="text-error">
              You guessed wrong. The correct country is
              <span className="text-gray-300"> {track.location}</span>
            </p>
          )}
          {showTrackInfo && <TrackInfo track={track} />}
        </div>
      ) : (
        <div className="flex justify-center p-6">
          <button
            className={`px-4 py-2 text-white rounded transition-colors ${
              selectedCountry ? 'bg-accent hover:bg-accent-focus' : 'bg-accent cursor-not-allowed opacity-50'
            }`}
            onClick={handleSubmit}
            disabled={!selectedCountry}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default SpotifySearch;
