import { create } from 'zustand';

const useStore = create((set) => ({
  isCorrectGuess: false,
  setIsCorrectGuess: (isCorrectGuess) => set({ isCorrectGuess }),
  isSubmitted: false,
  setIsSubmitted: (isSubmitted) => set({ isSubmitted }),
}));

export default useStore;
