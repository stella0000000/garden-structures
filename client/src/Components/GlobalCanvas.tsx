import { useRef } from "react";
import { Canvas, ThreeEvent } from "@react-three/fiber";
// import { Box } from "@react-three/drei";
import BambooStalk from "./BambooStalk";
import Flower from "./Flower";
import * as THREE from "three";
import PointerLockCameraControls from "./PointerLockCameraControls";
import Ground from "./Ground";
import GhostPlant from "./GhostPlant";
import Constellation from "./Constellation";
import { useGardenStore } from "../gardenStore";
import { HUD } from "./HUD/HUD";
import { LinkedList } from "../DataStructures/LinkedList";

export const camera = new THREE.PerspectiveCamera(45, 2, 1, 1000);

const GlobalCanvas = () => {
  const {
    activePlant,
    deselectAllPlants,
    plantCollection: plantData,
    ghostType,
  } = useGardenStore();

  const cameraRef = useRef(camera);
  const raycaster = useRef(new THREE.Raycaster());
  const plane = useRef<THREE.Mesh | null>(null);

  const updateRaycaster = () => {
    raycaster.current?.setFromCamera(new THREE.Vector2(), cameraRef.current);
  };

  const ghostPlantData = plantData[activePlant];

  const handleMissBoxClick = (e: ThreeEvent<PointerEvent>) => {
    console.log("miss box clicked");
    // if (!isPointerLock) {
    //   setIsPointerLock(true);
    // }
  };

  // renders the appropriate JSX for each plant in the PlantData based on type
  const children = () => {
    return plantData.map((plant, index) => {
      switch (plant.kind) {
        case "bamboo": {
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
        case "flower": {
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

        case "constellation": {
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
      {/* <Box
        args={[1000, 1000, 1000]}
        visible={true}
        onPointerDown={handleMissBoxClick}
        material={
          new THREE.MeshLambertMaterial({
            color: 0xfffeee,
            transparent: true,
            opacity: 1,
            side: THREE.BackSide,
          })
        }
      /> */}
      <Ground raycaster={raycaster} plane={plane} />
      {ghostType && (
        <GhostPlant
          // dataStructure={ghostPlantData}
          raycaster={raycaster}
          plane={plane}
          camera={cameraRef}
          ghostType={ghostType}
          // handleMissBoxClick={handleMissBoxClick}
        />
      )}
      {children()}
      {/* <Pointer /> */}
      <HUD />
    </Canvas>
  );
};

export default GlobalCanvas;
