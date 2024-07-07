export interface Track {
  name: string;
  preview_url: string;
  artists: Artist[];
  album: Album;
}

export interface Artist {
  name: string;
}

export interface Album {
  images: Image[];
}

export interface Image {
  url: string;
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
