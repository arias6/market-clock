import { create } from "zustand";

interface MarketOverlapState {
  selectedMarkets: string[];
  toggleMarket: (marketId: string) => void;
  selectAll: (allIds: string[]) => void;
  selectNone: () => void;
}

export const useMarketOverlapStore = create<MarketOverlapState>((set) => ({
  selectedMarkets: [],
  toggleMarket: (marketId: string) =>
    set((state) => ({
      selectedMarkets: state.selectedMarkets.includes(marketId)
        ? state.selectedMarkets.filter((id) => id !== marketId)
        : [...state.selectedMarkets, marketId],
    })),
  selectAll: (allIds: string[]) => set({ selectedMarkets: allIds }),
  selectNone: () => set({ selectedMarkets: [] }),
}));
