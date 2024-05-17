import { ThreeEvent } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { Euler, Vector3 } from "three";
import { selectedMaterial, hoveredMaterial } from "../materials";
import { useGardenStore } from "../gardenStore";

export type Node3DProps = {
  value: number;
  position: Vector3;
  rotation: Vector3;
  geometry: THREE.CylinderGeometry;
  cylinderArgs: [number, number, number];
  isSelected: boolean;
  defaultMaterial: THREE.Material;
  deselectAllNodes: () => void;
  selectNode: () => void;
  selectParentPlant: () => void;
  opacity?: number;
  transparent?: boolean;
};

const Node3D = ({
  position,
  rotation,
  deselectAllNodes,
  selectNode,
  selectParentPlant,
  isSelected,
  geometry,
  cylinderArgs,
  defaultMaterial,
}: Node3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);
  const { deselectAllPlants } = useGardenStore();

  return (
    <mesh
      ref={meshRef}
      scale={[cylinderArgs[0], cylinderArgs[2], cylinderArgs[0]]}
      position={position}
      rotation={new Euler(rotation.x, rotation.y, rotation.z)}
      material={
        isSelected
          ? selectedMaterial
          : isHighlighted
          ? hoveredMaterial
          : defaultMaterial
      }
      geometry={geometry}
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
        selectParentPlant();
        selectNode();
      }}
    ></mesh>
  );
};

export default Node3D;
