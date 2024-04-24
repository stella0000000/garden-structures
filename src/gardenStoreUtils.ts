import { Vector3 } from "three";
import { LinkedList } from "./DataStructures/LinkedList";
import { BambooStalkData, FlowerData } from "./initialState";
import {
  CircularlyLinkedListFromArray,
  DoublyCircularlyLinkedList,
} from "./DataStructures/DoublyCircularlyLinkedList";

export const popBamboo = (bamboo: BambooStalkData) => {
  const oldBambooData = bamboo.data as LinkedList;
  const newLinkedList = oldBambooData.clone();
  newLinkedList.pop();

  return newLinkedList;
};

export const deleteAfterNodeBamboo = (
  bamboo: BambooStalkData,
  nodeIdx: number
) => {
  const oldBambooData = bamboo.data as LinkedList;
  const newLinkedList = oldBambooData.clone();
  newLinkedList.delete(nodeIdx);

  return newLinkedList;
};

export const insertNodeBamboo = (bamboo: BambooStalkData, nodeIdx: number) => {
  const oldBambooData = bamboo.data as LinkedList;
  const newLinkedList = oldBambooData.clone();
  newLinkedList.insertAtIndex(nodeIdx, Math.random() * 10);

  return newLinkedList;
};

export const appendNodeBamboo = (bamboo: BambooStalkData) => {
  const oldBambooData = bamboo.data as LinkedList;
  const newLinkedList = oldBambooData.clone();
  newLinkedList.append(Math.round(Math.random() * 10));

  return newLinkedList;
};

export const appendNodeFlower = (flower: FlowerData) => {
  const oldFlowerData = flower.data as DoublyCircularlyLinkedList;
  const newDoublyCircularlyLinkedList = oldFlowerData.clone();
  newDoublyCircularlyLinkedList.append(2);

  return newDoublyCircularlyLinkedList;
};

export const deleteAtIdxBamboo = (bamboo: BambooStalkData, nodeIdx: number) => {
  const oldBambooData = bamboo.data as LinkedList;
  const newLinkedList = oldBambooData.clone();
  newLinkedList.deleteAtIndex(nodeIdx);

  return newLinkedList;
};

export const deleteAtIdxFlower = (flower: FlowerData, nodeIdx: number) => {
  const oldFlowerData = flower.data as DoublyCircularlyLinkedList;
  const newDoublyCircularlyLinkedList = oldFlowerData.clone();
  newDoublyCircularlyLinkedList.delete(nodeIdx);

  return newDoublyCircularlyLinkedList;
};

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
