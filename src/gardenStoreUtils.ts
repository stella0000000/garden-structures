import { Vector3 } from "three";
import { LinkedList } from "./DataStructures/LinkedList";
import { BambooStalkData, FlowerData, PlantCollection } from "./initialState";
import {
  CircularlyLinkedListFromArray,
  DoublyCircularlyLinkedList,
} from "./DataStructures/DoublyCircularlyLinkedList";
import { Direction } from "./gardenStore";

export const getGardenWithMovedPlant = (
  plantCollection: PlantCollection,
  plantIdx: number,
  direction: Direction
): PlantCollection => {
  if (plantIdx === undefined) {
    throw Error("Please select a plant to move a plant.");
  }

  const currentPlant = plantCollection[plantIdx];
  let currentPosition = currentPlant.position.clone();

  if (direction === Direction.UP) {
    currentPosition.add(new Vector3(0, 0, -1));
  } else if (direction === Direction.DOWN) {
    currentPosition.add(new Vector3(0, 0, 1));
  } else if (direction === Direction.LEFT) {
    currentPosition.add(new Vector3(-1, 0, 0));
  } else if (direction === Direction.RIGHT) {
    currentPosition.add(new Vector3(1, 0, 0));
  }

  if (currentPlant.kind === "BambooStalkData") {
    const newPlant: BambooStalkData = {
      kind: currentPlant.kind,
      data: currentPlant.data,
      position: currentPosition,
      rotation: currentPlant.rotation,
    };
    plantCollection[plantIdx] = newPlant;

    return [...plantCollection];
  } else if (currentPlant.kind === "FlowerData") {
    const newPlant: FlowerData = {
      kind: currentPlant.kind,
      data: currentPlant.data,
      position: currentPosition,
      rotation: currentPlant.rotation,
    };
    plantCollection[plantIdx] = newPlant;

    return [...plantCollection];
  } else {
    throw Error("Invalid action - plant accessed by index is wrong type.");
  }
};

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
  newLinkedList.delete(nodeIdx + 1);

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
