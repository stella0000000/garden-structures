import { Cylinder } from "@react-three/drei";
import { ghostMaterial } from "../materials";
import { Vector3 } from "three";
import { ThreeEvent } from "@react-three/fiber";

type GhostBambooProps = {
  position: [number, number, number];
  rotation: [number, number, number];
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
};

const GhostBamboo = (props: GhostBambooProps) => {
  const { position, rotation, onClick } = props;
  let cumulativeHeight = 0;

  const root = [2, 2, 2, 2, 2, 2];
  const children = [];
  // root
  children.push(
    <Cylinder
      key={-1}
      position={new Vector3(0, -0.5, 0)}
      args={[1, 2, 1]}
      material={ghostMaterial}
      onClick={onClick}
    />
  );
  root.forEach((nodeValue, index) => {
    // plant nodes
    children.push(
      <Cylinder
        key={index}
        position={new Vector3(0, cumulativeHeight + 0.5 * nodeValue, 0)}
        args={[1, 1, nodeValue]}
        material={ghostMaterial}
        onClick={onClick}
      />
    );
    cumulativeHeight += nodeValue;
  });

  return (
    <>
      <group position={position} rotation={rotation}>
        {children}
      </group>
    </>
  );
};

export default GhostBamboo;
