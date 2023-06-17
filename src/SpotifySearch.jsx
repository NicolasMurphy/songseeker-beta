import React, { useEffect, useState, useRef } from 'react';
import SpotifyIcon from "./Images/pngegg.png";


const SpotifySearch = () => {
  const [track, setTrack] = useState(null);
  const [accessToken, setAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    refreshAccessToken();
  }, []);

  useEffect(() => {
    if (accessToken && isFirstLoad) {
      setIsFirstLoad(false);
      getRandomTrack();
    }
  }, [accessToken, isFirstLoad]);

  const refreshAccessToken = async () => {
    try {
      const clientId = '476c71bb69f4476a8e5b3f4d64c5bb98';
      const clientSecret = 'fb641cab33dd449cb46f71cdb1ab82d9';
      const credentials = `${clientId}:${clientSecret}`;
      const encodedCredentials = btoa(credentials);

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${encodedCredentials}`,
        },
        body: 'grant_type=client_credentials',
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.access_token);
      } else {
        console.error('Error refreshing access token:', response.status);
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
    }
  };

  const getRandomTrack = async () => {
    try {
      setIsLoading(true);

      const searchTerm = await fetch('https://random-word-api.vercel.app/api?words=1')
        .then((response) => response.json())
        .then((data) => data[0]);

      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const randomTrack = data.tracks.items[0];

        setTrack(randomTrack);
        resetAudio();
      } else {
        console.error('Error retrieving random track:', response.status);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error retrieving random track:', error);
      setIsLoading(false);
    }
  };

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
  };

  return (
    <div className="text-center my-12">
      <h1 className="my-12">Spotify Random Track</h1>
      <button className="btn btn-primary" onClick={getRandomTrack}>
        Get Random Track
      </button>

      {isLoading && <div>Loading...</div>}

      {!isLoading && track && (
        <div>
          <h2>{track.name}</h2>
          <p>By {track.artists[0].name}</p>
          <div className="custom-player">
            <img src={track.album.images[0].url} alt="Album Art" />
            <audio ref={audioRef} controls>
              <source src={track.preview_url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              <img
                src={SpotifyIcon}
                alt="Spotify Icon"
                style={{ width: '24px', height: '24px', marginLeft: '8px' }}
              />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotifySearch;
