import React, { useEffect, useRef, useState } from 'react';
import { refreshAccessToken, getRandomTrack } from './api';
import TrackInfo from './TrackInfo';
import AudioPlayer from './AudioPlayer';
import Map from './Map';
import { haversineDistance } from './utils';

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

  const handleGeocoding = async (address) => {
    const geocoder = new window.google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          const { location } = results[0].geometry;
          resolve([location.lat(), location.lng()]);
        } else {
          reject('Geocode was not successful for the following reason: ' + status);
        }
      });
    });
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
        <p>{distanceMessage}</p>
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
            className={`px-4 py-2 text-white rounded ${
              selectedCountry ? 'bg-accent hover:bg-accent-focus transition-colors' : 'bg-gray-500 opacity-50 cursor-not-allowed'
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
