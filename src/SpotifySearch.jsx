import React, { useEffect, useRef, useState } from 'react';
import { refreshAccessToken, getRandomTrack } from './api';
import AudioPlayer from './AudioPlayer';
import Map from './Map';
import { haversineDistance } from './utils';
import { handleGeocoding } from './helpers';
import TrackLoader from './TrackLoader';
import LocationGuess from './LocationGuess';
import TrackDetails from './TrackDetails';
import { registerLocale, getAlpha2Code } from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';
registerLocale(en);


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
  const [correctLocation, setCorrectLocation] = useState(null);

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
    setCorrectLocation(null); // Add this line
    setShowTrackInfo(false);
    setIsLoading(true);
    setIsSubmitted(false); // set isSubmitted back to false here
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

  const handleSubmit = async () => {
    if (selectedCountry) {
      const isGuessCorrect = selectedCountry.toLowerCase() === track.location.toLowerCase();
      setIsCorrectGuess(isGuessCorrect);
      setIsSubmitted(true);
      setShowTrackInfo(true);

      if (!isGuessCorrect) {
        try {
          const trackLocationCoords = await handleGeocoding(track.location);
          setCorrectLocation({lat: trackLocationCoords[0], lng: trackLocationCoords[1]});
          const markerLocationCoords = Object.values(markerLocation); // convert marker location to coordinates array
          const distance = haversineDistance(trackLocationCoords, markerLocationCoords);
          if (distance) {
            setDistanceMessage(`You were ${distance} miles away.`);
          }
        } catch (error) {
          console.error('Error in geocoding:', error);
        }
      } else {
        setCorrectLocation(null);  // Reset correct location if guess is correct
        setShouldResetMap(true); // Add this line
      }
    }
  };

  const getFlagUrl = (countryName) => {
    if (!countryName) return ''; // return empty string if no country name

    // Convert the country name to its ISO 3166-1-alpha-2 code
    let countryCode = getAlpha2Code(countryName, 'en');

    // if countryCode is null (no match found), return an empty string
    if (!countryCode) return '';

    // Construct the flag URL
    let flagUrl = `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;

    return flagUrl;
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


  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-4xl font-bold mb-4">SongSeeker</h1>
      <div className="mb-6">
        <Map handleCountrySelection={handleCountrySelection} selectedCountry={selectedCountry} correctLocation={correctLocation} shouldReset={shouldResetMap} />
        <p>Selected Country: {selectedCountry}</p>
        <p>{distanceMessage}</p>
      </div>
      {isSubmitted ? <TrackLoader isLoading={isLoading} handleGetRandomTrack={handleGetRandomTrack} /> : null}
      <AudioPlayer ref={audioRef} track={track} />
      {isSubmitted ? <TrackDetails isCorrectGuess={isCorrectGuess} track={track} getFlagUrl={getFlagUrl} trackLocation={track.location}/> : <LocationGuess selectedCountry={selectedCountry} handleSubmit={handleSubmit} />}
    </div>
  );
};

export default SpotifySearch;
