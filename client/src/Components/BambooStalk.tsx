import { LinkedList } from "../DataStructures/LinkedList";
import Node3D from "./Node3D";

import { Euler, Vector3 } from "three";
import { defaultBambooMaterial, defaultBambooRootMaterial } from "../materials";
import { cone, cylinder } from "../geometries";
import { Camera } from "three";
import { NodeNumber } from "./NodeNumber";
import { useGardenStore, MenuMode } from "../gardenStore";

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

    setMenuMode,
    menuMode,
  } = useGardenStore();

  const children: React.ReactNode[] = [];
  let cumulativeHeight = 0;

  const selectThisBamboo = () => {
    // ignore clicks from menu-closing actions
    if (menuMode === MenuMode.NONE) {
      setActivePlant(plantIndex);
      setMenuMode(MenuMode.PLANT);
    }
  };

  const selectNode = (nodeIndex: number) => {
    // ignore clicks from menu-closing actions
    if (menuMode === MenuMode.NONE) {
      setActiveNode(nodeIndex);
      setMenuMode(MenuMode.PLANT);
    }
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
          selectNode={() => selectNode(nodeIndex)}
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

  return (
    <>
      <group
        position={position}
        rotation={new Euler(rotation.x, rotation.y, rotation.z)}
      >
        {children}
      </group>
    </>
  );
};

export default BambooStalk;
