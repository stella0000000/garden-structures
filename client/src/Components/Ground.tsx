import { Euler } from "three";
import { dirtMaterial } from "../materials";
import { Plane } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

type GroundProps = {
  raycaster: React.MutableRefObject<THREE.Raycaster | null>;
  plane: React.MutableRefObject<THREE.Mesh | null>;
};

const Ground = (props: GroundProps) => {
  const { raycaster, plane } = props;

  useFrame(() => {
    raycaster.current?.intersectObject(plane.current!);
  });

  return (
    <Plane
      ref={plane}
      args={[1000, 1000]}
      rotation={new Euler(-Math.PI / 2, 0, 0)}
      material={dirtMaterial}
    />
  );
};

export default Ground;
