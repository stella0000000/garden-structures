import { Vector3 } from "three";
import {
  DoublyCircularlyLinkedList,
  CircularlyLinkedListFromArray,
} from "./DataStructures/DoublyCircularlyLinkedList";
import { FlattenedGraph, buildGraph } from "./DataStructures/Graph";
import { LinkedList } from "./DataStructures/LinkedList";

type Transform3D = {
  position: Vector3;
  rotation: Vector3;
};

export type BambooStalk = {
  kind: "BambooStalkData";
  data: LinkedList;
};

export type BambooStalkData = BambooStalk & Transform3D;

export type Flower = {
  kind: "FlowerData";
  data: DoublyCircularlyLinkedList;
};
export type FlowerData = Flower & Transform3D;

export type Constellation = {
  kind: "ConstellationData";
  data: FlattenedGraph;
};

export type ConstellationData = Constellation & Transform3D;

export type PlantCollection = (
  | BambooStalkData
  | FlowerData
  | ConstellationData
)[];

// const testingBamboo: BambooStalkData = {
//   kind: "BambooStalkData",
//   data: LinkedList.fromArray([2, 8, 12, 2]),
//   position: new Vector3(0, 0, 0),
//   rotation: new Vector3(0, 0, 0),
// };

const testingBamboo2: BambooStalkData = {
  kind: "BambooStalkData",
  data: LinkedList.fromArray([4, 6, 8, 2]),
  position: new Vector3(4, 0, 1),
  rotation: new Vector3(0, 0, 0),
};
const testingBamboo3: BambooStalkData = {
  kind: "BambooStalkData",
  data: LinkedList.fromArray([2, 6, 4, 2]),
  position: new Vector3(2, 0, 2),
  rotation: new Vector3(0, 0, 0),
};

// const testingFlower1: FlowerData = {
//   kind: "FlowerData",
//   data: CircularlyLinkedListFromArray([2, 2, 2, 2, 2, 2]),
//   position: new Vector3(12, 4, 2),
//   rotation: new Vector3(0, 0, 0),
// };

const testingConstellation1: ConstellationData = {
  kind: "ConstellationData",
  data: buildGraph().flatten(),
  position: new Vector3(),
  rotation: new Vector3(0, 1.5, 0),
};

export const initialState: PlantCollection = [
  // testingBamboo,
  testingBamboo2,
  testingBamboo3,
  // testingFlower1,
  testingConstellation1,
];
