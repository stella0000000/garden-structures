import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Text } from "@react-three/drei";
import { Vector3 } from "three";

type NodeNumberProps = {
  isDataMode: boolean;
  cameraRef: any; // fix
  content: string;
  position: Vector3;
};

export const NodeNumber = (props: NodeNumberProps) => {
  const { cameraRef, isDataMode, content, position } = props;
  const nodeRef = useRef<THREE.Mesh | null>(null);

  useFrame(() => {
    if (isDataMode) nodeRef.current!.lookAt(cameraRef.current!.position);
    // console.log(cameraRef.current.position);
  });

  return (
    <Text
      ref={nodeRef}
      scale={[2, 2, 2]}
      position={position}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      {content}
    </Text>
  );
};
