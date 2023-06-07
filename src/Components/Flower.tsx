import { useEffect, useState } from "react";
import { DoublyCircularlyLinkedList } from "../DataStructures/DoublyCircularlyLinkedList";
import Node3D from "./Node3D";
import useActiveItem from "../Hooks/useActiveItem";
import ControlPanel from "./ControlPanel";

type FlowerProps = {
  root: DoublyCircularlyLinkedList;
  positionOffsets: [number, number, number];
  rotationOffsets: [number, number, number];
  selectPlant: () => void;
  deselectAllPlants: () => void;
  isActive: boolean;
};

const Flower = (props: FlowerProps) => {
  const {
    root,
    positionOffsets,
    rotationOffsets,
    selectPlant,
    deselectAllPlants,
    isActive,
  } = props;

  const [values, setValues] = useState(root.intoArray());
  const { activeItem, selectItem, deselectAllItems } = useActiveItem();
  // console.log({ root });
  // console.log({ values });

  useEffect(() => {
    console.log("activeNodeIndex" + activeItem);
  }, [activeItem]);

  const children: React.ReactNode[] = [];
  children.push(
    <Node3D
      value={2}
      key={-1}
      position={[
        positionOffsets[0],
        positionOffsets[1],
        positionOffsets[2] + 0.3,
      ]}
      rotation={[1.5708, 0, 0]}
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
  values.forEach((nodeValue, index) => {
    children.push(
      <Node3D
        value={nodeValue}
        key={index}
        position={[
          positionOffsets[0] +
            (nodeValue * 2 - 1.5) *
              Math.cos(((2 * Math.PI) / root.length) * index),
          positionOffsets[1] +
            (nodeValue * 2 - 1.5) *
              Math.sin(((2 * Math.PI) / root.length) * index),
          positionOffsets[2] + (index % 2 == 0 ? 0.05 : -0.05),
        ]}
        rotation={[1.5708, 0, 0]}
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

  return (
    <>
      {children}
      {isActive && (
        <ControlPanel data={root} activeNodeId={activeItem} operations={{}} />
      )}
    </>
  );
};

export default Flower;
