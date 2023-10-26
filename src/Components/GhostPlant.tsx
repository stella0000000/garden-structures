import { useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useState } from "react";
import GhostFlower from "./GhostFlower";
import {
  GardenReducerAction,
  OpName,
  PlantName,
} from "../Hooks/Reducers/gardenReducer";
import { Quaternion, Vector3 } from "three";

type GhostPlantProps = {
  raycaster: React.MutableRefObject<THREE.Raycaster | null>;
  plane: React.MutableRefObject<THREE.Mesh | null>;
  dispatch: React.Dispatch<GardenReducerAction>;
};

const GhostPlant = (props: GhostPlantProps) => {
  const { raycaster, plane, dispatch } = props;
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [rotation, setRotation] = useState<Vector3>(new Vector3());

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

  // useEffect(() => {
  //   // console.log(position);
  // }, position);

  useFrame(() => {
    ///////////
    // Zack: Why the heck isn't cameraVec updating when camera moves????
    //////////
    const cameraQuat = raycaster.current?.camera.quaternion;
    const cameraVec = new Vector3(0, 0, 0).applyQuaternion(
      cameraQuat || new Quaternion()
    );
    console.log(cameraVec);
    setRotation(cameraVec);

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

  const handleInsert = useCallback(() => {
    console.log(position);
    const action: GardenReducerAction = {
      type: "gardenOperation",
      payload: {
        position: [position[0], position[1] + 5, position[2]],
        plantName: PlantName.FLOWER,
        opName: OpName.APPEND,
        rotation: [1.5708, 0, 0],
      },
    };
    dispatch(action);
  }, [position]);

  return (
    <GhostFlower
      position={[position[0], position[1] + 5, position[2]]}
      rotation={[
        rotation.getComponent(0),
        rotation.getComponent(1),
        rotation.getComponent(2),
      ]}
    />
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
