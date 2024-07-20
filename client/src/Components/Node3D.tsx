import { ThreeEvent } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { Euler, Vector3 } from "three";
import { selectedMaterial, hoveredMaterial } from "../materials";
import { MenuMode, useGardenStore } from "../gardenStore";

export type Node3DProps = {
  value: number;
  position: Vector3;
  rotation: Vector3;
  geometry: THREE.CylinderGeometry;
  cylinderArgs: [number, number, number];
  isSelected: boolean;
  defaultMaterial: THREE.Material;
  selectNode: () => void;
  selectParentPlant: () => void;
  opacity?: number;
  transparent?: boolean;
};

const Node3D = ({
  position,
  rotation,
  selectNode,
  selectParentPlant,
  isSelected,
  geometry,
  cylinderArgs,
  defaultMaterial,
}: Node3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { menuMode, ghostType } = useGardenStore();

  const acceptingPointerActions = menuMode == MenuMode.NONE && !ghostType;

  const handleNodeClick = (e: ThreeEvent<MouseEvent>) => {
    if (acceptingPointerActions) {
      e.stopPropagation();
      selectParentPlant();
      selectNode();
    }
  };

  return (
    <mesh
      ref={meshRef}
      scale={[cylinderArgs[0], cylinderArgs[2], cylinderArgs[0]]}
      position={position}
      rotation={new Euler(rotation.x, rotation.y, rotation.z)}
      material={
        isSelected
          ? selectedMaterial
          : isHovered && acceptingPointerActions
          ? hoveredMaterial
          : defaultMaterial
      }
      geometry={geometry}
      onPointerEnter={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerLeave={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
      onPointerDown={handleNodeClick}
    ></mesh>
  );
};

export default Node3D;
