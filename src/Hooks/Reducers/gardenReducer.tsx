import { Vector3 } from "three";
import {
  BambooStalkData,
  FlowerData,
  PlantCollection,
} from "../../Components/GlobalCanvas";
import { FlattenedGraph, GraphNode } from "../../DataStructures/Graph";
import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export type GardenReducerAction = {
  type: string;
  payload: {
    index?: number;
    direction?: Direction;
  };
};

export default function gardenReducer(
  plantCollection: PlantCollection,
  action: GardenReducerAction
) {
  if (action.type === "movePlant") {
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
  }
  if (action.type === "append") {
    return produce(plantCollection, (draft) => {
      if (action.payload.index == undefined) {
        throw Error("no matching plant index");
      }

      draft[action.payload.index].data;

      console.log(draft[action.payload.index]);

      const flat = draft[action.payload.index].data as FlattenedGraph;

      console.log({ flat });

      const unflat = GraphNode.unflatten(flat);

      unflat.connect(
        new GraphNode([Math.random() * 50, Math.random() * 50], [])
      );

      draft[action.payload.index].data = unflat.flatten();
    });
  } else {
    throw Error(`Invalid action type for gardenReducer: ${action.type}`);
  }
}
