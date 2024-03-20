import { create } from "zustand";
import { PlantCollection } from "./initialState";
import { initialState } from "./initialState";
import { OpName, PlantName } from "./Hooks/Reducers/gardenReducer";
import { newBamboo, newFlower } from "./gardenStoreUtils";

const opMap = {
  [OpName.APPEND]: {
    [PlantName.BAMBOO]: newBamboo,
    [PlantName.FLOWER]: newFlower,
  },
};

interface StoreState {
  activePlant: number;
  setActivePlant: (num: number) => void;
  deselectAllPlants: () => void;
  isDataMode: boolean;
  setIsDataMode: (arg: boolean) => void;
  plantCollection: PlantCollection;

  appendPlant: (
    plantType: PlantName,
    position: [number, number, number],
    rotation: [number, number, number]
  ) => void;
}

export const useGardenStore = create<StoreState>((set) => ({
  activePlant: -1,
  setActivePlant: (idx: number) => set(() => ({ activePlant: idx })),
  deselectAllPlants: () => set(() => ({ activePlant: -1 })),
  isDataMode: false,
  setIsDataMode: (arg: boolean) => set(() => ({ isDataMode: arg })),

  plantCollection: initialState,

  appendPlant: (plantType, position, rotation) => {
    const handler = opMap[OpName.APPEND][plantType];

    set(({ plantCollection }) => ({
      plantCollection: [...plantCollection, handler(position, rotation)],
    }));
  },
}));
