import { create } from 'zustand';
import { INITIAL_SCORE, INITIAL_GUESSES } from '../utils/constants';

type State = {
  gameOver: boolean;
  result: string;
  correctAnswer: string;
  score: number;
  guesses: number;
  wrongGuesses: string[];
  inputValue: string;
  suggestions: string[];
  highlightedSuggestion: string | null;
  isInputClicked: boolean;
  availableCountries: string[];
  randomIndex: number | null;
  selectedCountry: string;
  setGameOver: (value: boolean) => void;
  setResult: (value: string) => void;
  setCorrectAnswer: (value: string) => void;
  setScore: (value: number) => void;
  setGuesses: (value: number) => void;
  setWrongGuesses: (value: string[]) => void;
  setInputValue: (value: string) => void;
  setSuggestions: (value: string[]) => void;
  setHighlightedSuggestion: (value: string | null) => void;
  setIsInputClicked: (value: boolean) => void;
  setAvailableCountries: (value: string[] | ((prev: string[]) => string[])) => void;
  setRandomIndex: (value: number | null) => void;
  setSelectedCountry: (value: string) => void;
  resetGame: () => void;
};

const useStore = create<State>((set) => ({
  gameOver: false,
  result: '',
  correctAnswer: '',
  score: INITIAL_SCORE,
  guesses: INITIAL_GUESSES,
  wrongGuesses: [],
  inputValue: '',
  suggestions: [],
  highlightedSuggestion: null,
  isInputClicked: false,
  availableCountries: [],
  randomIndex: null,
  selectedCountry: '',
  setGameOver: (value) => set({ gameOver: value }),
  setResult: (value) => set({ result: value }),
  setCorrectAnswer: (value) => set({ correctAnswer: value }),
  setScore: (value) => set({ score: value }),
  setGuesses: (value) => set({ guesses: value }),
  setWrongGuesses: (value) => set({ wrongGuesses: value }),
  setInputValue: (value) => set({ inputValue: value }),
  setSuggestions: (value) => set({ suggestions: value }),
  setHighlightedSuggestion: (value) => set({ highlightedSuggestion: value }),
  setIsInputClicked: (value) => set({ isInputClicked: value }),
  setAvailableCountries: (value) => set((state) => ({
    availableCountries: typeof value === 'function' ? value(state.availableCountries) : value
  })),
  setRandomIndex: (value) => set({ randomIndex: value }),
  setSelectedCountry: (value) => set({ selectedCountry: value }),
  resetGame: () => set({
    gameOver: false,
    result: '',
    correctAnswer: '',
    score: INITIAL_SCORE,
    guesses: INITIAL_GUESSES,
    wrongGuesses: [],
    inputValue: '',
    suggestions: [],
    highlightedSuggestion: null,
    isInputClicked: false,
    availableCountries: [],
    randomIndex: null,
  }),
}));

export default useStore;
