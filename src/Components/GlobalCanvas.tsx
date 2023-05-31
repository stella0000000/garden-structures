import { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { LinkedList, LinkedListFromArray } from "../DataStructures/LinkedList";
import Node3D from "./Node3D";
import { Stats, OrbitControls } from "@react-three/drei";

enum ActivePlant {
  Bamboo,
  Flower,
}

const GlobalCanvas = () => {
  const [activePlant, setActivePlant] = useState<ActivePlant>(
    ActivePlant.Bamboo
  );

  const root = new LinkedList();
  root.append(10);
  root.append(15);
  root.append(9);

  const [values, setValues] = useState(root.intoArray());

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

  const controls =
    activePlant == ActivePlant.Bamboo ? "BambooControls" : "FlowerControls";

  return (
    <>
      {controls}
      <button onClick={() => handleAppend()}>Add a bamboo section</button>
      <button onClick={() => handlePop()}>Remove a bamboo section</button>
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

export default GlobalCanvas;
