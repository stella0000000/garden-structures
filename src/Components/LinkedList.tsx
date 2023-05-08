import { LinkedList, LinkedListFromArray } from "../DataStructures/LinkedList";
import { useState } from "react";
import Node from "./Node";

const LinkedListDemo = () => {
  const root = new LinkedList();
  root.append(10);
  root.append(15);
  root.append(9);

  const [values, setValues] = useState(root.intoArray());

  const children = values.map((nodeValue, index) => (
    <Node value={nodeValue} key={index} />
  ));

  const handleAppend = () => {
    let newLinkedList = LinkedListFromArray(values);
    newLinkedList.append(10);
    setValues(newLinkedList.intoArray());
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          flexWrap: "wrap",
        }}
      >
        {children}
      </div>
      <div style={{ position: "absolute", top: 0, right: 0 }}>
        <button onClick={handleAppend}>append</button>
      </div>
    </>
  );
};

export default LinkedListDemo;
