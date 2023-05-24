import { ThreeElements, useFrame } from "@react-three/fiber";
import { useRef } from "react";

type Node3DProps = {
  value: number;
  position: [number, number, number];
};

const Node3D = (props: Node3DProps) => {
  const { value, position } = props;
  const meshRef = useRef<THREE.Mesh>(null!);
  // useFrame((state, delta) => (meshRef.current.rotation.x += delta));

  return (
    <mesh ref={meshRef} scale={1} position={position}>
      {/* args are radiusTop, radiusBottom, height */}
      <cylinderGeometry args={[1, 1, 3]} />
      <meshStandardMaterial wireframe={true} color={"green"} />
    </mesh>
  );
};

export default Node3D;
