import { useEffect, useState } from "react";
import { LinkedList, LinkedListFromArray } from "../DataStructures/LinkedList";
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

  useEffect(() => {
    console.log("activeNodeIndex" + activeNode);
  }, [activeNode]);

  const children: React.ReactNode[] = [];
  // root node
  children.push(
    <Node3D
      value={2}
      key={-1}
      position={position.clone().add(new Vector3(0, 0, 0.3))}
      rotation={rotation}
      cylinderArgs={[1, 2, 1]}
      isSelected={false}
      defaultColor={"rgb(114, 100, 21)"}
      deselectAllPlants={deselectAllPlants}
      deselectAllNodes={() => {
        deselectAllNodes();
        deselectAllPlants();
      }}
      selectPlant={selectPlant}
      selectNode={deselectAllNodes}
      materialOverride={null}
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
        cylinderArgs={[1, 1, nodeValue]}
        isSelected={isActive && activeNode === index}
        deselectAllPlants={deselectAllPlants}
        selectPlant={selectPlant}
        defaultColor={"rgb(26, 255, 0)"}
        deselectAllNodes={deselectAllNodes}
        selectNode={() => selectNode(index)}
        materialOverride={null}
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
    // const len = root.intoArray().length;
    // let newLinkedList = LinkedListFromArray(values);
    // newLinkedList.delete(len - 1);
    // setValues(newLinkedList.intoArray());
    // selectNode(values.length - 1);
    // console.log({ activeNode });
  };

  const handleInsert = (index: number) => {
    // let newLinkedList = LinkedListFromArray(values);
    // newLinkedList.insertAtIndex(index, Math.random() * 10);
    // setValues(newLinkedList.intoArray());
  };

  const handleDelete = (index: number) => {
    // let newLinkedList = LinkedListFromArray(values);
    // newLinkedList.delete(index); // tumbly
    // setValues(newLinkedList.intoArray());
    // console.log(activePlant)
  };

  const handleDeleteAtIndex = (index: number) => {
    // let newLinkedList = LinkedListFromArray(values);
    // newLinkedList.deleteAtIndex(index);
    // setValues(newLinkedList.intoArray());
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
    delete: handleDelete,
    deleteAtIndex: handleDeleteAtIndex,
  };

  return (
    <>
      {children}

      {isActive && (
        <ControlPanel
          data={root}
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
