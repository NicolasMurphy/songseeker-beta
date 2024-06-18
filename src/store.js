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

    // high scores state
    scores: [],
    error: null,
    loading: true,

    // high scores state setters
    setScores: (scores) => set({ scores }),
    setError: (error) => set({ error }),
    setLoading: (loading) => set({ loading }),
}));

export default useStore;
