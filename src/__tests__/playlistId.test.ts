import { playlistId } from "../NewVersion/utils/config";

describe("Playlist ID", () => {
  it("should use the actual playlist ID in production", () => {
    const actualPlaylistId = "34fCtmB1IBXo6gZmxAJi2l";

    expect(playlistId).toBe(actualPlaylistId);
  });
});
