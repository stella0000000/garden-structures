import { Vector3 } from "three";
import {
  DoublyCircularlyLinkedList,
  CircularlyLinkedListFromArray,
} from "./DataStructures/DoublyCircularlyLinkedList";
import { FlattenedGraph, buildGraph } from "./DataStructures/Graph";
import { LinkedList } from "./DataStructures/LinkedList";

type BaseData = {
  _id: string;
  position: Vector3;
  rotation: Vector3;
};

export type BambooStalk = {
  kind: "bamboo";
  data: LinkedList;
};

export type BambooStalkData = BambooStalk & BaseData;

export type Flower = {
  kind: "flower";
  data: DoublyCircularlyLinkedList;
};
export type FlowerData = Flower & BaseData;

export type Constellation = {
  kind: "constellation";
  data: FlattenedGraph;
};

export type ConstellationData = Constellation & BaseData;

export type PlantCollection = (
  | BambooStalkData
  | FlowerData
  | ConstellationData
)[];

const testingBamboo: BambooStalkData = {
  _id: "superbamboo1",
  kind: "bamboo",
  data: LinkedList.fromArray([2, 8, 12, 2]),
  position: new Vector3(0, 0, 0),
  rotation: new Vector3(0, 0, 0),
};

const testingBamboo2: BambooStalkData = {
  _id: "ultimatekingherobamboo2",
  kind: "bamboo",
  data: LinkedList.fromArray([4, 6, 8, 2]),
  position: new Vector3(4, 0, 1),
  rotation: new Vector3(0, 0, 0),
};
const testingBamboo3: BambooStalkData = {
  _id: "lightningbamboo3",
  kind: "bamboo",
  data: LinkedList.fromArray([2, 6, 4, 2]),
  position: new Vector3(2, 0, 2),
  rotation: new Vector3(0, 0, 0),
};

const testingFlower1: FlowerData = {
  _id: "prettyflower1",
  kind: "flower",
  data: CircularlyLinkedListFromArray([2, 2, 2, 2, 2, 2]),
  position: new Vector3(12, 4, 2),
  rotation: new Vector3(0, 0, 0),
};

const testingConstellation1: ConstellationData = {
  _id: "dangerousflower2",
  kind: "constellation",
  data: buildGraph().flatten(),
  position: new Vector3(),
  rotation: new Vector3(0, 1.5, 0),
};

export const initialState: PlantCollection = [
  testingBamboo,
  testingBamboo2,
  testingBamboo3,
  testingFlower1,
  testingConstellation1,
];
