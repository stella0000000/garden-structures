import { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { LinkedList, LinkedListFromArray } from "../DataStructures/LinkedList";
import Node3D from "./Node3D";
import { Stats, OrbitControls } from "@react-three/drei";

const LinkedList3D = () => {
  const root = new LinkedList();
  root.append(10);
  root.append(15);
  root.append(9);

  const [values, setValues] = useState(root.intoArray());

  const children = values.map((nodeValue, index) => (
    <Node3D value={nodeValue} key={index} position={[0, index * 4 + 1, 0]} />
  ));

  const handleAppend = () => {
    let newLinkedList = LinkedListFromArray(values);
    newLinkedList.append(10);
    setValues(newLinkedList.intoArray());
  };

  return (
    <>
      <button onClick={() => handleAppend()}>Add a bamboo section</button>
      <Canvas>
        <OrbitControls />
        <ambientLight />
        <pointLight />
        <camera position={[0, 5, -5]} />
        {children}
      </Canvas>
    </>
  );
};

export default LinkedList3D;
