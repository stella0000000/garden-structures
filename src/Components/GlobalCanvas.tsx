import { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { LinkedList, LinkedListFromArray } from "../DataStructures/LinkedList";
import Node3D from "./Node3D";
import { Stats, OrbitControls } from "@react-three/drei";
import BambooStalk from "./BambooStalk";
import { Controls } from "react-three-gui";

enum ActivePlant {
  Bamboo,
  Flower,
}

const GlobalCanvas = () => {
  return (
    <>
      <Controls.Provider>
        <Controls.Canvas>
          <OrbitControls />
          <ambientLight />
          <pointLight />
          <camera position={[0, 5, -5]} />
          <BambooStalk />
        </Controls.Canvas>
        <Controls />
      </Controls.Provider>
    </>
  );
};

export default GlobalCanvas;
