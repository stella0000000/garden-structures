import { ThreeEvent } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { Vector3 } from "three";

type Node3DProps = {
  value: number;
  position: Vector3;
  rotation: Vector3;
  cylinderArgs: [number, number, number];
  isSelected: boolean;
  defaultColor: string;
  deselectAllNodes: () => void;
  selectNode: () => void;
  deselectAllPlants: () => void;
  selectPlant: () => void;
  materialOverride: THREE.Material | null;
};

const Node3D = (props: Node3DProps) => {
  const {
    position,
    rotation,
    deselectAllNodes,
    selectNode,
    deselectAllPlants,
    selectPlant,
    isSelected,
    cylinderArgs,
    defaultColor,
    materialOverride,
  } = props;
  const meshRef = useRef<THREE.Mesh>(null!);
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);

  return (
    <mesh
      ref={meshRef}
      scale={1}
      position={position}
      rotation={[rotation.x, rotation.y, rotation.z]}
      material={
        materialOverride ||
        new THREE.MeshBasicMaterial({
          wireframe: true,
          color: isSelected ? "white" : isHighlighted ? "grey" : defaultColor,
        })
      }
      onPointerEnter={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setIsHighlighted(true);
      }}
      onPointerLeave={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setIsHighlighted(false);
      }}
      onPointerMissed={(e: MouseEvent) => {
        e.stopPropagation();
        isSelected && deselectAllPlants();
        isSelected && deselectAllNodes();
      }}
      onPointerDown={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        selectPlant();
        selectNode();
      }}
    >
      {/* args are radiusTop, radiusBottom, height */}
      {materialOverride ? (
        <cylinderGeometry args={cylinderArgs} />
      ) : (
        <>
          <cylinderGeometry args={cylinderArgs} />
          <meshStandardMaterial
            wireframe={true}
            color={isSelected ? "white" : isHighlighted ? "grey" : defaultColor}
          />
        </>
      )}
    </mesh>
  );
};

export default Node3D;
