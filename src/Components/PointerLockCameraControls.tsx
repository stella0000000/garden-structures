import { PointerLockControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import useFirstPersonControls from "../Hooks/useFirstPersonControls";
import * as THREE from "three";

type PointerLockCameraControlsProps = {
  cameraRef: React.MutableRefObject<THREE.PerspectiveCamera>;
  planting: boolean;
  isPointerLock: boolean;
  setIsPointerLock: () => void;
  deselectAllPlants: () => void;
};

const PointerLockCameraControls = (props: PointerLockCameraControlsProps) => {
  const {
    cameraRef,
    planting,
    deselectAllPlants
   } = props;
  const pointerLockRef = useRef<any>(null)
  const keyStates = useFirstPersonControls()

  useEffect(() => {
    if (planting) pointerLockRef.current.unlock()
  }, [planting])

  useEffect(()=> {
    cameraRef.current.position.setComponent(2, 50);
  }, [])

  useFrame(() => {
    let x = 0
    let z = 0
    if (keyStates.forward) z += 1
    if (keyStates.down) z -= 1
    if (keyStates.right) x += 1
    if (keyStates.left) x -= 1

    // every frame sets height of camera to 15
    // "eye-level"
    cameraRef.current.position.setComponent(1, 15);
    const quaternion = cameraRef.current.quaternion
    const { y: yRotation, z: zRotation } = new THREE.Euler().setFromQuaternion(quaternion) // plane locked to left / right
    const player2dRotation = new THREE.Euler(yRotation, zRotation)  // 1 of the 3 will be set to 0, ben doesn't know which one
    const playerMovement = new THREE.Vector3(x, z) // one should also be zero, ben doesn't know which one
    playerMovement.applyEuler(player2dRotation)
    cameraRef.current.position.add(playerMovement)
  })

  return (
    <PointerLockControls
      camera={cameraRef.current}
      ref={pointerLockRef}
      onLock={() => deselectAllPlants()}
    />

  );
};

export default PointerLockCameraControls;
