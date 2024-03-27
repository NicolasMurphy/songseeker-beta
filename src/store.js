import { create } from 'zustand';

const useStore = create((set) => ({
  // game states
  isCorrectGuess: false,
  isSubmitted: false,
  score: 0,

  // use game states
  setIsCorrectGuess: (isCorrectGuess) => set({ isCorrectGuess }),
  setIsSubmitted: (isSubmitted) => set({ isSubmitted }),
  setScore: (score) => set({ score }),
}));

export default useStore;
