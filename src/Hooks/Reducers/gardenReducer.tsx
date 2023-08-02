import { Vector3 } from "three";
import {
  BambooStalkData,
  FlowerData,
  PlantCollection,
} from "../../Components/GlobalCanvas";
// import { FlattenedGraph, GraphNode } from "../../DataStructures/Graph";
// import { produce } from "immer";
import { LinkedList } from "../../DataStructures/LinkedList";
import { DoublyCircularlyLinkedList } from "../../DataStructures/DoublyCircularlyLinkedList";
// import { v4 as uuidv4 } from "uuid";

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
  const { plantName, opName } = action.payload

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
        return popBamboo(plantCollection, action)
        // throw Error(`to do`)
      } else {
        throw Error(`No pop handler for ${plantName}`);
      }
    } else {
      throw Error(
        `No ${opName} handler for plant: ${plantName}`
      );
    }
  /* NODE OPS */
  } else if (action.type === "nodeOperation") {
    if (opName === OpName.DELETEATINDEX) {
      if (plantName === PlantName.BAMBOO) {
        return deleteAtIndexBamboo(plantCollection, action)
      } else if (plantName === PlantName.FLOWER) {
        return deleteAtIndexFlower(plantCollection, action)
      } else {
        throw Error(`No delete @ index handler for ${plantName}`);
      }
    } else if (opName === OpName.INSERT) {
      if (plantName === PlantName.BAMBOO) {
        return insertBamboo(plantCollection, action)
      } else {
        throw Error(`No insert @ index handler for ${plantName}`);
      }
    } else if (opName === OpName.DELETE) {
      if (plantName === PlantName.BAMBOO) {
        return deleteAfterBamboo(plantCollection, action) // deletes all nodes from that idx on
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

  const oldBambooData = plantCollection[index].data as LinkedList;
  const newLinkedList = oldBambooData.clone();
  newLinkedList.append(Math.random() * 10);

  const newState: PlantCollection = {
    ...plantCollection,
    [`${index}`]: {
      ...plantCollection[index],
      data: newLinkedList,
    },
  };

  return Object.values(newState) as PlantCollection;
};

const popBamboo = (
  plantCollection: PlantCollection,
  action: GardenReducerAction
): PlantCollection => {
  const { index } = action.payload;
  if (index === undefined)
    throw Error("Bamboo pop operation requires plant index");

  const oldBambooData = plantCollection[index].data as LinkedList;
  const newLinkedList = oldBambooData.clone();
  newLinkedList.pop();

  const newState: PlantCollection = {
    ...plantCollection,
    [`${index}`]: {
      ...plantCollection[index],
      data: newLinkedList,
    },
  };

  return Object.values(newState) as PlantCollection;
};

const deleteAtIndexBamboo = (
  plantCollection: PlantCollection,
  action: GardenReducerAction
): PlantCollection => {
  const { index, nodeIndex } = action.payload;
  if (index === undefined)
    throw Error("Bamboo delete @ index requires plant index");
  if (nodeIndex === undefined)
    throw Error("Bamboo delete @ index requires node index");

    const oldBambooData = plantCollection[index].data as LinkedList;
    const newLinkedList = oldBambooData.clone();
    newLinkedList.deleteAtIndex(nodeIndex!);
  
    const newState: PlantCollection = {
      ...plantCollection,
      [`${index}`]: {
        ...plantCollection[index],
        data: newLinkedList,
      },
    };
  
    return Object.values(newState) as PlantCollection;
};

const deleteAfterBamboo = (
  plantCollection: PlantCollection,
  action: GardenReducerAction
): PlantCollection => {
  const { index, nodeIndex } = action.payload;
  if (index === undefined)
    throw Error("Bamboo delete after requires plant index");
  if (nodeIndex === undefined)
    throw Error("Bamboo delete after requires node index");

    const oldBambooData = plantCollection[index].data as LinkedList;
    const newLinkedList = oldBambooData.clone();
    newLinkedList.delete(nodeIndex!);
  
    const newState: PlantCollection = {
      ...plantCollection,
      [`${index}`]: {
        ...plantCollection[index],
        data: newLinkedList,
      },
    };
  
    return Object.values(newState) as PlantCollection;
};

const insertBamboo = (
  plantCollection: PlantCollection,
  action: GardenReducerAction
): PlantCollection => {
  const { index, nodeIndex } = action.payload;
  if (index === undefined)
    throw Error("Bamboo insert requires plant index");
  if (nodeIndex === undefined)
    throw Error("Bamboo insert requires node index");

    const oldBambooData = plantCollection[index].data as LinkedList;
    const newLinkedList = oldBambooData.clone();
    newLinkedList.insertAtIndex(nodeIndex!, Math.random()*10);
  
    const newState: PlantCollection = {
      ...plantCollection,
      [`${index}`]: {
        ...plantCollection[index],
        data: newLinkedList,
      },
    };
  
    return Object.values(newState) as PlantCollection;
};

const appendFlower = (
  plantCollection: PlantCollection,
  action: GardenReducerAction
): PlantCollection => {
  const { index } = action.payload;
  if (index === undefined)
    throw Error("Flower append requires plant index");

  const oldFlowerData = plantCollection[index].data as DoublyCircularlyLinkedList;
  const newDoublyCircularlyLinkedList = oldFlowerData.clone();
  newDoublyCircularlyLinkedList.append(2);

  const newState: PlantCollection = {
    ...plantCollection,
    [`${index}`]: {
      ...plantCollection[index],
      data: newDoublyCircularlyLinkedList,
    },
  };

  return Object.values(newState) as PlantCollection;
};

const deleteAtIndexFlower = (
  plantCollection: PlantCollection,
  action: GardenReducerAction
): PlantCollection => {
  const { index, nodeIndex } = action.payload;
  if (index === undefined)
    throw Error("Flower delete @ index requires plant index");
  if (nodeIndex === undefined)
    throw Error("Flower node index required")

  const oldFlowerData = plantCollection[index].data as DoublyCircularlyLinkedList;
  const newDoublyCircularlyLinkedList = oldFlowerData.clone();
  newDoublyCircularlyLinkedList.delete(nodeIndex);

  const newState: PlantCollection = {
    ...plantCollection,
    [`${index}`]: {
      ...plantCollection[index],
      data: newDoublyCircularlyLinkedList,
    },
  };

  return Object.values(newState) as PlantCollection;
};


  /** IMMER */
  // if (action.type === "append") {
  //   return produce(plantCollection, (draft) => {
  //     if (index == undefined) {
  //       throw Error("no matching plant index");
  //     }

  //     draft[index].data;
  //     // console.log(draft[index]);
  //     const flat = draft[index].data as FlattenedGraph;
  //     // console.log({ flat });
  //     const unflat = GraphNode.unflatten(flat);
  //     unflat.connect(
  //       new GraphNode([Math.random() * 50, Math.random() * 50], [])
  //     );

  //     draft[index].data = unflat.flatten();
  //   });
  // } else {
  //   throw Error(`Invalid action type for gardenReducer: ${action.type}`);
  // }