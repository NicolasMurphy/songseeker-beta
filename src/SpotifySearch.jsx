import React, { useEffect, useState } from 'react';

const SpotifySearch = () => {
  const [track, setTrack] = useState(null);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    refreshAccessToken();
  }, []);

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
          'Authorization': `Basic ${encodedCredentials}`,
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
      if (!accessToken) {
        console.error('Access token not available');
        return;
      }

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
      } else {
        console.error('Error retrieving random track:', response.status);
      }
    } catch (error) {
      console.error('Error retrieving random track:', error);
    }
  };


  return (
    <div className='text-center my-12'>
      <h1 className='my-12'>Spotify Random Track</h1>
      <button className='btn btn-primary' onClick={getRandomTrack}>Get Random Track</button>

      {track && (
        <div>
          <h2>{track.name}</h2>
          <p>By {track.artists[0].name}</p>
          <iframe
            className='mx-auto'
            src={`https://open.spotify.com/embed/track/${track.id}`}
            width="300"
            height="380"
            allowtransparency="true"
            allow="encrypted-media"
            title="Spotify Player"
            style={{ background: "transparent", border: "none" }}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default SpotifySearch;
