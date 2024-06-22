export const refreshAccessToken = async (): Promise<string | null> => {
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

  export const fetchAllTracks = async (accessToken: string): Promise<Track[]> => {
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
