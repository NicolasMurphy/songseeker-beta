export interface Artist {
  name: string;
}

export interface Track {
  name: string;
  preview_url: string;
  artists: Artist[];
}

export interface Description {
  description: string;
  country: string;
  link: string;
}

export interface AudioPlayerProps {
  src: string;
}

export interface GameOverProps {
  onPlayAgain: () => void;
  playAgainButtonRef: React.RefObject<HTMLButtonElement>;
}