export const refreshAccessToken = async (setAccessToken) => {
  try {

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

export const getRandomTrack = async (
  accessToken,
  prevTrack,
  setTrack,
  setIsLoading,
  resetAudio,
  setLocation,
  setShowTrackInfo
) => {
  try {
    setIsLoading(true);

    const playlistId = "34fCtmB1IBXo6gZmxAJi2l";

    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      const tracks = data.items.map((item) => item.track);
      let randomTrack = null;

      do {
        randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
      } while (prevTrack && (randomTrack.id === prevTrack.id || !randomTrack.preview_url));

      if (!randomTrack.preview_url) {
        // Handle case when the selected track has no preview
        console.warn("Selected track has no preview.");
        setTrack(null);
        setIsLoading(false);
        return;
      }

      const index = tracks.indexOf(randomTrack);
      const locations = getLocationOptions();
      const location = locations[index % locations.length];

      setTrack({ ...randomTrack, location });
      resetAudio();
      setLocation(location);
    } else {
      console.error("Error retrieving random track:", response.status);
    }

    setIsLoading(false);
    setShowTrackInfo(false);
  } catch (error) {
    console.error("Error retrieving random track:", error);
    setIsLoading(false);
  }
};


export const getLocationOptions = () => {
  return [
    "Nigeria",
    "Romania",
    "Indonesia",
    "Thailand",
    "Mexico",
    // Add more locations as needed
  ];
};
