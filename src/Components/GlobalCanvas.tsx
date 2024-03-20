import { useReducer, useRef } from "react";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import BambooStalk from "./BambooStalk";
import Flower from "./Flower";
import gardenReducer from "../Hooks/Reducers/gardenReducer";
import * as THREE from "three";
import PointerLockCameraControls from "./PointerLockCameraControls";
import Ground from "./Ground";
import GhostPlant from "./GhostPlant";
import Constellation from "./Constellation";
import { useGardenStore } from "../gardenStore";
import { initialState } from "../initialState";

export const camera = new THREE.PerspectiveCamera(45, 2, 1, 1000);

type GlobalCanvasProps = {
  isPointerLock: boolean;
  setIsPointerLock: () => void;
};

const GlobalCanvas = ({
  isPointerLock,
  setIsPointerLock,
}: GlobalCanvasProps) => {
  const [_, dispatch] = useReducer(gardenReducer, initialState);

  const {
    activePlant,
    deselectAllPlants,
    plantCollection: plantData,
  } = useGardenStore();

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
              gardenDispatch={dispatch}
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
              gardenDispatch={dispatch}
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
              gardenDispatch={dispatch}
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
        isPointerLock={isPointerLock}
        setIsPointerLock={setIsPointerLock}
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
      <GhostPlant
        raycaster={raycaster}
        plane={plane}
        dispatch={dispatch}
        camera={cameraRef}
      />
      {children()}
    </Canvas>
  );
};

export default GlobalCanvas;
