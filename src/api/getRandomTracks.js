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

const getRandomTracks = async (accessToken) => {
  const playlistId = "34fCtmB1IBXo6gZmxAJi2l";
  // const playlistId = "3GFRHr2rWYiBxgXLqLXBYt"; // shorter playlist for testing
  const allTracks = await fetchAllTracks(playlistId, accessToken);
  const descriptions = getDescriptionOptions();

  const tracksWithCountries = allTracks.map((track, index) => ({
    ...track,
    location: descriptions[index % descriptions.length].country,
    description: descriptions[index % descriptions.length],
  }));

  const tracksWithoutPreviewUrl = allTracks.filter(
    (track) => !track.preview_url
  );
  console.log("Tracks without preview URL:", tracksWithoutPreviewUrl);

  const playedTracksKey = `playedTracks_${playlistId}`;
  let playedTracks = new Set(
    JSON.parse(localStorage.getItem(playedTracksKey) || "[]")
  );

  let availableTracks = tracksWithCountries.filter(
    (track) => track.preview_url && !playedTracks.has(track.id)
  );
  if (availableTracks.length < 6) {
    localStorage.removeItem(playedTracksKey);
    playedTracks = new Set();
    availableTracks = tracksWithCountries.filter((track) => track.preview_url);
  }

  const selectedTracks = [];
  for (let i = 0; i < 3 && availableTracks.length > 0; i++) {
    const trackIndex = Math.floor(Math.random() * availableTracks.length);
    const selectedTrack = availableTracks.splice(trackIndex, 1)[0];
    selectedTracks.push(selectedTrack);
    playedTracks.add(selectedTrack.id);
  }
  localStorage.setItem(playedTracksKey, JSON.stringify([...playedTracks]));

  return selectedTracks;
};

export default getRandomTracks;
