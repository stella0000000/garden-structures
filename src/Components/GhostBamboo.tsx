import { Cylinder } from "@react-three/drei";
import { ghostMaterial } from "../materials";
import { Euler, Vector3 } from "three";

type GhostBambooProps = {
  position: [number, number, number];
  rotation: [number, number, number];
};

const GhostBamboo = (props: GhostBambooProps) => {
  const { position, rotation } = props;
  let cumulativeHeight = 0;

  const root = [2, 2, 2, 2, 2, 2];
  const children = [];
  children.push(
    <Cylinder
      key={-1}
      position={new Vector3(0, 0, 0.3)}
      rotation={rotation}
      args={[1, 2, 1]}
      material={ghostMaterial}
    />
  );
  root.forEach((nodeValue, index) => {
    // plant nodes
    children.push(
      <Cylinder
        key={index}
        position={new Vector3(0, cumulativeHeight + 0.5 * nodeValue, 0)}
        rotation={new Euler(0, 0, 0)}
        args={[1, 1, nodeValue]}
        material={ghostMaterial}
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
