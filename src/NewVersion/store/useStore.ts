import { create } from "zustand";
import { INITIAL_SCORE, INITIAL_GUESSES } from "../utils/constants";

type State = {
  gameOver: boolean;
  gameScore: number;
  round: number;
  roundOver: boolean;
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
  selectedCountry: string;
  distances: number[];
  bearings: number[];
  setGameOver: (value: boolean) => void;
  setGameScore: (value: number) => void;
  setRound: (value: number) => void;
  setRoundOver: (value: boolean) => void;
  setResult: (value: string) => void;
  setCorrectAnswer: (value: string) => void;
  setScore: (value: number) => void;
  setGuesses: (value: number) => void;
  setWrongGuesses: (value: string[]) => void;
  setInputValue: (value: string) => void;
  setSuggestions: (value: string[]) => void;
  setHighlightedSuggestion: (value: string | null) => void;
  setIsInputClicked: (value: boolean) => void;
  setAvailableCountries: (
    value: string[] | ((prev: string[]) => string[])
  ) => void;
  setSelectedCountry: (value: string) => void;
  setDistances: (value: number[]) => void;
  setBearings: (value: number[]) => void;
  resetRound: () => void;
  resetGame: () => void;
};

const useStore = create<State>((set, get) => ({
  gameOver: false,
  gameScore: 0,
  round: 1,
  roundOver: false,
  result: "",
  correctAnswer: "",
  score: INITIAL_SCORE,
  guesses: INITIAL_GUESSES,
  wrongGuesses: [],
  inputValue: "",
  suggestions: [],
  highlightedSuggestion: null,
  isInputClicked: false,
  availableCountries: [],
  selectedCountry: "",
  distances: [],
  bearings: [],
  setGameOver: (value) => set({ gameOver: value }),
  setGameScore: (value) => set({ gameScore: value }),
  setRound: (value) => set({ round: value }),
  setRoundOver: (value) => set({ roundOver: value }),
  setResult: (value) => set({ result: value }),
  setCorrectAnswer: (value) => set({ correctAnswer: value }),
  setScore: (value) => set({ score: value }),
  setGuesses: (value) => set({ guesses: value }),
  setWrongGuesses: (value) => set({ wrongGuesses: value }),
  setInputValue: (value) => set({ inputValue: value }),
  setSuggestions: (value) => set({ suggestions: value }),
  setHighlightedSuggestion: (value) => set({ highlightedSuggestion: value }),
  setIsInputClicked: (value) => set({ isInputClicked: value }),
  setAvailableCountries: (value) =>
    set((state) => ({
      availableCountries:
        typeof value === "function" ? value(state.availableCountries) : value,
    })),
  setSelectedCountry: (value) => set({ selectedCountry: value }),
  setDistances: (value) => set({ distances: value }),
  setBearings: (value) => set({ bearings: value }),
  resetRound: () =>
    set({
      roundOver: false,
      result: "",
      correctAnswer: "",
      score: INITIAL_SCORE,
      guesses: INITIAL_GUESSES,
      wrongGuesses: [],
      inputValue: "",
      suggestions: [],
      highlightedSuggestion: null,
      isInputClicked: false,
      availableCountries: [],
      distances: [],
      bearings: [],
    }),
  resetGame: () => {
    set({
      gameOver: false,
      gameScore: 0,
      round: 1,
    });
    get().resetRound();
  },
}));

export default useStore;
