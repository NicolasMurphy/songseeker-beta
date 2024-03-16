import getDescriptionOptions from "../utils/DescriptionOptions";

const fetchAllTracks = async (playlistId, accessToken) => {
  let tracks = [];
  let url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`;
  while (url) {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch tracks");
    const data = await response.json();
    tracks = tracks.concat(data.items.map((item) => item.track));
    url = data.next;
  }
  return tracks;
};

const getRandomTrack = async (
  accessToken,
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

    const tracks = await fetchAllTracks(playlistId, accessToken);
    const descriptions = await getDescriptionOptions();

    let localPlayedTracks = new Set(
      JSON.parse(localStorage.getItem("playedTracks") || "[]")
    );

    let attempts = tracks.filter(track => track.preview_url && !localPlayedTracks.has(track.id));

    if (attempts.length === 0) {
      localStorage.removeItem("playedTracks");
      localPlayedTracks.clear();
      attempts = tracks.filter(track => track.preview_url);
    }

    const randomTrack = attempts[Math.floor(Math.random() * attempts.length)];
    if (!randomTrack) {
      console.warn("Unable to select a track.");
      setTrack(null);
      setIsLoading(false);
      return;
    }

    localPlayedTracks.add(randomTrack.id);
    localStorage.setItem("playedTracks", JSON.stringify([...localPlayedTracks]));

    const trackIndex = tracks.findIndex(track => track.id === randomTrack.id);
    const descriptionObject = descriptions.find(
      (desc, index) => index === (trackIndex % descriptions.length)
    );

    if (!descriptionObject) {
      console.warn("Description not found for the selected track.");
      setTrack(null);
      setIsLoading(false);
      return;
    }

    setTrack({
      ...randomTrack,
      location: descriptionObject.country,
      description: descriptionObject.description,
      link: descriptionObject.link
    });

    resetAudio();
    setLocation(descriptionObject.country);
    setShowTrackInfo(true);
  } catch (error) {
    console.error("Error retrieving random track:", error);
    setIsLoading(false);
  } finally {
    setIsLoading(false);
  }
};

export default getRandomTrack;
