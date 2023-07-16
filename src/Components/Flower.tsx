import { useState } from "react";
import {
  DoublyCircularlyLinkedList,
  CircularlyLinkedListFromArray,
} from "../DataStructures/DoublyCircularlyLinkedList";
import Node3D from "./Node3D";
import useActiveItem from "../Hooks/useActiveItem";
import ControlPanel from "./ControlPanel";
import {
  Direction,
  GardenReducerAction,
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

  const [values, setValues] = useState(root.intoArray());
  const { activeItem, selectItem, deselectAllItems } = useActiveItem();

  // useEffect(() => {
  //   console.log({activeItem});
  //   console.log({history})
  // }, [activeItem, history]);

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
      defaultColor={"yellow"}
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
  values.forEach((nodeValue, index) => {
    children.push(
      <Node3D
        value={nodeValue}
        key={index}
        position={position
          .clone()
          .add(
            new Vector3(
              (nodeValue * 2 - 1.5) *
                Math.cos(((2 * Math.PI) / values.length) * index),
              (nodeValue * 2 - 1.5) *
                Math.sin(((2 * Math.PI) / values.length) * index),
              index % 2 === 0 ? 0.05 : -0.05
            )
          )}
        rotation={rotation.clone().add(new Vector3(0, 1.5708, 0))}
        cylinderArgs={[nodeValue, nodeValue, 0.1]}
        isSelected={isActive && activeItem === index}
        deselectAllNodes={deselectAllItems}
        selectNode={() => selectItem(index)}
        defaultColor="rgb(255,0,174)"
        deselectAllPlants={deselectAllPlants}
        selectPlant={selectPlant}
        materialOverride={null}
        // unhighlightAllPlants={unhighlightAllPlants}
        // unhighlightAllNodes={unhighlightAllItems}
        // highlightPlant={highlightPlant}
        // highlightNode={highlightAllItems}
      />
    );
  });

  const handleAppend = () => {
    let newLinkedList = CircularlyLinkedListFromArray(values);
    newLinkedList.append(2);
    console.log({ history });
    setValues(newLinkedList.intoArray());
  };

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

  // const handleInsert = (index: number) => {
  //   let newLinkedList = CircularlyLinkedListFromArray(values)
  //   newLinkedList.insertAtIndex(index, Math.random() * 10)
  //   setValues(newLinkedList.intoArray())
  // }

  // no tumbly delete for flowers
  // only plucking petal at index
  // they love me they love me not
  const handleDeleteAtIndex = (index: number) => {
    let newLinkedList = CircularlyLinkedListFromArray(values);
    newLinkedList.setValue(index, 0);
    setValues(newLinkedList.intoArray());
  };

  const moveOperations = {
    move: (direction: Direction) => handleMove(direction),
  };

  const plantOperations = {
    append: handleAppend,
  };

  const nodeOperations = {
    // insert: handleInsert,
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
