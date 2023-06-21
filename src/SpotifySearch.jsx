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
  const [guessResult, setGuessResult] = useState('');

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

    if (track && country.toLowerCase() === track.location.toLowerCase()) {
      setIsCorrectGuess(true);
    } else {
      setIsCorrectGuess(false);
    }

    setSelectedCountry(country);
  };

  const handleSubmit = () => {
    if (selectedCountry.toLowerCase() === track.location.toLowerCase()) {
      setGuessResult('Your guess is correct!');
    } else {
      setGuessResult(`Your guess is wrong. The location is ${track.location}.`);
    }
  };

  return (
    <div>
      <h1>Guess the Track Location</h1>
      <button onClick={handleGetRandomTrack} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get Random Track'}
      </button>
      {showTrackInfo && <TrackInfo track={track} isCorrect={isCorrectGuess} />}
      <Map
        handleCountrySelection={handleCountrySelection}
        selectedCountry={selectedCountry}
      />
      <p>Selected Country: {selectedCountry}</p>
      <AudioPlayer ref={audioRef} track={track} />
      <button onClick={handleSubmit}>Submit</button>
      {guessResult && <p>{guessResult}</p>}
    </div>
  );
};

export default SpotifySearch;
