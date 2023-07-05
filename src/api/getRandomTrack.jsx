import getDescriptionOptions from '../utils/DescriptionOptions';

const getRandomTrack = async (
  accessToken,
  prevTrack,
  setTrack,
  setIsLoading,
  resetAudio,
  setLocation,
  setShowTrackInfo,
  playedTracks,
  setPlayedTracks
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
      } while (
        prevTrack &&
        (randomTrack.id === prevTrack.id || !randomTrack.preview_url || playedTracks.has(randomTrack.id))
      );

      if (!randomTrack || !randomTrack.preview_url) {
        console.warn("Selected track has no preview.");
        setTrack(null);
        setIsLoading(false);
        return;
      }

      // Add the selected track to playedTracks
      setPlayedTracks(prev => {
        const newSet = new Set(prev);
        newSet.add(randomTrack.id);
        return newSet;
      });

      const index = tracks.indexOf(randomTrack);
      const descriptions = getDescriptionOptions();
      const descriptionObject = descriptions[index % descriptions.length];

      setTrack({ ...randomTrack, location: descriptionObject.country, description: descriptionObject });

      resetAudio();
      setLocation(descriptionObject.country);
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

export default getRandomTrack;
