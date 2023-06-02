import { useEffect, useState, useRef } from "react";
import { LinkedList, LinkedListFromArray } from "../DataStructures/LinkedList";
import Node3D from "./Node3D";
import { useControl } from "react-three-gui";
import { BambooControl } from "./BambooControl";

const BambooStalk = () => {
  const [values, setValues] = useState([10, 15, 9]);
  const rootRef = useRef<LinkedList>();

  useControl("Test", {
    type: "custom",
    value: values,
    component: BambooControl,
    onChange: (value: number[]) => setValues(value),
  });

  useEffect(() => {
    rootRef.current = LinkedListFromArray(values);
  }, [values]);

  // loop through values, accumulating height and pushing children for rendering
  let cumulativeHeight = 0;
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

  return <>{children}</>;
};

export default BambooStalk;
