import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import GhostFlower from "./GhostFlower";

import { Camera } from "three";
import GhostBamboo from "./GhostBamboo";
import Carousel from "./Carousel";
import { useGardenStore, PlantName } from "../gardenStore";

type GhostPlantProps = {
  raycaster: React.MutableRefObject<THREE.Raycaster | null>;
  plane: React.MutableRefObject<THREE.Mesh | null>;
  camera: React.MutableRefObject<Camera | null>;
};

const GhostPlant = (props: GhostPlantProps) => {
  const { raycaster, plane, camera } = props;
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [ghostType, setGhostType] = useState<PlantName>(PlantName.FLOWER);
  const { addPlant: appendPlant } = useGardenStore();

  // convert state to Euler
  // convert Euler to Quat
  // apply manipulation
  // convert back to Euler
  // convert back to [number, number, number]

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key == "g") {
      handleInsert();
    }
  };

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
    // window.addEventListener("click", handleInsert);
    // return () => {
    //   window.removeEventListener("click", handleInsert);
    // };
  }, [position]);

  useFrame(() => {
    updateGhostPlantRotation();
    // console.log(raycaster.current!.intersectObject(plane.current!)[0].point);
    const intersections = raycaster.current!.intersectObject(plane.current!);
    if (intersections.length) {
      setPosition([
        intersections[0].point.x,
        intersections[0].point.y,
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

  const handleInsert = () => {
    appendPlant(
      ghostType,
      [position[0], position[1] + 5, position[2]],
      rotation
    );
    // const action: GardenReducerAction = {
    //   type: "gardenOperation",
    //   payload: {
    //     position: [position[0], position[1] + 5, position[2]],
    //     plantName: ghostType,
    //     opName: OpName.APPEND,
    //     rotation: rotation,
    //   },
    // };
    // dispatch(action);
  };

  return (
    <>
      {ghostType === PlantName.FLOWER ? (
        <GhostFlower
          position={[position[0], position[1] + 5, position[2]]}
          rotation={[rotation[0], rotation[1], rotation[2]]}
        />
      ) : (
        <GhostBamboo
          position={[position[0], position[1] + 5, position[2]]}
          rotation={[rotation[0], rotation[1], rotation[2]]}
        />
      )}
      <Carousel {...{ setGhostType, ghostType }} />
    </>
  );
};

export default GhostPlant;

/**
 * <Carousel /> takes in <GhostFlower />, <GhostBamboo />
 *
 * armementarium: flower, bamboo
 *  array of preconstructed models
 *    including meshes, materials, etc
 *
 * carousel of choices
 *  display single type
 *
 * scroll behavior to go through choices
 *  scroll changes index in array, probably need %
 *
 *
 * click to select + plant that type
 *
 *
 *
 */
