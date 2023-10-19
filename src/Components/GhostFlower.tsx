import { Cylinder } from "@react-three/drei";
import { ghostMaterial } from "../materials";

type GhostFlowerProps = {
  position: [number, number, number];
  rotation: [number, number, number];
};

const GhostFlower = (props: GhostFlowerProps) => {
  const { position, rotation } = props;

  const root = [2, 2, 2, 2, 2, 2];
  const children = [];

  // central hub node of the flower
  children.push(
    <Cylinder key={-1} args={[1, 2, 0.5]} material={ghostMaterial} />
  );

  // petal nodes of the flower
  root.forEach((nodeValue, index) => {
    children.push(
      <Cylinder
        key={index}
        position={[
          (nodeValue * 2 - 1.5) *
            Math.cos(((2 * Math.PI) / root.length) * index),
          index % 2 === 0 ? 0.05 : -0.05,
          (nodeValue * 2 - 1.5) *
            Math.sin(((2 * Math.PI) / root.length) * index),
        ]}
        args={[nodeValue, nodeValue, 0.1]}
        material={ghostMaterial}
      />
    );
  });

  return (
    <>
      <group position={position} rotation={rotation}>
        {children}
      </group>
    </>
  );
};

export default GhostFlower;
