import { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { LinkedList, LinkedListFromArray } from "../DataStructures/LinkedList";
import Node3D from "./Node3D";
import { Stats, OrbitControls } from "@react-three/drei";
import BambooStalk from "./BambooStalk";

enum ActivePlant {
  Bamboo,
  Flower,
}

const GlobalCanvas = () => {
  return (
    <>
      <Canvas>
        <OrbitControls />
        <ambientLight />
        <pointLight />
        <camera position={[0, 5, -5]} />
        <BambooStalk />
      </Canvas>
    </>
  );
};

export default GlobalCanvas;
