import { ThreeEvent } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { Euler, Vector3 } from "three";
import { selectedMaterial, hoveredMaterial } from "../materials";

export type Node3DProps = {
  value: number;
  position: Vector3;
  rotation: Vector3;
  cylinderArgs: [number, number, number];
  isSelected: boolean;
  defaultMaterial: THREE.Material;
  deselectAllNodes: () => void;
  selectNode: () => void;
  deselectAllPlants: () => void;
  selectPlant: () => void;
  opacity?: number;
  transparent?: boolean;
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
    opacity,
    transparent,
    defaultMaterial,
  } = props;
  const meshRef = useRef<THREE.Mesh>(null!);
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);

  return (
    <mesh
      ref={meshRef}
      scale={1}
      position={position}
      rotation={new Euler(rotation.x, rotation.y, rotation.z)}
      material={
        isSelected
          ? selectedMaterial
          : isHighlighted
          ? hoveredMaterial
          : defaultMaterial
      }
      geometry={new THREE.CylinderGeometry(...cylinderArgs)}
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
    ></mesh>
  );
};

export default Node3D;
