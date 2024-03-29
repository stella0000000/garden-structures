import { Vector3 } from "three";
import { LinkedList } from "./DataStructures/LinkedList";
import { BambooStalkData, FlowerData } from "./initialState";
import { CircularlyLinkedListFromArray } from "./DataStructures/DoublyCircularlyLinkedList";

export const newBamboo = (
  position: [number, number, number],
  rotation: [number, number, number]
) => {
  return {
    kind: "BambooStalkData",
    data: LinkedList.fromArray([2, 2, 2, 2, 2, 2]),
    position: new Vector3(position[0], position[1], position[2]),
    rotation: new Vector3(rotation[0], rotation[1], rotation[2]),
  } as BambooStalkData;
};

export const newFlower = (
  position: [number, number, number],
  rotation: [number, number, number]
) => {
  return {
    kind: "FlowerData",
    data: CircularlyLinkedListFromArray([2, 2, 2, 2, 2, 2]),
    position: new Vector3(position[0], position[1], position[2]),
    rotation: new Vector3(rotation[0], rotation[1], rotation[2]),
  } as FlowerData;
};
