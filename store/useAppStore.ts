import { create } from "zustand";

type AppState = {
  category: "movie" | "series" | null;
  setCategory: (value: "movie" | "series") => void;
};

export const useAppStore = create<AppState>((set) => ({
  category: null,
  setCategory: (value) => set({ category: value }),
}));
