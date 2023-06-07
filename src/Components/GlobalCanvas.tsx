import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { LinkedList, LinkedListFromArray } from "../DataStructures/LinkedList";
import { OrbitControls, Plane } from "@react-three/drei";
import BambooStalk from "./BambooStalk";
import {
  CircularlyLinkedListFromArray,
  DoublyCircularlyLinkedList,
} from "../DataStructures/DoublyCircularlyLinkedList";
import Flower from "./Flower";
import useActiveItem from "../Hooks/useActiveItem";
import * as THREE from "three";

/* plant data is stored at the topmost level as a React antipattern,
 * until we figure out a better way to integrate ui controls inside the canvas
 */
type Transform3D = {
  position: [number, number, number];
  rotation: [number, number, number];
};

type BambooStalk = {
  kind: "BambooStalkData";
  data: LinkedList;
};

type BambooStalkData = BambooStalk & Transform3D;

type Flower = {
  kind: "FlowerData";
  data: DoublyCircularlyLinkedList;
};
type FlowerData = Flower & Transform3D;

type PlantCollection = (BambooStalkData | FlowerData)[];

// dummy values for use during local testing
const testingBamboo: BambooStalkData = {
  kind: "BambooStalkData",
  data: LinkedListFromArray([2, 8, 12, 2]),
  position: [0, 0, 0],
  rotation: [0, 0, 0],
};

const testingBamboo2: BambooStalkData = {
  kind: "BambooStalkData",
  data: LinkedListFromArray([4, 6, 8, 2]),
  position: [4, 0, 1],
  rotation: [0, 0, 0],
};
const testingBamboo3: BambooStalkData = {
  kind: "BambooStalkData",
  data: LinkedListFromArray([2, 6, 4, 2]),
  position: [2, 0, 2],
  rotation: [0, 0, 0],
};

const testingFlower1: FlowerData = {
  kind: "FlowerData",
  data: CircularlyLinkedListFromArray([2, 2, 2, 2, 2, 2]),
  position: [12, 4, 2],
  rotation: [1.5708, 0, 0],
};

const initialTestingState: PlantCollection = [
  testingBamboo,
  testingBamboo2,
  testingBamboo3,
  testingFlower1,
];

const texture = new THREE.TextureLoader().load("dirt.jpeg");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(4, 4);

const dirtMaterial = new THREE.MeshBasicMaterial({
  map: texture,
  color: "rgb(135, 111, 89)",
});

const GlobalCanvas: React.FC = () => {
  const [plantData, setPlantData] =
    useState<PlantCollection>(initialTestingState);
  const { activeItem, selectItem, deselectAllItems } = useActiveItem();

  // renders the appropriate JSX for each plant in the PlantData based on type
  const children = () => {
    return plantData?.map((plant, index) => {
      switch (plant.kind) {
        case "BambooStalkData": {
          // sets x offset for this BambooStalk based on its index in the plantData array
          return (
            <BambooStalk
              root={plant.data}
              positionOffsets={plant.position}
              selectPlant={() => selectItem(index)}
              deselectAllPlants={deselectAllItems}
              isActive={activeItem === index}
            />
          );
        }
        case "FlowerData": {
          // TODO: UNIMPLEMENTED: component for rendering flowers
          return (
            <Flower
              root={plant.data}
              positionOffsets={plant.position}
              rotationOffsets={plant.rotation}
              selectPlant={() => selectItem(index)}
              deselectAllPlants={deselectAllItems}
              isActive={activeItem === index}
            />
          );
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
        <ambientLight intensity={1} />
        <directionalLight intensity={1}></directionalLight>
        <camera position={[0, 5, -5]} />
        {children()}
        <Plane
          args={[20, 20]}
          rotation={[-1.57, 0, 0]}
          material={dirtMaterial}
        ></Plane>
      </Canvas>
    </>
  );
};

export default GlobalCanvas;
