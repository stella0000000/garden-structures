import { PointerLockControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import useFirstPersonControls from "../Hooks/useFirstPersonControls";
import * as THREE from "three";
import { useGardenStore } from "../gardenStore";

type PointerLockCameraControlsProps = {
  cameraRef: React.MutableRefObject<THREE.PerspectiveCamera>;
  planting: boolean;
  deselectAllPlants: () => void;
  // plane: React.MutableRefObject<THREE.Mesh | null>;
  // raycaster: React.MutableRefObject<THREE.Raycaster | null>;
  updateRaycaster: () => void;
};

const PointerLockCameraControls = ({
  cameraRef,
  updateRaycaster,
}: PointerLockCameraControlsProps) => {
  const pointerLockRef = useRef<any>(null);
  const keyStates = useFirstPersonControls();
  const { isPointerLock } = useGardenStore();

  useFrame(() => {
    // console.log(raycaster.current, plane.current);
    updateRaycaster();
    // console.log(raycaster.current?.intersectObject(plane.current!));
  });

  useEffect(() => {
    if (isPointerLock) {
      pointerLockRef.current.lock();
    } else {
      pointerLockRef.current.unlock();
    }
  }, [isPointerLock]);

  useEffect(() => {
    cameraRef.current.position.setComponent(2, 150);
  }, []);

  useFrame(() => {
    let x = 0;
    let z = 0;
    if (keyStates.forward) z += 1;
    if (keyStates.back) z -= 1;
    if (keyStates.right) x += 1;
    if (keyStates.left) x -= 1;

    // every frame sets height of camera to 15
    // "eye-level"
    const cameraQuat = cameraRef.current.quaternion;
    const playerMovement = new THREE.Vector3(x, 0, -z);
    playerMovement.applyQuaternion(cameraQuat);

    cameraRef.current.position.add(playerMovement);
    cameraRef.current.position.setComponent(1, 15);
  });

  return (
    <PointerLockControls
      camera={cameraRef.current}
      ref={pointerLockRef}
      // onLock={() => deselectAllPlants()}
    />
  );
};

export default PointerLockCameraControls;
