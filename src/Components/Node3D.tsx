import { ThreeEvent } from "@react-three/fiber";
import { useRef } from "react";
import { Euler } from "three";

type Node3DProps = {
  value: number;
  position: [number, number, number];
  rotation: [number, number, number];
  cylinderArgs: [number, number, number];
  isSelected: boolean;
  defaultColor: string;
  selectedColor: string;
  deselectAllNodes: () => void;
  selectNode: () => void;
};

const Node3D = (props: Node3DProps) => {
  const {
    position,
    rotation,
    deselectAllNodes,
    selectNode,
    isSelected,
    cylinderArgs,
    defaultColor,
    selectedColor,
  } = props;
  const meshRef = useRef<THREE.Mesh>(null!);

  return (
    <mesh
      ref={meshRef}
      scale={1}
      position={position}
      rotation={rotation}
      onPointerEnter={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        selectNode();
      }}
      onPointerLeave={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        isSelected && deselectAllNodes();
      }}
      onPointerDown={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        console.log("pointerDown");
      }}
    >
      {/* args are radiusTop, radiusBottom, height */}
      <cylinderGeometry args={cylinderArgs} />
      <meshStandardMaterial
        wireframe={true}
        color={isSelected ? selectedColor : defaultColor}
      />
    </mesh>
  );
};

export default Node3D;
