import { PlantCollection } from "../../initialState";

import {
  appendBamboo,
  appendBambooNode,
  appendFlower,
  appendFlowerNode,
  deleteAfterBamboo,
  deleteAtIndexBamboo,
  deleteAtIndexFlower,
  insertBambooNode,
  movePlant,
  popBambooNode,
} from "./utils";

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

export type GardenReducerAction = {
  type: string;
  payload: {
    index?: number;
    nodeIndex?: number;
    direction?: Direction;
    plantName?: PlantName;
    opName?: OpName;
    position?: [number, number, number];
    rotation?: [number, number, number];
  };
};

export default function gardenReducer(
  plantCollection: PlantCollection,
  action: GardenReducerAction
) {
  const { plantName, opName } = action.payload;

  /* GARDEN OPS */
  if (action.type === "gardenOperation") {
    if (opName === OpName.ADDPLANT) {
      // MIGRATED TO gardenStore
      if (plantName === PlantName.FLOWER) {
        return appendFlower(plantCollection, action);
      } else if (plantName === PlantName.BAMBOO) {
        return appendBamboo(plantCollection, action);
      } else {
        throw Error(`No ${opName} handler for ${plantName}`);
      }
    } else if (opName === OpName.DELETE) {
      if (plantName === PlantName.FLOWER) {
        throw Error(`Unimplemented ${opName} for ${plantName}`);
      } else if (plantName === PlantName.BAMBOO) {
        throw Error(`Unimplemented ${opName} for ${plantName}`);
      } else {
        throw Error(`No ${opName} handler for ${plantName}`);
      }
    } else if (opName === OpName.UPDATE) {
      if (plantName === PlantName.FLOWER) {
        throw Error(`Unimplemented ${opName} for ${plantName}`);
      } else if (plantName === PlantName.BAMBOO) {
        throw Error(`Unimplemented ${opName} for ${plantName}`);
      } else {
        throw Error(`No ${opName} handler for ${plantName}`);
      }
    } else {
      throw Error(`No ${opName} handler for plant: ${plantName}`);
    }

    /* PLANT OPS */
  } else if (action.type === "plantOperation") {
    if (opName === OpName.ADDPLANT) {
      if (plantName === PlantName.BAMBOO) {
        return appendBambooNode(plantCollection, action);
      } else if (plantName === PlantName.FLOWER) {
        return appendFlowerNode(plantCollection, action);
      } else {
        throw Error(`No append handler for ${plantName}`);
      }
    } else if (opName === OpName.POP) {
      if (plantName === PlantName.BAMBOO) {
        return popBambooNode(plantCollection, action);
        // throw Error(`to do`)
      } else {
        throw Error(`No pop handler for ${plantName}`);
      }
    } else {
      throw Error(`No ${opName} handler for plant: ${plantName}`);
    }

    /* NODE OPS */
  } else if (action.type === "nodeOperation") {
    if (opName === OpName.DELETEATINDEX) {
      if (plantName === PlantName.BAMBOO) {
        return deleteAtIndexBamboo(plantCollection, action);
      } else if (plantName === PlantName.FLOWER) {
        return deleteAtIndexFlower(plantCollection, action);
      } else {
        throw Error(`No delete @ index handler for ${plantName}`);
      }
    } else if (opName === OpName.INSERT) {
      if (plantName === PlantName.BAMBOO) {
        return insertBambooNode(plantCollection, action);
      } else {
        throw Error(`No insert @ index handler for ${plantName}`);
      }
    } else if (opName === OpName.DELETE) {
      if (plantName === PlantName.BAMBOO) {
        return deleteAfterBamboo(plantCollection, action); // deletes all nodes from that idx on
      } else {
        throw Error(`No insert @ index handler for ${plantName}`);
      }
    } else {
      throw Error(`No ${opName} handler for plant: ${plantName}`);
    }
  } else if (action.type === "movePlant") {
    return movePlant(plantCollection, action);
  } else {
    throw Error(
      `Invalid action type for gardenReducer: no action matches supplied name ${action.type}`
    );
  }
}
