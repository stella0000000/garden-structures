import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import GhostFlower from "./GhostFlower";

import { Camera } from "three";
import GhostBamboo from "./GhostBamboo";
import { useGardenStore, PlantName, MenuMode } from "../gardenStore";

type GhostPlantProps = {
  raycaster: React.MutableRefObject<THREE.Raycaster | null>;
  plane: React.MutableRefObject<THREE.Mesh | null>;
  camera: React.MutableRefObject<Camera | null>;
};

const GhostPlant = ({ raycaster, plane, camera }: GhostPlantProps) => {
  const { ghostType, menuMode, isPointerLock } = useGardenStore();
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
    if (ghostType) {
      appendPlant(
        ghostType,
        [position[0], position[1] + 5, position[2]],
        rotation
      );
    }
  };

  useFrame(() => {
    updateGhostPlantRotation();
    // console.log(raycaster.current!.intersectObject(plane.current!)[0].point);
    const intersections = raycaster.current!.intersectObject(plane.current!);
    if (intersections.length) {
      setPosition([
        intersections[0].point.x,
        intersections[0].point.y - 5,
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
          onClick={handleClick}
          position={[position[0], position[1] + 5, position[2]]}
          rotation={[rotation[0], rotation[1], rotation[2]]}
        />
      ) : (
        <GhostBamboo
          onClick={handleClick}
          position={[position[0], position[1] + 5, position[2]]}
          rotation={[rotation[0], rotation[1], rotation[2]]}
        />
      )}
    </>
  );
};

export default GhostPlant;
