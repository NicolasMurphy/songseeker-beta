import { useState, useEffect } from "react";

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const response = await fetch("/api/getAccessToken");

    if (response.ok) {
      const data = await response.json();
      return data.access_token;
    } else {
      console.error("Error refreshing access token:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
};

interface Track {
  name: string;
  preview_url: string;
}

const fetchAllTracks = async (accessToken: string): Promise<Track[]> => {
  let tracks: Track[] = [];
  let url = `https://api.spotify.com/v1/playlists/34fCtmB1IBXo6gZmxAJi2l/tracks?limit=100`;
  while (url) {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch tracks");
    const data = await response.json();
    tracks = tracks.concat(data.items.map((item: any) => item.track));
    url = data.next;
  }
  return tracks;
};

const fetchAccessTokenAndTracks = async (
  setTracks: React.Dispatch<React.SetStateAction<Track[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
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
