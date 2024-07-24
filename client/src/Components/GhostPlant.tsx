import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useState } from "react";
import GhostFlower from "./GhostFlower";

import { Camera } from "three";
import GhostBamboo from "./GhostBamboo";
import { useGardenStore, PlantName, MenuMode } from "../gardenStore";
import { Box } from "@react-three/drei";
import * as THREE from "three";
import { LinkedList } from "../DataStructures/LinkedList";
import { DoublyCircularlyLinkedList } from "../DataStructures/DoublyCircularlyLinkedList";

type GhostPlantProps = {
  // dataStructure: LinkedList | DoublyCircularlyLinkedList ;
  ghostType: PlantName;
  raycaster: React.MutableRefObject<THREE.Raycaster | null>;
  plane: React.MutableRefObject<THREE.Mesh | null>;
  camera: React.MutableRefObject<Camera | null>;
  // handleMissBoxClick: (e: ThreeEvent<PointerEvent>) => void;
};

const GhostPlant = ({
  // dataStructure,
  ghostType,
  raycaster,
  plane,
  camera,
}: GhostPlantProps) => {
  const { menuMode, isPointerLock } = useGardenStore();
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  const { addPlant: appendPlant } = useGardenStore();

  // convert state to Euler
  // convert Euler to Quat
  // apply manipulation
  // convert back to Euler
  // convert back to [number, number, number]

  const handleClick = () => {
    // ignore click propagating from a menu-closing action
    // ignore click propagating from re-enabling pointerlock
    if (menuMode === MenuMode.NONE && isPointerLock) {
      handleInsert();
    }
  };

  const handleInsert = () => {
    appendPlant(
      ghostType,
      [position[0], position[1] + 5, position[2]],
      rotation
    );
  };

  useFrame(() => {
    updateGhostPlantRotation();
    // console.log(raycaster.current!.intersectObject(plane.current!)[0].point);
    const intersections = raycaster.current!.intersectObject(plane.current!);
    if (intersections.length) {
      setPosition([
        intersections[0].point.x,
        intersections[0].point.y - 5, // change this, but then doesn't work!
        intersections[0].point.z,
      ]);
    }
  });

  const updateGhostPlantRotation = () => {
    // Force the ghost plant to look at the camera for flowers
    if (ghostType === PlantName.FLOWER) {
      if (raycaster.current && camera.current) {
        const cameraFacing = camera.current.rotation;
        setRotation([cameraFacing.x, cameraFacing.y, cameraFacing.z]);
      }
      // force bamboos rotation always upward
    } else if (ghostType === PlantName.BAMBOO) {
      setRotation([0, 0, 0]);
    }
  };

  return (
    <>
      {ghostType === PlantName.FLOWER ? (
        <GhostFlower
          // dataStructure={dataStructure as DoublyCircularlyLinkedList}
          position={[position[0], position[1] + 5, position[2]]}
          rotation={[rotation[0], rotation[1], rotation[2]]}
        />
      ) : (
        <GhostBamboo
          // dataStructure={dataStructure as LinkedList}
          position={[position[0], position[1] + 5, position[2]]}
          rotation={[rotation[0], rotation[1], rotation[2]]}
        />
      )}

      {/* background click-catcher */}
      <Box
        args={[1000, 1000, 1000]}
        visible={true}
        onClick={handleClick}
        material={
          new THREE.MeshLambertMaterial({
            color: 0xfffeee,
            transparent: true,
            opacity: 0.01,
            side: THREE.BackSide,
          })
        }
      />
    </>
  );
};

export default GhostPlant;
