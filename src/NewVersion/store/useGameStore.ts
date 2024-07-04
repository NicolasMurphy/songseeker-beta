import { create } from "zustand";
import { INITIAL_SCORE, INITIAL_GUESSES } from "../utils/constants";

type GameState = {
  gameOver: boolean;
  result: string;
  correctAnswer: string;
  score: number;
  guesses: number;
  wrongGuesses: string[];
  setGameOver: (value: boolean) => void;
  setResult: (value: string) => void;
  setCorrectAnswer: (value: string) => void;
  setScore: (value: number) => void;
  setGuesses: (value: number) => void;
  setWrongGuesses: (value: string[]) => void;
  resetGame: () => void;
};

const useGameStore = create<GameState>((set) => ({
  gameOver: false,
  result: "",
  correctAnswer: "",
  score: INITIAL_SCORE,
  guesses: INITIAL_GUESSES,
  wrongGuesses: [],
  setGameOver: (value) => set({ gameOver: value }),
  setResult: (value) => set({ result: value }),
  setCorrectAnswer: (value) => set({ correctAnswer: value }),
  setScore: (value) => set({ score: value }),
  setGuesses: (value) => set({ guesses: value }),
  setWrongGuesses: (value) => set({ wrongGuesses: value }),
  resetGame: () =>
    set({
      gameOver: false,
      result: "",
      correctAnswer: "",
      score: INITIAL_SCORE,
      guesses: INITIAL_GUESSES,
      wrongGuesses: [],
    }),
}));

export default useGameStore;
