import { useEffect, useRef } from "react";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import BambooStalk from "./BambooStalk";
import Flower from "./Flower";
import * as THREE from "three";
import PointerLockCameraControls from "./PointerLockCameraControls";
import Ground from "./Ground";
import GhostPlant from "./GhostPlant";
import Constellation from "./Constellation";
import { useGardenStore } from "../gardenStore";
import { MainMenu } from "./MainMenu";

export const camera = new THREE.PerspectiveCamera(45, 2, 1, 1000);

const GlobalCanvas = ({}) => {
  const {
    activePlant,
    deselectAllPlants,
    plantCollection: plantData,
    setMenuOpen,
    menuOpen,
    setIsPointerLock,
    ghostType,
  } = useGardenStore();

  useEffect(() => {
    const handleKeypress = (e: KeyboardEvent) => {
      if (e.key === "e") {
        if (menuOpen) {
          // closing the menu
          setMenuOpen(false);
          setIsPointerLock(true);
        } else {
          // opening the menu
          setMenuOpen(true);
          setIsPointerLock(false);
        }
      }
    };

    addEventListener("keypress", handleKeypress);
    return () => removeEventListener("keypress", handleKeypress);
  }, [menuOpen, setMenuOpen]);

  const cameraRef = useRef(camera);
  const raycaster = useRef(new THREE.Raycaster());
  const plane = useRef<THREE.Mesh | null>(null);

  const updateRaycaster = () => {
    raycaster.current?.setFromCamera(new THREE.Vector2(), cameraRef.current);
  };

  // renders the appropriate JSX for each plant in the PlantData based on type
  const children = () => {
    return plantData.map((plant, index) => {
      switch (plant.kind) {
        case "BambooStalkData": {
          return (
            <BambooStalk
              key={index}
              plantIndex={index}
              cameraRef={cameraRef}
              root={plant.data}
              position={plant.position}
              rotation={plant.rotation}
            />
          );
        }
        case "FlowerData": {
          return (
            <Flower
              key={index}
              plantIndex={index}
              root={plant.data}
              position={plant.position}
              rotation={plant.rotation}
            />
          );
        }

        case "ConstellationData": {
          return (
            <Constellation
              key={index}
              index={index}
              data={plant.data}
              position={plant.position}
              rotation={plant.rotation}
              isActive={activePlant === index}
            />
          );
        }
        default: {
          // unreachable
          return <></>;
        }
      }
    });
  };

  return (
    <Canvas camera={cameraRef.current}>
      <PointerLockCameraControls
        cameraRef={cameraRef}
        planting={activePlant !== -1}
        deselectAllPlants={deselectAllPlants}
        updateRaycaster={updateRaycaster}
      />
      <ambientLight intensity={1} />
      <directionalLight intensity={1} />
      {/* World box for missed click events */}
      <Box
        args={[75, 75, 75]}
        visible={true}
        onPointerDown={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          deselectAllPlants();
        }}
        material={
          new THREE.MeshLambertMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0,
            side: THREE.BackSide,
          })
        }
      />
      <Ground raycaster={raycaster} plane={plane} />
      {ghostType && (
        <GhostPlant raycaster={raycaster} plane={plane} camera={cameraRef} />
      )}
      {children()}
      {menuOpen && <MainMenu />}
    </Canvas>
  );
};

export default GlobalCanvas;
