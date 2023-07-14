import {
  BambooStalk,
  BambooStalkData,
  Flower,
  FlowerData,
  PlantCollection,
} from "../../Components/GlobalCanvas";
import { CircularlyLinkedListFromArray } from "../../DataStructures/DoublyCircularlyLinkedList";

export type GardenReducerAction = {
  type: string;
  payload: {
    index?: number;
  };
};

export default function gardenReducer(
  plantCollection: PlantCollection,
  action: GardenReducerAction
) {
  if (action.type == "modifyPlant") {
    // if we are modifying a plant, the new plant should exist in the payload
    if (!action.payload.index) {
      throw Error(
        "Invalid action for gardenPlant Reducer: no index in payload"
      );
    }
    const currentPlant = plantCollection[action.payload.index];
    if (currentPlant.kind === "BambooStalkData") {
      const newPlant: BambooStalkData = {
        kind: currentPlant.kind,
        data: currentPlant.data,
        position: [
          currentPlant.position[0] + 1,
          currentPlant.position[1],
          currentPlant.position[2],
        ],
        rotation: currentPlant.rotation,
      };
      plantCollection[action.payload.index] = newPlant;
      return [...plantCollection];
    } else if (currentPlant.kind === "FlowerData") {
      const newPlant: FlowerData = {
        kind: currentPlant.kind,
        data: currentPlant.data,
        position: [
          currentPlant.position[0] + 1,
          currentPlant.position[1],
          currentPlant.position[2],
        ],
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
