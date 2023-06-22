import React, { useEffect, useRef, useState } from 'react';
import { refreshAccessToken, getRandomTrack } from './api';
import AudioPlayer from './AudioPlayer';
import Map from './Map';
import { haversineDistance } from './utils';
import { handleGeocoding } from './helpers';
import TrackLoader from './TrackLoader';
import LocationGuess from './LocationGuess';
import TrackDetails from './TrackDetails';


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
  const [markerLocation, setMarkerLocation] = useState([0, 0]);
  const [distanceMessage, setDistanceMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      await refreshAccessToken(setTrack);
      handleGetRandomTrack();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (shouldResetMap) {
      setSelectedCountry('');
      setShouldResetMap(false);
    }
  }, [shouldResetMap]);

  const handleGetRandomTrack = async () => {
    setShouldResetMap(true);
    setShowTrackInfo(false);
    setIsLoading(true);
    setIsSubmitted(false);
    setDistanceMessage(''); // Clear distance message

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

  const handleCountrySelection = (country, location) => {
    setLocation(country);
    setSelectedCountry(country);
    setMarkerLocation(location);
  };

  const handleSubmit = async () => {
    if (selectedCountry) {
      const isGuessCorrect = selectedCountry.toLowerCase() === track.location.toLowerCase();
      setIsCorrectGuess(isGuessCorrect);
      setIsSubmitted(true);
      setShowTrackInfo(true);

      // Check the distance only if the guess is incorrect
      if (!isGuessCorrect) {
        try {
          const trackLocationCoords = await handleGeocoding(track.location); // convert track location name to coordinates
          const markerLocationCoords = Object.values(markerLocation); // convert marker location to coordinates array
          const distance = haversineDistance(trackLocationCoords, markerLocationCoords);
          if (distance) {
            setDistanceMessage(`You were ${distance} miles away.`);
          }
        } catch (error) {
          console.error('Error in geocoding:', error);
        }
      }
    }
  };

  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Guess the Track Location</h1>
      <div className="mb-6">
        <Map handleCountrySelection={handleCountrySelection} selectedCountry={selectedCountry} shouldReset={shouldResetMap} />
        <p>Selected Country: {selectedCountry}</p>
        <p>{distanceMessage}</p>
      </div>
      {isSubmitted ? <TrackLoader isLoading={isLoading} handleGetRandomTrack={handleGetRandomTrack} /> : null}
      <AudioPlayer ref={audioRef} track={track} />
      {isSubmitted ? <TrackDetails isCorrectGuess={isCorrectGuess} track={track} /> : <LocationGuess selectedCountry={selectedCountry} handleSubmit={handleSubmit} />}
    </div>
  );
};

export default SpotifySearch;
