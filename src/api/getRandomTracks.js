import tracksData from "../data/tracks.json";

const PLAYED_TRACKS_KEY = "playedTracks";

/**
 * Returns 6 random tracks from the static tracks.json data,
 * shaped to match the legacy CoreLogic component's expected format.
 *
 * The accessToken parameter is kept for API compatibility but ignored.
 */
const getRandomTracks = async (_accessToken) => {
  // Shape tracks to match the legacy format CoreLogic expects
  const allTracks = tracksData.map((t) => ({
    name: t.trackName,
    artists: [{ name: t.artistName }],
    album: {
      images: [{ url: t.albumArtUrl }],
      name: t.albumName,
    },
    id: t.spotifyTrackId,
    link: t.spotifyLink,
    preview_url: t.preview_url,
    location: t.country,
    description: {
      country: t.country,
      description: t.description,
      link: t.link,
      hint: t.hint,
    },
  }));

  let playedTracks = new Set(
    JSON.parse(localStorage.getItem(PLAYED_TRACKS_KEY) || "[]")
  );

  let availableTracks = allTracks.filter(
    (track) => track.preview_url && !playedTracks.has(track.id)
  );

  if (availableTracks.length < 6) {
    localStorage.removeItem(PLAYED_TRACKS_KEY);
    playedTracks = new Set();
    availableTracks = allTracks.filter((track) => track.preview_url);
  }

  const selectedTracks = [];
  for (let i = 0; i < 6 && availableTracks.length > 0; i++) {
    const trackIndex = Math.floor(Math.random() * availableTracks.length);
    const selectedTrack = availableTracks.splice(trackIndex, 1)[0];
    selectedTracks.push(selectedTrack);
    playedTracks.add(selectedTrack.id);
  }

  localStorage.setItem(PLAYED_TRACKS_KEY, JSON.stringify([...playedTracks]));

  return selectedTracks;
};

export default getRandomTracks;
