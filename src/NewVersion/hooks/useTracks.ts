import { useState, useEffect, useCallback } from "react";
import { refreshAccessToken, fetchAllTracks } from "../api/api";
import { Track } from "../utils/types";
import { playlistId } from "../utils/config";
import { ROUNDS } from "../utils/constants";

const PLAYED_TRACKS_KEY = `playedTracks_${playlistId}`;

const useTracks = (): {
  tracks: Track[];
  loading: boolean;
  error: string | null;
  trackIndices: number[];
  refetchTracks: () => void;
} => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [trackIndices, setTrackIndices] = useState<number[]>([]);

  const fetchTracks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await refreshAccessToken();
      if (token) {
        const fetchedTracks = await fetchAllTracks(token, playlistId);
        const validTracks = fetchedTracks.filter((track) => {
          if (!track.preview_url) {
            console.log(
              `Track without preview URL: ${track.name} by ${track.artists
                .map((artist) => artist.name)
                .join(", ")}`
            );
            return false;
          }
          return true;
        });
        setTracks(validTracks);

        const playedTracksFromStorage = localStorage.getItem(PLAYED_TRACKS_KEY);
        let playedTracks: Set<string>;
        if (playedTracksFromStorage) {
          playedTracks = new Set(JSON.parse(playedTracksFromStorage));
        } else {
          playedTracks = new Set();
          localStorage.setItem(PLAYED_TRACKS_KEY, JSON.stringify([]));
        }

        if (playedTracks.size >= validTracks.length) {
          playedTracks.clear();
          localStorage.setItem(PLAYED_TRACKS_KEY, JSON.stringify([]));
          console.log("All tracks have been played. Resetting played tracks.");
        }

        const indices: number[] = [];
        while (indices.length < ROUNDS && indices.length < validTracks.length) {
          const randomIndex = Math.floor(Math.random() * validTracks.length);
          if (
            !indices.includes(randomIndex) &&
            !playedTracks.has(validTracks[randomIndex].id)
          ) {
            indices.push(randomIndex);
          }
        }

        indices.forEach((index) => playedTracks.add(validTracks[index].id));
        console.log(validTracks);
        localStorage.setItem(
          PLAYED_TRACKS_KEY,
          JSON.stringify([...playedTracks])
        );

        setTrackIndices(indices);
      } else {
        setError("Failed to refresh access token.");
      }
    } catch (err) {
      console.error("Error fetching tracks:", err);
      setError("Failed to fetch tracks.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]);

  const refetchTracks = () => {
    fetchTracks();
  };

  return { tracks, loading, error, trackIndices, refetchTracks };
};

export default useTracks;
