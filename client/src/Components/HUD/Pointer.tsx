import styled from "styled-components";
import { Html } from "@react-three/drei";
import { useGardenStore } from "../../gardenStore";
import { useEffect } from "react";

const CenterWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-content: center;
`;

export const Pointer = () => {
  const { isPointerLock, setIsPointerLock } = useGardenStore();

  const handleClick = () => {
    if (!isPointerLock) {
      setIsPointerLock(true);
    }
  };

  return (
    <Html calculatePosition={() => [0, 0, 0]}>
      <CenterWrapper onClick={handleClick}>+</CenterWrapper>
    </Html>
  );
};
