import { DoublyCircularlyLinkedList } from "../DataStructures/DoublyCircularlyLinkedList";
import Node3D from "./Node3D";
import useActiveItem from "../Hooks/useActiveItem";
import ControlPanel from "./ControlPanel";
import {
  Direction,
  GardenReducerAction,
  OpName,
  PlantName,
} from "../Hooks/Reducers/gardenReducer";
import { Vector3 } from "three";

type FlowerProps = {
  root: DoublyCircularlyLinkedList;
  index: number;
  gardenDispatch: React.Dispatch<GardenReducerAction>;
  position: Vector3;
  rotation: Vector3;
  selectPlant: () => void;
  deselectAllPlants: () => void;
  isActive: boolean;
};

const Flower = (props: FlowerProps) => {
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

  // 0 1 2 3
  // 0   2 3
  // [0, _, 1, 2]

  // [1, 2, 3, 4, 5, 6]
  // delete @ idx 1
  // [1, _, 3, 4, 5, 6]

  const { activeItem, selectItem, deselectAllItems } = useActiveItem();


  const children: React.ReactNode[] = [];

  console.log(`flower rotation: ${[rotation.x, rotation.y, rotation.z]}`);

  // central hub node of the flower
  children.push(
    <Node3D
      value={2}
      key={-1}
      position={position.clone().add(new Vector3(0, 0, 0.3))}
      rotation={rotation.clone().add(new Vector3(0, 1.5708, 0))}
      cylinderArgs={[1, 2, 0.5]}
      isSelected={false}
      defaultColor={"rgb(221, 255, 0)"}
      deselectAllPlants={deselectAllPlants}
      deselectAllNodes={() => {
        deselectAllItems();
        deselectAllPlants();
      }}
      selectPlant={selectPlant}
      selectNode={deselectAllItems}
      materialOverride={null}
    />
  );

  // petal nodes of the flower
  root.intoArray().forEach((nodeValue, index) => {
    children.push(
      <Node3D
        value={nodeValue}
        key={index}
        position={position
          .clone()
          .add(
            new Vector3(
              (nodeValue * 2 - 1.5) *
                Math.cos(((2 * Math.PI) / root.length) * index),
              (nodeValue * 2 - 1.5) *
                Math.sin(((2 * Math.PI) / root.length) * index),
              index % 2 === 0 ? 0.05 : -0.05
            )
          )}
        rotation={rotation.clone().add(new Vector3(0, 1.5708, 0))}
        cylinderArgs={[nodeValue, nodeValue, 0.1]}
        isSelected={isActive && activeItem === index}
        deselectAllNodes={deselectAllItems}
        selectNode={() => selectItem(index)}
        defaultColor="rgb(255, 92, 203)"
        deselectAllPlants={deselectAllPlants}
        selectPlant={selectPlant}
        materialOverride={null}
      />
    );
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
        plantName: PlantName.FLOWER,
        opName: OpName.APPEND,
        index,
      },
    };
    gardenDispatch(action);
  };

  const handleDeleteAtIndex = (nodeIndex: number) => {
    const action: GardenReducerAction = {
      type: "nodeOperation",
      payload: {
        plantName: PlantName.FLOWER,
        opName: OpName.DELETEATINDEX,
        index,
        nodeIndex
      },
    };
    gardenDispatch(action);
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
      {children}
      {isActive && (
        <ControlPanel
          data={root}
          activeNodeId={activeItem}
          moveOperations={moveOperations}
          plantOperations={plantOperations}
          nodeOperations={nodeOperations}
        />
      )}
    </>
  );
};

export default Flower;