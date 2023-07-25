import { Vector3 } from "three";
import {
  BambooStalkData,
  FlowerData,
  PlantCollection,
} from "../../Components/GlobalCanvas";
import {
  LinkedList,
  LinkedListFromArray,
} from "../../DataStructures/LinkedList";

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
}

export type GardenReducerAction = {
  type: string;
  payload: {
    index?: number;
    direction?: Direction;
    plantName?: PlantName;
    opName?: OpName;
  };
};

export default function gardenReducer(
  plantCollection: PlantCollection,
  action: GardenReducerAction
) {
  console.log(action);

  if (action.type === "plantOperation") {
    const { opName, plantName, index } = action.payload;

    if (action.payload.opName === OpName.APPEND) {
      if (action.payload.plantName === PlantName.BAMBOO) {
        if (index === undefined)
          throw Error("bamboo append operation requires plant index");

        // const newPlantCollection = [...plantCollection];
        const newPlantData = { ...plantCollection[index] };

        const newLinkedList = newPlantData.data.clone();

        newLinkedList.append(Math.random() * 10);

        newPlantData.data = newLinkedList;

        plantCollection[index] = newPlantData;

        return [...plantCollection];
      }
    }
  } else if (action.type === "movePlant") {
    // if we are modifying a plant, the new plant should exist in the payload
    if (action.payload.index === undefined) {
      throw Error(
        "Invalid action for gardenPlant Reducer: no index in payload"
      );
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
  } else {
    throw Error(
      `Invalid action type for gardenReducer: no action matches supplied name ${action.type}`
    );
  }
}
