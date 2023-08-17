import { PlantCollection } from "../../Components/GlobalCanvas";
// import { FlattenedGraph, GraphNode } from "../../DataStructures/Graph";
// import { produce } from "immer";
import {
  appendBamboo,
  appendFlower,
  popBamboo,
  deleteAtIndexBamboo,
  deleteAtIndexFlower,
  insertBamboo,
  deleteAfterBamboo,
  movePlant,
} from "./utils";
// import { v4 as v4 } from "uuid";

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export enum PlantName {
  BAMBOO = "bamboo",
  FLOWER = "flower",
  TREE = "tree",
}

export enum OpName {
  APPEND = "append",
  DELETEATINDEX = "deleteAtIndex",
  INSERT = "insert",
  DELETE = "delete",
  POP = "pop",
}

export type GardenReducerAction = {
  type: string;
  payload: {
    index?: number;
    nodeIndex?: number;
    direction?: Direction;
    plantName?: PlantName;
    opName?: OpName;
  };
};

export default function gardenReducer(
  plantCollection: PlantCollection,
  action: GardenReducerAction
) {
  const { plantName, opName } = action.payload;

  /* PLANT OPS */
  if (action.type === "plantOperation") {
    if (opName === OpName.APPEND) {
      if (plantName === PlantName.BAMBOO) {
        return appendBamboo(plantCollection, action);
      } else if (plantName === PlantName.FLOWER) {
        return appendFlower(plantCollection, action);
      } else {
        throw Error(`No append handler for ${plantName}`);
      }
    } else if (opName === OpName.POP) {
      if (plantName === PlantName.BAMBOO) {
        return popBamboo(plantCollection, action);
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
        return insertBamboo(plantCollection, action);
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
