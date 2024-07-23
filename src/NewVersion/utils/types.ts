import { ReactNode } from "react";

export interface Track {
  name: string;
  preview_url: string;
  artists: Artist[];
  album: Album;
  id: string;
  link: string;
}

export interface Artist {
  name: string;
}

export interface Album {
  images: Image[];
  name: string;
  release_date: string;
}

export interface Image {
  url: string;
}

export interface Description {
  description: string;
  country: string;
  link: string;
  hint: string;
}

export interface TrackInfoProps {
  track: Track;
  description: string;
  link: string;
}

export interface HintInfoProps {
  track: Track;
  hint: string;
}

export interface AudioPlayerProps {
  src: string;
}

export interface RoundOverProps {
  onPlayAgain: () => void;
  playAgainButtonRef: React.RefObject<HTMLButtonElement>;
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
