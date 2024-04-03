import { create } from "zustand";
import { BambooStalkData, FlowerData, PlantCollection } from "./initialState";
import { initialState } from "./initialState";
import { OpName, PlantName } from "./Hooks/Reducers/gardenReducer";
import {
  deleteAtIdxBamboo,
  deleteAtIdxFlower,
  newBamboo,
  newFlower,
} from "./gardenStoreUtils";

const opMap = {
  [OpName.APPEND]: {
    [PlantName.BAMBOO]: newBamboo,
    [PlantName.FLOWER]: newFlower,
  },
  [OpName.DELETEATINDEX]: {
    [PlantName.BAMBOO]: deleteAtIdxBamboo,
    [PlantName.FLOWER]: deleteAtIdxFlower,
  },
  // [OpName.POP]: {
  //   [PlantName.BAMBOO]: popBamboo
  // }.
  // [OpName.INSERT]: {
  //   [PlantName.BAMBOO]: insertBamboo
  // },
  // [OpName.DELETE]: {
  // [PlantName.BAMBOO]: deleteAfterBamboo
  // }
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
  deleteAtIdx: (
    plantType: PlantName,
    plantIdx: number,
    nodeIdx: number
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

  deleteAtIdx: (plantType, plantIdx, nodeIdx) => {
    // const handler = opMap[OpName.DELETEATINDEX][plantType];

    set(({ plantCollection }) => {
      let newPlant;
      if (plantType === PlantName.BAMBOO) {
        newPlant = deleteAtIdxBamboo(
          plantCollection[plantIdx] as BambooStalkData,
          nodeIdx
        );
      } else {
        newPlant = deleteAtIdxFlower(
          plantCollection[plantIdx] as FlowerData,
          nodeIdx
        );
      }

      const newState = {
        ...plantCollection,
        [plantIdx]: {
          ...plantCollection[plantIdx],
          data: newPlant,
        },
      };

      return { plantCollection: Object.values(newState) as PlantCollection };
    });
  },
}));
