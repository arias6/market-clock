import { create } from "zustand";

export type Language = "fa" | "en";

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: "fa",
  setLanguage: (lang) => set({ language: lang }),
}));
