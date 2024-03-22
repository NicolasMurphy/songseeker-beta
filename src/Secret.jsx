import getDescriptionOptions from "./utils/DescriptionOptions";
import { useEffect, useState, useRef } from "react";
import refreshAccessToken from './api/refreshAccessToken';

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
  for (let i = 0; i < 6 && availableTracks.length > 0; i++) {
    const trackIndex = Math.floor(Math.random() * availableTracks.length);
    const selectedTrack = availableTracks.splice(trackIndex, 1)[0];
    selectedTracks.push(selectedTrack);
    playedTracks.add(selectedTrack.id);
  }
  localStorage.setItem(playedTracksKey, JSON.stringify([...playedTracks]));

  return selectedTracks;
};

const Secret = () => {
    const [tracks, setTracks] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
    const [isGameReady, setIsGameReady] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
      const fetchAccessTokenAndTracks = async () => {
        const token = await refreshAccessToken();
        if (token) {
          const fetchedTracks = await getRandomTracks(token);
          setTracks(fetchedTracks);
          setIsGameReady(true);
        }
      };

      fetchAccessTokenAndTracks();
    }, []);

    const handleStartGame = () => {
      setIsGameStarted(true);
      setIsGameReady(false);
      setCurrentTrackIndex(0);
    };

    const handleNextRound = () => {
      setCurrentTrackIndex((prevIndex) =>
        prevIndex + 1 < tracks.length ? prevIndex + 1 : 0
      );
    };

    const handlePlayAgain = () => {
      setIsGameStarted(false);
      setCurrentTrackIndex(-1);
      refreshAccessToken().then((token) => {
        if (token) {
          getRandomTracks(token).then((fetchedTracks) => {
            setTracks(fetchedTracks);
            setIsGameReady(true);
          });
        }
      });
    };

    useEffect(() => {
      if (isGameStarted && currentTrackIndex >= 0 && tracks.length > 0) {
        const currentTrack = tracks[currentTrackIndex];
        if (audioRef.current) {
          audioRef.current.src = currentTrack.preview_url;
          audioRef.current
            .play()
            .catch((e) => console.log("Auto-play failed", e));
        }
      }
    }, [currentTrackIndex, tracks, isGameStarted]);

    return (
      <div className="h-screen">
        {!isGameStarted && isGameReady ? (
          <button onClick={handleStartGame}>Start Game</button>
        ) : null}
        {isGameStarted && (
          <>
            <audio ref={audioRef} controls>
              <source type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            {currentTrackIndex < tracks.length - 1 ? (
              <button onClick={handleNextRound}>Next Round</button>
            ) : (
              <button onClick={handlePlayAgain}>Play Again</button>
            )}
          </>
        )}
        {tracks.map((track, index) => (
          <div
            key={track.id}
            style={{ display: isGameStarted && index === currentTrackIndex ? "block" : "none" }}
          >
            <p>
              {track.name} - {track.location}
            </p>
          </div>
        ))}
      </div>
    );
  };

  export default Secret;
