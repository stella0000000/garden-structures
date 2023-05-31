import { useState } from "react";
import { createPortal } from "react-dom";
import { LinkedList, LinkedListFromArray } from "../DataStructures/LinkedList";
import Node3D from "./Node3D";

const BambooStalk = () => {
  const root = new LinkedList();
  root.append(10);
  root.append(15);
  root.append(9);

  let cumulativeHeight = 0;

  const [values, setValues] = useState(root.intoArray());

  const children: React.ReactNode[] = [];
  values.forEach((nodeValue, index) => {
    children.push(
      <Node3D
        value={nodeValue}
        key={index}
        position={[0, cumulativeHeight + 0.5 * nodeValue, 0]}
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
