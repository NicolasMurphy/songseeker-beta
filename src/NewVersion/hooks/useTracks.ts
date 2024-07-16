import { useState, useEffect, useCallback } from "react";
import { refreshAccessToken, fetchAllTracks } from "../api/api";
import { Track } from "../utils/types";
import { playlistId } from "../utils/config";
import { ROUNDS } from "../utils/constants";

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
        setTracks(fetchedTracks);

        const indices: number[] = [];
        while (indices.length < ROUNDS && indices.length < fetchedTracks.length) {
          const randomIndex = Math.floor(Math.random() * fetchedTracks.length);
          if (!indices.includes(randomIndex)) {
            indices.push(randomIndex);
          }
        }
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
