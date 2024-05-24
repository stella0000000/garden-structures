import { LinkedList } from "../DataStructures/LinkedList";
import Node3D from "./Node3D";
import ControlPanel from "./ControlPanel";

import { Euler, Vector3 } from "three";
import { defaultBambooMaterial, defaultBambooRootMaterial } from "../materials";
import { cone, cylinder } from "../geometries";
import { Camera } from "three";
import { NodeNumber } from "./NodeNumber";
import { useGardenStore, Direction, PlantName } from "../gardenStore";
// import { useEffect } from "react";

type BambooStalkProps = {
  root: LinkedList;
  plantIndex: number;
  position: Vector3;
  rotation: Vector3;
  cameraRef: React.MutableRefObject<Camera | null>;
};

const BambooStalk = ({
  root,
  position,
  rotation,
  plantIndex,
  cameraRef,
}: BambooStalkProps) => {
  const {
    activePlant,
    setActivePlant,

    activeNode,
    setActiveNode,
    deselectAllNodes,

    isDataMode,
    deleteAtIdx,
    appendNode,
    deleteAfterNode,
    insertNode,
    popNode,
    movePlant,
  } = useGardenStore();

  // true if the root is selected without a node
  const isPlantSelected = activePlant === plantIndex;

  const children: React.ReactNode[] = [];
  let cumulativeHeight = 0;

  const selectThisBamboo = () => {
    setActivePlant(plantIndex);
  };

  // root node
  children.push(
    <Node3D
      value={2}
      key={-1}
      position={new Vector3(0, 0.5, 0)}
      rotation={new Vector3()}
      geometry={cone}
      cylinderArgs={[1, 2, 1]}
      isSelected={false}
      defaultMaterial={defaultBambooRootMaterial}
      deselectAllNodes={deselectAllNodes}
      selectParentPlant={selectThisBamboo}
      selectNode={deselectAllNodes}
    />
  );
  root.intoArray().forEach((nodeValue, nodeIndex) => {
    const isNodeSelected =
      nodeIndex === activeNode && plantIndex === activePlant;

    // plant nodes
    if (!isDataMode) {
      children.push(
        <Node3D
          value={nodeValue}
          key={nodeIndex}
          position={new Vector3(0, cumulativeHeight + 0.5 * nodeValue, 0)}
          rotation={new Vector3()}
          geometry={cylinder}
          cylinderArgs={[1, 1, nodeValue]}
          isSelected={isNodeSelected}
          selectParentPlant={selectThisBamboo}
          defaultMaterial={defaultBambooMaterial}
          deselectAllNodes={deselectAllNodes}
          selectNode={() => setActiveNode(nodeIndex)}
        />
      );
    } else {
      children.push(
        <NodeNumber
          key={nodeIndex}
          isDataMode={isDataMode}
          cameraRef={cameraRef}
          content={String(nodeValue)}
          position={new Vector3(0, cumulativeHeight + 0.5 * nodeValue, 0)}
        />
      );
    }
    cumulativeHeight += nodeValue;
  });

  const handleMove = (direction: Direction) => {
    return movePlant(plantIndex, direction);
  };

  const handleAppend = () => {
    appendNode(PlantName.BAMBOO, plantIndex);
  };

  const handlePop = () => {
    popNode(plantIndex);
  };

  const handleInsert = (nodeIndex: number) => {
    insertNode(plantIndex, nodeIndex);
  };

  const handleDeleteAfterIdx = () => {
    deleteAfterNode(plantIndex, activeNode);
  };

  const handleDeleteAtIdx = (nodeIndex: number) => {
    deleteAtIdx(PlantName.BAMBOO, plantIndex, nodeIndex);
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
    deleteAfter: handleDeleteAfterIdx,
    deleteAtIndex: handleDeleteAtIdx,
  };

  return (
    <>
      <group
        position={position}
        rotation={new Euler(rotation.x, rotation.y, rotation.z)}
      >
        {children}
      </group>

      {isPlantSelected && (
        <ControlPanel
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
