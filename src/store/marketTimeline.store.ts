import { create } from "zustand";

interface MarketTimelineState {
  selectedHour: number | null;
  setSelectedHour: (hour: number | null) => void;
}

export const useMarketTimelineStore = create<MarketTimelineState>((set) => ({
  selectedHour: null,
  setSelectedHour: (hour) => set({ selectedHour: hour }),
}));
