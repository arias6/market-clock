import { create } from "zustand";

interface TimeState {
  now: Date | null;
  start: () => () => void;
}

export const useTimeStore = create<TimeState>((set) => ({
  now: null,
  start: () => {
    if (typeof window === "undefined") return () => {};
    set({ now: new Date() });
    const interval = setInterval(() => {
      set({ now: new Date() });
    }, 1000);
    return () => clearInterval(interval);
  },
}));