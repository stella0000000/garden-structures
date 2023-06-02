import { useState } from "react";
import { DoublyCircularlyLinkedList } from "../DataStructures/DoublyCircularlyLinkedList";
import Node3D from "./Node3D";

type FlowerProps = {
  root: DoublyCircularlyLinkedList;
  positionOffsets: [number, number, number];
  rotationOffsets: [number, number, number];
};

const Flower = (props: FlowerProps) => {
  const { root, positionOffsets, rotationOffsets } = props;

  const [values, setValues] = useState(root.intoArray());
  console.log({ root });
  console.log({ values });

  const [activeNode, setActiveNode] = useState(-1);

  const deselectAllNodes = () => {
    setActiveNode(-1);
  };

  const selectNode = (key: number) => {
    setActiveNode(key);
  };

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
      selectedColor={"gray"}
      deselectAllNodes={deselectAllNodes}
      selectNode={() => {}}
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
        /**
         *
         */
        rotation={[1.5708, 0, 0]}
        cylinderArgs={[nodeValue, nodeValue, 0.1]}
        isSelected={activeNode === index}
        deselectAllNodes={deselectAllNodes}
        selectNode={() => selectNode(index)}
        defaultColor="rgb(255,0,174)"
        selectedColor={"white"}
      />
    );
  });

  return <>{children}</>;
};

export default Flower;
