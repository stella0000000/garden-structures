import { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { LinkedList, LinkedListFromArray } from "../DataStructures/LinkedList";
import { Stats, OrbitControls } from "@react-three/drei";
import BambooStalk from "./BambooStalk";
import { DoublyCircularlyLinkedList } from "../DataStructures/DoublyCircularlyLinkedList";

/* plant data is stored at the topmost level as a React antipattern,
 * until we figure out a better way to integrate ui controls inside the canvas
 */
type BambooStalkData = {
  kind: "BambooStalkData";
  data: LinkedList;
  positionOffsets: [number, number, number];
};

type FlowerData = {
  kind: "FlowerData";
  data: DoublyCircularlyLinkedList;
  positionOffsets: [number, number, number];
};

type PlantCollection = (BambooStalkData | FlowerData)[];

// dummy values for use during local testing
const testingBamboo: BambooStalkData = {
  kind: "BambooStalkData",
  data: LinkedListFromArray([2, 8, 12, 2]),
  positionOffsets: [0, 0, 0],
};

const testingBamboo2: BambooStalkData = {
  kind: "BambooStalkData",
  data: LinkedListFromArray([4, 6, 8, 2]),
  positionOffsets: [4, 0, 1],
};
const testingBamboo3: BambooStalkData = {
  kind: "BambooStalkData",
  data: LinkedListFromArray([2, 6, 4, 2]),
  positionOffsets: [2, 0, 2],
};

const initialTestingState: PlantCollection = [
  testingBamboo,
  testingBamboo2,
  testingBamboo3,
];

const GlobalCanvas: React.FC = () => {
  const [plantData, setPlantData] =
    useState<PlantCollection>(initialTestingState);

  // renders the appropriate JSX for each plant in the PlantData based on type
  const children = () => {
    return plantData?.map((plant, index) => {
      switch (plant.kind) {
        case "BambooStalkData": {
          // sets x offset for this BambooStalk based on its index in the plantData array
          return (
            <BambooStalk
              root={plant.data}
              positionOffsets={plant.positionOffsets}
            />
          );
        }
        case "FlowerData": {
          // TODO: UNIMPLEMENTED: component for rendering flowers
          return <></>;
        }
        default: {
          // !UNREACHABLE
          return <></>;
        }
      }
    });
  };

  return (
    <>
      <Canvas>
        <OrbitControls />
        <ambientLight />
        <pointLight />
        <camera position={[0, 5, -5]} />
        {children()}
      </Canvas>
    </>
  );
};

export default GlobalCanvas;
