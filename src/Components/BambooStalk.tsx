// import { useEffect, useState } from "react";
import { LinkedList } from "../DataStructures/LinkedList";
import Node3D from "./Node3D";
import ControlPanel from "./ControlPanel";
import useActiveItem from "../Hooks/useActiveItem";
import {
  Direction,
  GardenReducerAction,
  OpName,
  PlantName,
} from "../Hooks/Reducers/gardenReducer";
import { Vector3 } from "three";
import { defaultBambooMaterial, defaultBambooRootMaterial } from "../materials";
import { cone, cylinder } from "../geometries";

type BambooStalkProps = {
  root: LinkedList;
  index: number;
  position: Vector3;
  rotation: Vector3;
  gardenDispatch: React.Dispatch<GardenReducerAction>;
  selectPlant: () => void;
  deselectAllPlants: () => void;
  isActive: boolean;
};

const BambooStalk = (props: BambooStalkProps) => {
  const {
    root,
    position,
    rotation,
    selectPlant,
    deselectAllPlants,
    isActive,
    gardenDispatch,
    index,
  } = props;
  const {
    activeItem: activeNode,
    selectItem: selectNode,
    deselectAllItems: deselectAllNodes,
  } = useActiveItem();

  let cumulativeHeight = 0;

  const children: React.ReactNode[] = [];
  // root node
  children.push(
    <Node3D
      value={2}
      key={-1}
      position={position.clone().add(new Vector3(0, 0, 0.3))}
      rotation={rotation}
      geometry={cone}
      cylinderArgs={[1, 2, 1]}
      isSelected={false}
      defaultMaterial={defaultBambooRootMaterial}
      deselectAllPlants={deselectAllPlants}
      deselectAllNodes={() => {
        deselectAllNodes();
        deselectAllPlants();
      }}
      selectPlant={selectPlant}
      selectNode={deselectAllNodes}
    />
  );
  root.intoArray().forEach((nodeValue, index) => {
    // plant nodes
    children.push(
      <Node3D
        value={nodeValue}
        key={index}
        position={position
          .clone()
          .add(new Vector3(0, cumulativeHeight + 0.5 * nodeValue, 0))}
        rotation={rotation.clone().add(new Vector3(0, 0, 0))}
        geometry={cylinder}
        cylinderArgs={[1, 1, nodeValue]}
        isSelected={isActive && activeNode === index}
        deselectAllPlants={deselectAllPlants}
        selectPlant={selectPlant}
        defaultMaterial={defaultBambooMaterial}
        deselectAllNodes={deselectAllNodes}
        selectNode={() => selectNode(index)}
      />
    );
    cumulativeHeight += nodeValue;
  });

  const handleMove = (direction: Direction) => {
    const action: GardenReducerAction = {
      type: "movePlant",
      payload: {
        index,
        direction,
      },
    };
    gardenDispatch(action);
  };

  const handleAppend = () => {
    const action: GardenReducerAction = {
      type: "plantOperation",
      payload: {
        plantName: PlantName.BAMBOO,
        opName: OpName.APPEND,
        index,
      },
    };
    gardenDispatch(action);
  };

  const handlePop = () => {
    const action: GardenReducerAction = {
      type: "plantOperation",
      payload: {
        plantName: PlantName.BAMBOO,
        opName: OpName.POP,
        index,
      },
    };
    gardenDispatch(action);
  };

  const handleInsert = (nodeIndex: number) => {
    const action: GardenReducerAction = {
      type: "nodeOperation",
      payload: {
        plantName: PlantName.BAMBOO,
        opName: OpName.INSERT,
        index,
        nodeIndex,
      },
    };
    gardenDispatch(action);
  };

  const handleDelete = (nodeIndex: number) => {
    const action: GardenReducerAction = {
      type: "nodeOperation",
      payload: {
        plantName: PlantName.BAMBOO,
        opName: OpName.DELETE,
        index,
        nodeIndex,
      },
    };
    gardenDispatch(action);
  };

  const handleDeleteAtIndex = (nodeIndex: number) => {
    const action: GardenReducerAction = {
      type: "nodeOperation",
      payload: {
        plantName: PlantName.BAMBOO,
        opName: OpName.DELETEATINDEX,
        index,
        nodeIndex,
      },
    };
    gardenDispatch(action);
  };

  const moveOperations = {
    move: (direction: Direction) => handleMove(direction),
  };

  const plantOperations = {
    append: handleAppend,
    pop: handlePop,
  };

  const nodeOperations = {
    insert: handleInsert,
    deleteAfter: handleDelete,
    deleteAtIndex: handleDeleteAtIndex,
  };

  return (
    <>
      {children}

      {isActive && (
        <ControlPanel
          // data={root}
          activeNodeId={activeNode}
          moveOperations={moveOperations}
          plantOperations={plantOperations}
          nodeOperations={nodeOperations}
        />
      )}
    </>
  );
};

export default BambooStalk;
