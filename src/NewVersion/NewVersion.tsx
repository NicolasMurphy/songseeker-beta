import { useState, useEffect } from "react";
import { refreshAccessToken, fetchAllTracks } from "./api"; // Adjust the path as needed

interface Track {
  name: string;
  preview_url: string;
}

const fetchAccessTokenAndTracks = async (setTracks: React.Dispatch<React.SetStateAction<Track[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
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

const NewVersion: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAccessTokenAndTracks(setTracks, setLoading);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (tracks.length === 0) {
    return <div>No tracks available</div>;
  }

  return (
    <div className="custom-player">
      <audio controls preload="auto">
        <source src={tracks[1].preview_url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default NewVersion;
