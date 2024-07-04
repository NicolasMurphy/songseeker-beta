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

export type GameOverProps = {
  result: string;
  correctAnswer: string;
  score: number;
  onPlayAgain: () => void;
  playAgainButtonRef: React.RefObject<HTMLButtonElement>;
};
