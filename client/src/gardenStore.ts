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
  movePlantUtil,
  // getGardenWithMovedPlant,
  // deleteAfterNodeFlower,
} from "./gardenStoreUtils";
import { Vector3 } from "three";

// export enum Direction {
//   UP,
//   DOWN,
//   LEFT,
//   RIGHT,
// }

export const newBambooVals = [3];

export enum PlantName {
  BAMBOO = "bamboo",
  FLOWER = "flower",
  // CONSTELLATION = "constellation",
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

export enum MenuMode {
  INTRO = "intro",
  MAIN = "main",
  PLANT = "plant",
  NONE = "none",
}

const opMap = {
  [OpName.ADDPLANT]: {
    [PlantName.BAMBOO]: newBamboo,
    [PlantName.FLOWER]: newFlower,
    // [PlantName.CONSTELLATION]: () => {
    //   console.log("not yet implemented");
    // },
  },
  [OpName.DELETEATINDEX]: {
    [PlantName.BAMBOO]: deleteAtIdxBamboo,
    [PlantName.FLOWER]: deleteAtIdxFlower,
    // [PlantName.CONSTELLATION]: () => {
    //   console.log("not yet implemented");
    // },
  },
};

interface StoreState {
  menuMode: MenuMode;
  setMenuMode: (arg: MenuMode) => void;

  ghostType: PlantName | undefined;
  setGhostType: (arg: PlantName | undefined) => void;

  isPointerLock: boolean;
  setIsPointerLock: (arg: boolean) => void;

  activePlant: number;
  setActivePlant: (num: number) => void;
  deselectAllPlants: () => void;

  activeNode: number;
  setActiveNode: (num: number) => void;
  deselectAllNodes: () => void;

  isDataMode: boolean;
  setIsDataMode: (arg: boolean) => void;

  isMoveMode: boolean;
  setIsMoveMode: (arg: boolean) => void;

  plantCollection: PlantCollection;
  setPlantCollection: (allPlants: PlantCollection) => void;

  movePlant: (plantIdx: number, newPosition: Vector3) => void;

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
  menuMode: MenuMode.INTRO,
  setMenuMode: (arg) => set(() => ({ menuMode: arg })),

  isPointerLock: false,
  setIsPointerLock: (arg) => set(() => ({ isPointerLock: arg })),

  ghostType: undefined,
  setGhostType: (arg) => set(() => ({ ghostType: arg })),

  activePlant: -1,
  setActivePlant: (idx) =>
    set(() => ({ activePlant: idx, isPointerLock: idx !== -1 && false })),
  deselectAllPlants: () => set(() => ({ activePlant: -1 })),

  activeNode: -1,
  setActiveNode: (idx) =>
    set(() => ({ activeNode: idx, isPointerLock: idx !== -1 && false })),
  deselectAllNodes: () => {
    set(() => ({ activeNode: -1 }));
  },

  isDataMode: false,
  setIsDataMode: (arg) => set(() => ({ isDataMode: arg })),

  isMoveMode: false,
  setIsMoveMode: (arg) => set(() => ({ isMoveMode: arg })),

  plantCollection: initialState,
  setPlantCollection: (allPlants) => set({ plantCollection: allPlants }),

  // movePlant: (plantIdx, direction) => {
  //   set(({ plantCollection }) => {
  //     const newPlantCollection = getGardenWithMovedPlant(
  //       plantCollection,
  //       plantIdx,
  //       direction
  //     );

  //     return {
  //       plantCollection: newPlantCollection,
  //     };
  //   });
  // },

  movePlant: (plantIdx, newPosition) => {
    set(({ plantCollection }) => {
      const newPlantCollection = movePlantUtil(
        plantCollection,
        plantIdx,
        newPosition
      );
      return { plantCollection: newPlantCollection };
    });
  },

  addPlant: (plantType, position, rotation) => {
    const handler = opMap[OpName.ADDPLANT][plantType];

    // API CALL??

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
      const newPlant =
        plantType === PlantName.BAMBOO
          ? appendNodeBamboo(plantCollection[plantIdx] as BambooStalkData)
          : appendNodeFlower(plantCollection[plantIdx] as FlowerData);

      // Convert to arrays for DB
      const DBArray = newPlant.intoArray();
      console.log(DBArray);
      // something like this
      // fetch(`/plants/set/${plantIdx}`)

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
    set(({ plantCollection, activeNode }) => {
      let newPlant;
      let newActiveNode = activeNode;
      if (plantType === PlantName.BAMBOO) {
        const plant = plantCollection[plantIdx] as BambooStalkData;

        if (nodeIdx === plant.data.intoArray().length - 1) {
          newActiveNode = plant.data.intoArray().length - 2;
        }

        newPlant = deleteAtIdxBamboo(
          plantCollection[plantIdx] as BambooStalkData,
          nodeIdx
        );
      } else {
        const plant = plantCollection[plantIdx] as FlowerData;

        if (nodeIdx === plant.data.intoArray().length - 1) {
          newActiveNode = plant.data.intoArray().length - 2;
        }

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

      return {
        plantCollection: Object.values(newState) as PlantCollection,
        activeNode: newActiveNode,
      };
    });
  },
}));
