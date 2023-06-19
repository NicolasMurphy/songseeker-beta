export const refreshAccessToken = async (setAccessToken) => {
  try {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
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
      const accessToken = data.access_token;
      localStorage.setItem('accessToken', accessToken); // Store the access token in localStorage
      setAccessToken(accessToken);
    } else {
      console.error('Error refreshing access token:', response.status);
    }
  } catch (error) {
    console.error('Error refreshing access token:', error);
  }
};


export const getRandomTrack = async (accessToken, setTrack, setIsLoading, resetAudio, setLocation) => {
  try {
    setIsLoading(true);

    const playlistId = '34fCtmB1IBXo6gZmxAJi2l'; // Replace with the actual playlist ID

    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const tracks = data.items.map((item) => item.track);
      const randomIndex = Math.floor(Math.random() * tracks.length);
      const randomTrack = tracks[randomIndex];

      // Define a list of locations matching the playlist index
      const locations = [
        "Nigeria",
        "Romania",
        // Add more locations as needed
      ];

      const randomLocationIndex = randomIndex % locations.length;
      const location = locations[randomLocationIndex];

      setTrack({ ...randomTrack, location }); // Include the location with the track data
      resetAudio();
      setLocation(location); // Update the location state
    } else {
      console.error('Error retrieving random track:', response.status);
    }

    setIsLoading(false);
  } catch (error) {
    console.error('Error retrieving random track:', error);
    setIsLoading(false);
  }
};
