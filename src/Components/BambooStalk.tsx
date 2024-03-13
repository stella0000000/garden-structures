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
import { Euler, Vector3 } from "three";
import { defaultBambooMaterial, defaultBambooRootMaterial } from "../materials";
import { cone, cylinder } from "../geometries";
import { Camera } from "three";
import { NodeNumber } from "./NodeNumber";
import { useGardenStore } from "../gardenStore";

type BambooStalkProps = {
  root: LinkedList;
  plantIndex: number;
  position: Vector3;
  rotation: Vector3;
  gardenDispatch: React.Dispatch<GardenReducerAction>;
  isDataMode: boolean;
  cameraRef: React.MutableRefObject<Camera | null>;
};

const BambooStalk = ({
  root,
  position,
  rotation,
  gardenDispatch,
  plantIndex,
  isDataMode,
  cameraRef,
}: BambooStalkProps) => {
  const [activeNode, setActiveNode, unsetActiveNode] = useActiveItem();
  const { activePlant, setActivePlant } = useGardenStore();
  let cumulativeHeight = 0;
  const isSelected = activePlant === plantIndex;
  const children: React.ReactNode[] = [];

  const selectThisBamboo = () => {
    setActivePlant(plantIndex);
  };

  // root node
  children.push(
    <Node3D
      value={2}
      key={-1}
      position={new Vector3(0, -0.5, 0)}
      rotation={new Vector3()}
      geometry={cone}
      cylinderArgs={[1, 2, 1]}
      isSelected={false}
      defaultMaterial={defaultBambooRootMaterial}
      deselectAllNodes={unsetActiveNode}
      selectParentPlant={selectThisBamboo}
      selectNode={unsetActiveNode}
    />
  );
  root.intoArray().forEach((nodeValue, nodeIndex) => {
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
          isSelected={nodeIndex === activeNode}
          selectParentPlant={selectThisBamboo}
          defaultMaterial={defaultBambooMaterial}
          deselectAllNodes={unsetActiveNode}
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
    const action: GardenReducerAction = {
      type: "movePlant",
      payload: {
        index: plantIndex,
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
        index: plantIndex,
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
        index: plantIndex,
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
        index: plantIndex,
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
        index: plantIndex,
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
        index: plantIndex,
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
      <group
        position={position}
        rotation={new Euler(rotation.x, rotation.y, rotation.z)}
      >
        {children}
      </group>

      {isSelected && (
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
