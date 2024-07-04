import { create } from 'zustand';
import { INITIAL_SCORE } from '../utils/constants';

type GameState = {
  gameOver: boolean;
  result: string;
  correctAnswer: string;
  score: number;
  setGameOver: (value: boolean) => void;
  setResult: (value: string) => void;
  setCorrectAnswer: (value: string) => void;
  setScore: (value: number) => void;
  resetGame: () => void;
};

const useGameStore = create<GameState>((set) => ({
  gameOver: false,
  result: '',
  correctAnswer: '',
  score: INITIAL_SCORE,
  setGameOver: (value) => set({ gameOver: value }),
  setResult: (value) => set({ result: value }),
  setCorrectAnswer: (value) => set({ correctAnswer: value }),
  setScore: (value) => set({ score: value }),
  resetGame: () =>
    set({
      gameOver: false,
      result: '',
      correctAnswer: '',
      score: INITIAL_SCORE,
    }),
}));

export default useGameStore;
