import { create } from "zustand";
import { BambooStalkData, FlowerData, PlantCollection } from "./initialState";
import { initialState } from "./initialState";
import {
  deleteAtIdxBamboo,
  deleteAtIdxFlower,
  newBamboo,
  newFlower,
  appendNodeFlower,
  appendNodeBamboo,
  deleteAfterNodeBamboo,
  popBamboo,
  insertNodeBamboo,
  getGardenWithMovedPlant,
  // deleteAfterNodeFlower,
} from "./gardenStoreUtils";

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export enum PlantName {
  BAMBOO = "bamboo",
  FLOWER = "flower",
  // TREE = "tree",
}

export enum OpName {
  ADDPLANT = "addPlant",
  APPEND = "appendNode",
  DELETEATINDEX = "deleteAtIndex",
  INSERT = "insert",
  DELETE = "delete",
  POP = "pop",
  UPDATE = "update",
}

const opMap = {
  [OpName.ADDPLANT]: {
    [PlantName.BAMBOO]: newBamboo,
    [PlantName.FLOWER]: newFlower,
  },
  [OpName.DELETEATINDEX]: {
    [PlantName.BAMBOO]: deleteAtIdxBamboo,
    [PlantName.FLOWER]: deleteAtIdxFlower,
  },
};

interface StoreState {
  instructionsVisible: boolean;
  setInstructionsVisible: (arg: boolean) => void;

  ghostType: PlantName | undefined;
  setGhostType: (arg: PlantName | undefined) => void;

  isPointerLock: boolean;
  setIsPointerLock: (arg: boolean) => void;

  menuOpen: boolean;
  setMenuOpen: (arg: boolean) => void;

  activePlant: number;
  setActivePlant: (num: number) => void;
  deselectAllPlants: () => void;

  activeNode: number;
  setActiveNode: (num: number) => void;
  deselectAllNodes: () => void;

  isDataMode: boolean;
  setIsDataMode: (arg: boolean) => void;
  plantCollection: PlantCollection;

  movePlant: (plantIdx: number, direction: Direction) => void;

  addPlant: (
    plantType: PlantName,
    position: [number, number, number],
    rotation: [number, number, number]
  ) => void;

  deleteAfterNode: (plantIdx: number, nodeIdx: number) => void;

  insertNode: (plantIdx: number, nodeIdx: number) => void;

  popNode: (plantIdx: number) => void;

  appendNode: (plantType: PlantName, plantIdx: number) => void;

  deleteAtIdx: (
    plantType: PlantName,
    plantIdx: number,
    nodeIdx: number
  ) => void;
}

export const useGardenStore = create<StoreState>((set) => ({
  instructionsVisible: true,
  setInstructionsVisible: (arg) => set(() => ({ instructionsVisible: arg })),

  isPointerLock: false,
  setIsPointerLock: (arg) => set(() => ({ isPointerLock: arg })),

  menuOpen: false,
  setMenuOpen: (arg) => set(() => ({ menuOpen: arg })),

  ghostType: undefined,
  setGhostType: (arg) => set(() => ({ ghostType: arg })),

  activePlant: -1,
  setActivePlant: (idx) =>
    set(() => ({ activePlant: idx, isPointerLock: idx !== -1 && false })),
  deselectAllPlants: () => set(() => ({ activePlant: -1 })),

  activeNode: -1,
  setActiveNode: (idx) =>
    set(() => ({ activeNode: idx, isPointerLock: idx !== -1 && false })),
  deselectAllNodes: () => set(() => ({ activeNode: -1 })),

  isDataMode: false,
  setIsDataMode: (arg) => set(() => ({ isDataMode: arg })),

  plantCollection: initialState,

  movePlant: (plantIdx, direction) => {
    set(({ plantCollection }) => {
      const newPlantCollection = getGardenWithMovedPlant(
        plantCollection,
        plantIdx,
        direction
      );

      return {
        plantCollection: newPlantCollection,
      };
    });
  },

  addPlant: (plantType, position, rotation) => {
    const handler = opMap[OpName.ADDPLANT][plantType];

    set(({ plantCollection }) => ({
      plantCollection: [...plantCollection, handler(position, rotation)],
    }));
  },

  popNode: (plantIdx) => {
    set(({ plantCollection }) => {
      const newPlant = popBamboo(plantCollection[plantIdx] as BambooStalkData);

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

  insertNode: (plantIdx, nodeIdx) => {
    set(({ plantCollection }) => {
      const newPlant = insertNodeBamboo(
        plantCollection[plantIdx] as BambooStalkData,
        nodeIdx
      );

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

  // BAMBOO ONLY
  deleteAfterNode: (plantIdx, nodeIdx) => {
    set(({ plantCollection }) => {
      const newPlant = deleteAfterNodeBamboo(
        plantCollection[plantIdx] as BambooStalkData,
        nodeIdx
      );

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

  appendNode: (plantType, plantIdx) => {
    set(({ plantCollection }) => {
      let newPlant;
      if (plantType === PlantName.BAMBOO) {
        newPlant = appendNodeBamboo(
          plantCollection[plantIdx] as BambooStalkData
        );
      } else {
        newPlant = appendNodeFlower(plantCollection[plantIdx] as FlowerData);
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

  deleteAtIdx: (plantType, plantIdx, nodeIdx) => {
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
