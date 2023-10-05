import { Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

type GhostPlantProps = {
  raycaster: React.MutableRefObject<THREE.Raycaster | null>;
  plane: React.MutableRefObject<THREE.Mesh | null>;
};

const GhostPlant = (props: GhostPlantProps) => {
  const { raycaster, plane } = props;

  const box = useRef<THREE.Mesh | null>(null);

  useFrame(() => {
    // console.log(raycaster.current!.intersectObject(plane.current!)[0].point);
    const intersections = raycaster.current!.intersectObject(plane.current!);
    if (intersections.length) {
      box.current?.position.set(
        intersections[0].point.x,
        intersections[0].point.y,
        intersections[0].point.z
      );
    }
  });

  return <Box ref={box} />;
};

export default GhostPlant;
