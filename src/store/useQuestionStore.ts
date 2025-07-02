import { create } from "zustand";

interface QuestionState {
  answers: Record<number, string>;
  setAnswer: (id: number, option: string) => void;
  resetAnswers: () => void;
}

export const useQuestionStore = create<QuestionState>((set) => ({
  answers: {},
  setAnswer: (id, option) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [id]: option,
      },
    })),
  resetAnswers: () => set({ answers: {} }),
}));
