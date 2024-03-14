import getDescriptionOptions from "../utils/DescriptionOptions";

const getRandomTrack = async (
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
    // const playlistId = "3GFRHr2rWYiBxgXLqLXBYt"; // shorter playlist for testing

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
      // Initialize or retrieve playedTracks from local storage
      let localPlayedTracks = new Set(
        JSON.parse(localStorage.getItem("playedTracks") || "[]")
      );
      let randomTrack = null;

      // Attempt to select a random track that has not been played
      const attempts = tracks.filter(
        (track) => !localPlayedTracks.has(track.id) && track.preview_url
      );
      if (attempts.length > 0) {
        randomTrack = attempts[Math.floor(Math.random() * attempts.length)];
      }

      // Reset played tracks if all have been played
      if (!randomTrack) {
        localStorage.removeItem("playedTracks"); // Clear played tracks from local storage
        localPlayedTracks.clear(); // Clear the local set for a fresh start
        // Reattempt to select a track without filtering by playedTracks
        randomTrack = tracks.find((track) => track.preview_url);
      }

      if (!randomTrack) {
        console.warn("Unable to select a track.");
        setTrack(null);
        setIsLoading(false);
        return;
      }

      // Update localPlayedTracks and localStorage
      localPlayedTracks.add(randomTrack.id);
      localStorage.setItem(
        "playedTracks",
        JSON.stringify([...localPlayedTracks])
      );

      const index = tracks.indexOf(randomTrack);
      const descriptions = getDescriptionOptions();
      const descriptionObject = descriptions[index % descriptions.length];

      setTrack({
        ...randomTrack,
        location: descriptionObject.country,
        description: descriptionObject,
      });

      resetAudio();
      setLocation(descriptionObject.country);
    } else {
      console.error("Error retrieving random track:", response.status);
    }

    setIsLoading(false);
    setShowTrackInfo(true);
  } catch (error) {
    console.error("Error retrieving random track:", error);
    setIsLoading(false);
  }
};

export default getRandomTrack;
