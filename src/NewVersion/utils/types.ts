import { ReactNode } from "react";

export interface Track {
  country: string;
  description: string;
  link: string;
  hint: string;
  preview_url: string;
  trackName: string;
  artistName: string;
  albumName: string;
  albumArtUrl: string;
  spotifyLink: string;
  spotifyTrackId: string;
}

export interface TrackInfoProps {
  track: Track;
}

export interface HintInfoProps {
  track: Track;
  hint: string;
  index: number;
}

export interface AudioPlayerProps {
  src: string;
}

export interface RoundOverProps {
  onPlayAgain: () => void;
  playAgainButtonRef: React.RefObject<HTMLButtonElement>;
}

export interface CompassProps {
  bearings: number[];
  index: number
}

export interface Coordinates {
  0: number;
  1: number;
}

export interface GoogleMapsProviderProps {
  children: ReactNode;
}

export interface StartGameButtonProps {
  setGameStarted: (started: boolean) => void;
}

export interface CountryData {
  country: string;
  population: string | number;
}
