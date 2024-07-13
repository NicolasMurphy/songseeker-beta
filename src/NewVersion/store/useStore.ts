import { create } from "zustand";
import { INITIAL_SCORE, INITIAL_GUESSES } from "../utils/constants";

type State = {
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
  randomIndex: number | null;
  selectedCountry: string;
  distances: number[];
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
  setRandomIndex: (value: number | null) => void;
  setSelectedCountry: (value: string) => void;
  setDistances: (value: number[]) => void;
  resetRound: () => void;
};

const useStore = create<State>((set) => ({
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
  randomIndex: null,
  selectedCountry: "",
  distances: [],
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
  setRandomIndex: (value) => set({ randomIndex: value }),
  setSelectedCountry: (value) => set({ selectedCountry: value }),
  setDistances: (value) => set({ distances: value }),
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
      randomIndex: null,
      distances: [],
    }),
}));

export default useStore;
