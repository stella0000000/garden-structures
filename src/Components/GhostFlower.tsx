import { Cylinder } from "@react-three/drei";
import { ghostMaterial } from "../materials";
import { Euler } from "three";

type GhostFlowerProps = {
  position: [number, number, number];
  rotation: [number, number, number];
};

const GhostFlower = (props: GhostFlowerProps) => {
  const { position, rotation } = props;

  const root = [2, 2, 2, 2, 2, 2];
  const children = [];

  // const rotationEuler = new Euler(rotation[0], rotation[1], rotation[2]);
  // const rotationQuat = new Quaternion().setFromEuler(rotationEuler);
  // const apply90DegreeRotationQuat = new Quaternion().setFromEuler(
  //   new Euler(1.5, 0, 0)
  // );

  // TODO: try adding instead
  // rotationQuat.multiply(apply90DegreeRotationQuat);
  // const newRotationEuler = new Euler().setFromQuaternion(rotationQuat);

  // central hub node of the flower
  children.push(
    <Cylinder
      key={-1}
      args={[1, 2, 0.5]}
      material={ghostMaterial}
      rotation={new Euler(1.5, 0, 0)}
    />
  );

  // petal nodes of the flower
  root.forEach((nodeValue, index) => {
    children.push(
      <Cylinder
        key={index}
        rotation={new Euler(1.5, 0, 0)}
        position={[
          (nodeValue * 2 - 1.5) *
            Math.cos(((2 * Math.PI) / root.length) * index),
          (nodeValue * 2 - 1.5) *
            Math.sin(((2 * Math.PI) / root.length) * index),
          index % 2 === 0 ? 0.05 : -0.05,
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
