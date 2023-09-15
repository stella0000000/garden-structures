import { FirstPersonControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

type FirstPersonCameraControlsProps = {
  cameraRef: React.MutableRefObject<THREE.PerspectiveCamera>;
  planting: boolean;
};

const FirstPersonCameraControls = (props: FirstPersonCameraControlsProps) => {
  const { cameraRef, planting } = props;

  useFrame(() => {
    cameraRef.current.position.setComponent(1, 15);
  });

  return (
    <FirstPersonControls
      lookSpeed={0.01}
      movementSpeed={10}
      constrainVertical={true}
      heightSpeed={true}
      heightMin={0}
      heightMax={1}
      heightCoef={0.01}
      enabled={!planting}
      // mouseDragOn={false}
    />
  );
};

export default FirstPersonCameraControls;
