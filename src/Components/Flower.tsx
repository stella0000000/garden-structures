import { DoublyCircularlyLinkedList } from "../DataStructures/DoublyCircularlyLinkedList";
import Node3D from "./Node3D";
import useActiveItem from "../Hooks/useActiveItem";
import ControlPanel from "./ControlPanel";
import { Euler, Vector3 } from "three";
import {
  defaultFlowerHubMaterial,
  defaultFlowerPetalMaterial,
} from "../materials";
import { cone, cylinder } from "../geometries";
import { useGardenStore, Direction, PlantName } from "../gardenStore";

type FlowerProps = {
  root: DoublyCircularlyLinkedList;
  plantIndex: number;
  position: Vector3;
  rotation: Vector3;
};

const Flower = ({ root, position, rotation, plantIndex }: FlowerProps) => {
  const [activeNode, setActiveNode, unsetActiveNode] = useActiveItem();
  const { activePlant, setActivePlant, deleteAtIdx, appendNode, movePlant } =
    useGardenStore();

  const isSelected = activePlant === plantIndex;

  const children: React.ReactNode[] = [];

  const selectThisFlower = () => {
    setActivePlant(plantIndex);
  };

  // central hub node of the flower
  children.push(
    <Node3D
      value={2}
      key={-1}
      position={new Vector3(0, 0, 0.3)}
      rotation={new Vector3(1.5, 0, 0)}
      geometry={cone}
      cylinderArgs={[1, 2, 0.5]}
      isSelected={false}
      defaultMaterial={defaultFlowerHubMaterial}
      deselectAllNodes={unsetActiveNode}
      selectParentPlant={selectThisFlower}
      selectNode={unsetActiveNode}
    />
  );

  // petal nodes of the flower
  root.intoArray().forEach((nodeValue, nodeIndex) => {
    children.push(
      <Node3D
        value={nodeValue}
        key={nodeIndex}
        position={
          new Vector3(
            (nodeValue * 2 - 1.5) *
              Math.cos(((2 * Math.PI) / root.length) * nodeIndex),
            (nodeValue * 2 - 1.5) *
              Math.sin(((2 * Math.PI) / root.length) * nodeIndex),
            nodeIndex % 2 === 0 ? 0.05 : -0.05
          )
        }
        rotation={new Vector3(1.5, 0, 0)}
        geometry={cylinder}
        cylinderArgs={[nodeValue, nodeValue, 0.1]}
        isSelected={nodeIndex === activeNode}
        deselectAllNodes={unsetActiveNode}
        selectNode={() => setActiveNode(nodeIndex)}
        defaultMaterial={defaultFlowerPetalMaterial}
        selectParentPlant={selectThisFlower}
      />
    );
  });

  const handleMove = (direction: Direction) => {
    return movePlant(plantIndex, direction);
  };

  const handleAppend = () => {
    appendNode(PlantName.FLOWER, plantIndex);
  };

  const handleDeleteAtIndex = (nodeIdx: number) => {
    deleteAtIdx(PlantName.FLOWER, plantIndex, nodeIdx);
  };

  const moveOperations = {
    move: (direction: Direction) => handleMove(direction),
  };

  const plantOperations = {
    append: handleAppend,
  };

  const nodeOperations = {
    deleteAtIndex: handleDeleteAtIndex,
  };

  return (
    <>
      <group
        rotation={new Euler(rotation.x, rotation.y, rotation.z)}
        position={position}
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

export default Flower;
