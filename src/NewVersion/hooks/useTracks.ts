import { useState, useEffect, useCallback } from "react";
import { Track } from "../utils/types";
import { ROUNDS } from "../utils/constants";
import tracksData from "../../data/tracks.json";

const PLAYED_TRACKS_KEY = "playedTracks";

const useTracks = (): {
  tracks: Track[];
  loading: boolean;
  error: string | null;
  trackIndices: number[];
  refetchTracks: () => void;
} => {
  const [tracks] = useState<Track[]>(tracksData as Track[]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error] = useState<string | null>(null);
  const [trackIndices, setTrackIndices] = useState<number[]>([]);

  const selectTracks = useCallback(() => {
    setLoading(true);

    let playedTracks = new Set<string>();
    const playedTracksFromStorage = localStorage.getItem(PLAYED_TRACKS_KEY);

    if (playedTracksFromStorage) {
      playedTracks = new Set(JSON.parse(playedTracksFromStorage));
    }

    if (playedTracks.size >= tracks.length) {
      playedTracks.clear();
      localStorage.setItem(PLAYED_TRACKS_KEY, JSON.stringify([]));
    }

    const availableTrackIndices = tracks
      .map((_, index) => index)
      .filter((index) => !playedTracks.has(tracks[index].spotifyTrackId));

    if (availableTrackIndices.length < ROUNDS) {
      playedTracks.clear();
      localStorage.setItem(PLAYED_TRACKS_KEY, JSON.stringify([]));
      availableTrackIndices.push(...tracks.map((_, index) => index));
    }

    const indices: number[] = [];
    while (indices.length < ROUNDS && availableTrackIndices.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * availableTrackIndices.length
      );
      const selectedIndex = availableTrackIndices.splice(randomIndex, 1)[0];
      indices.push(selectedIndex);
      playedTracks.add(tracks[selectedIndex].spotifyTrackId);
    }

    localStorage.setItem(
      PLAYED_TRACKS_KEY,
      JSON.stringify([...playedTracks])
    );
    setTrackIndices(indices);
    setLoading(false);
  }, [tracks]);

  useEffect(() => {
    selectTracks();
  }, [selectTracks]);

  const refetchTracks = () => {
    selectTracks();
  };

  return { tracks, loading, error, trackIndices, refetchTracks };
};

export default useTracks;
