import { Track } from "../utils/types";

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

export const fetchAllTracks = async (
  accessToken: string,
  playlistId: string
): Promise<Track[]> => {
  let tracks: Track[] = [];
  let url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`;
  while (url) {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch tracks");
    const data = await response.json();
    tracks = tracks.concat(
      data.items.map((item: any) => ({
        name: item.track.name,
        preview_url: item.track.preview_url,
        artists: item.track.artists.map((artist: any) => ({
          name: artist.name,
        })),
        album: {
          images: item.track.album.images.map((image: any) => ({
            url: image.url,
          })),
          name: item.track.album.name,
          release_date: item.track.album.release_date,
        },
        id: item.track.id,
        link: item.track.external_urls.spotify,
      }))
    );
    url = data.next;
  }
  return tracks;
};
