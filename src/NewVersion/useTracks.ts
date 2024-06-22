import { useState, useEffect } from "react";
import { refreshAccessToken, fetchAllTracks } from "./api";

interface Track {
  name: string;
  preview_url: string;
}

const useTracks = (): { tracks: Track[]; loading: boolean } => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAccessTokenAndTracks = async () => {
      const token = await refreshAccessToken();
      if (token) {
        try {
          const fetchedTracks = await fetchAllTracks(token);
          setTracks(fetchedTracks);
        } catch (error) {
          console.error("Error fetching tracks:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchAccessTokenAndTracks();
  }, []);

  return { tracks, loading };
};

export default useTracks;
