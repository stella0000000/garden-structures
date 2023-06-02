import { useState } from "react";
import { LinkedList, LinkedListFromArray } from "../DataStructures/LinkedList";
import Node3D from "./Node3D";

type BambooStalkProps = {
  root: LinkedList;
  positionOffsets: [number, number, number];
};

const BambooStalk = (props: BambooStalkProps) => {
  const { root, positionOffsets } = props;

  let cumulativeHeight = 0;

  const [values, setValues] = useState(root.intoArray());
  const [activeNode, setActiveNode] = useState(-1);

  const deselectAllNodes = () => {
    setActiveNode(-1);
  };

  const selectNode = (key: number) => {
    setActiveNode(key);
  };

  const children: React.ReactNode[] = [];
  values.forEach((nodeValue, index) => {
    children.push(
      <Node3D
        value={nodeValue}
        key={index}
        position={[
          positionOffsets[0],
          positionOffsets[1] + cumulativeHeight + 0.5 * nodeValue,
          positionOffsets[2],
        ]}
        rotation={[0, 0, 0]}
        cylinderArgs={[1, 1, nodeValue]}
        isSelected={activeNode === index}
        deselectAllNodes={deselectAllNodes}
        selectNode={() => selectNode(index)}
        selectedColor={"rgb(173, 140, 57)"}
        defaultColor={"green"}
      />
    );
    cumulativeHeight += nodeValue;
  });

  const handleAppend = () => {
    let newLinkedList = LinkedListFromArray(values);
    newLinkedList.append(Math.random() * 10);
    setValues(newLinkedList.intoArray());
  };

  const handlePop = () => {
    console.log({ values });
    const len = values.length;
    let newLinkedList = LinkedListFromArray(values);
    console.log({ newLinkedList });
    newLinkedList.delete(len - 1);
    console.log({ newLinkedList });
    setValues(newLinkedList.intoArray());
  };

  return (
    <>
      {/* {createPortal(
        <div style={{ position: "fixed", top: 0, left: 0 }}>
          bamboocontrols
          <button onClick={() => handleAppend()}>Add a bamboo section</button>
          <button onClick={() => handlePop()}>Remove a bamboo section</button>
        </div>,
        document.body
      )} */}

      {children}
    </>
  );
};

export default BambooStalk;
