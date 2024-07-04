import { useState, useEffect } from "react";
import { refreshAccessToken, fetchAllTracks } from "../api/api";
import { Track } from "../utils/types";
import { playlistId } from "../utils/config";

const useTracks = (): { tracks: Track[]; loading: boolean; error: string | null } => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessTokenAndTracks = async () => {
      const token = await refreshAccessToken();
      if (token) {
        try {
          const fetchedTracks = await fetchAllTracks(token, playlistId);
          setTracks(fetchedTracks);
        } catch (err) {
          console.error("Error fetching tracks:", err);
          setError("Failed to fetch tracks.");
        } finally {
          setLoading(false);
        }
      } else {
        setError("Failed to refresh access token.");
        setLoading(false);
      }
    };

    fetchAccessTokenAndTracks();
  }, []);

  return { tracks, loading, error };
};

export default useTracks;
