import { Vector3 } from "three";
import {
  BambooStalkData,
  FlowerData,
  PlantCollection,
} from "../../Components/GlobalCanvas";

export enum Direction {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
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
): PlantCollection {
  console.log(action);

  const { index, nodeIndex, direction, plantName, opName } = action.payload

  /* PLANT OPS */
  if (action.type === "plantOperation") {
    if (opName === OpName.APPEND) {
      if (plantName === PlantName.BAMBOO) {
        return appendBamboo(plantCollection, action);
      } else if (action.payload.plantName === PlantName.FLOWER) {
        return appendFlower(plantCollection, action);
      } else {
        throw Error(`No append handler for ${plantName}`);
      }
    } else {
      throw Error(
        `No ${action.payload.opName} handler for plant: ${action.payload.plantName}`
      );
    }
  /* NODE OPS */
  } else if (action.type === "nodeOperation") {
    if (opName === OpName.DELETEATINDEX) {
      if (plantName === PlantName.BAMBOO) {
        // delete @ index bamboo
        // return deleteAtIndexBamboo(plantCollection, action)
        return plantCollection // filler, delete this
      } else if (plantName === PlantName.FLOWER) {
        return deleteAtIndexFlower(plantCollection, action)
      } else {
        throw Error(`No delete @ index handler for ${plantName}`);
      }
    }
  } else if (action.type === "movePlant") {
    return movePlant(plantCollection, action);
  } else {
    throw Error(
      `Invalid action type for gardenReducer: no action matches supplied name ${action.type}`
    );
  }
}

const movePlant = (
  plantCollection: PlantCollection,
  action: GardenReducerAction
): PlantCollection => {
  if (action.payload.index === undefined) {
    throw Error("Invalid action for gardenPlant Reducer: no index in payload");
  }

  const currentPlant = plantCollection[action.payload.index];
  let currentPosition = currentPlant.position;
  const direction = action.payload.direction;
  if (direction === Direction.UP) {
    currentPosition.add(new Vector3(0, 1, 0));
  } else if (direction === Direction.DOWN) {
    currentPosition.add(new Vector3(0, -1, 0));
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
    plantCollection[action.payload.index] = newPlant;
    return [...plantCollection];
  } else if (currentPlant.kind === "FlowerData") {
    const newPlant: FlowerData = {
      kind: currentPlant.kind,
      data: currentPlant.data,
      position: currentPosition,
      rotation: currentPlant.rotation,
    };
    plantCollection[action.payload.index] = newPlant;
    return [...plantCollection];
  } else {
    throw Error(
      "Invalid action for gardenReducer: plant accessed by index is wrong type"
    );
  }
};

const appendBamboo = (
  plantCollection: PlantCollection,
  action: GardenReducerAction
): PlantCollection => {
  const { index } = action.payload;
  if (index === undefined)
    throw Error("Bamboo append operation requires plant index");

  const newLinkedList = plantCollection[index].data.clone();
  newLinkedList.append(Math.random() * 10);

  const newState: PlantCollection = {
    ...plantCollection,
    [`${index}`]: {
      ...plantCollection[index],
      data: newLinkedList,
    },
  };

  console.log(Object.values(newState));

  return Object.values(newState) as PlantCollection;
};

// const deleteAtIndexBamboo = (
//   plantCollection: PlantCollection,
//   action: GardenReducerAction
// ): PlantCollection => {
//   const { index, nodeIndex } = action.payload;
//   if (index === undefined)
//     throw Error("Bamboo delete @ index requires plant index");

//     const newLinkedList = plantCollection[index].data.clone();
//     newLinkedList.delete(nodeIndex!);
  
//     const newState: PlantCollection = {
//       ...plantCollection,
//       [`${index}`]: {
//         ...plantCollection[index],
//         data: newLinkedList,
//       },
//     };
  
//     console.log(Object.values(newState));
  
//     return Object.values(newState) as PlantCollection;
//   return Object.values(newState) as PlantCollection;
// };


const appendFlower = (
  plantCollection: PlantCollection,
  action: GardenReducerAction
): PlantCollection => {
  const { index } = action.payload;
  if (index === undefined)
    throw Error("Flower append requires plant index");

  const newDoublyCircularlyLinkedList = plantCollection[index].data.clone();
  newDoublyCircularlyLinkedList.append(2);

  const newState: PlantCollection = {
    ...plantCollection,
    [`${index}`]: {
      ...plantCollection[index],
      data: newDoublyCircularlyLinkedList,
    },
  };

  console.log(Object.values({newState}));

  return Object.values(newState) as PlantCollection;
};

const deleteAtIndexFlower = (
  plantCollection: PlantCollection,
  action: GardenReducerAction
): PlantCollection => {
  const { index, nodeIndex } = action.payload;
  if (index === undefined)
    throw Error("Flower delete @ index requires plant index");

  const newDoublyCircularlyLinkedList = plantCollection[index].data.clone();
  if (nodeIndex) newDoublyCircularlyLinkedList.delete(nodeIndex);

  const newState: PlantCollection = {
    ...plantCollection,
    [`${index}`]: {
      ...plantCollection[index],
      data: newDoublyCircularlyLinkedList,
    },
  };

  console.log(Object.values({newState}));

  return Object.values(newState) as PlantCollection;
};