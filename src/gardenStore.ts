import { create } from "zustand";

interface StoreState {
  activePlant: number;
  setActivePlant: (num: number) => void;
  deselectAllPlants: () => void;
}

export const useGardenStore = create<StoreState>((set) => ({
  activePlant: -1,
  setActivePlant: (idx: number) => set(() => ({ activePlant: idx })),
  deselectAllPlants: () => set(() => ({ activePlant: -1 })),
}));
