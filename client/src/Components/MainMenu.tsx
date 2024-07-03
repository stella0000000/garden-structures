import { Html } from "@react-three/drei";
import styled from "styled-components";
import { useGardenStore, PlantName } from "../gardenStore";
import { useEffect } from "react";

const StyledMenu = styled.div`
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  pointer-events: all;
  background: transparent;
  color: white;
  border: 1px solid #717171;
  border-radius: 100px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #e4e4e4;

  &:hover {
    border: 1px solid #ddff00;
  }

  &:disabled {
    opacity: 0.3;
    pointer-events: none;
  }

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

export const MainMenu = () => {
  const plantNames = Object.values(PlantName);
  const { setGhostType, setMenuOpen, setIsPointerLock } = useGardenStore();

  useEffect(() => {
    setIsPointerLock(false);
    return () => {
      setIsPointerLock(true);
    };
  }, []);

  return (
    <Html
      calculatePosition={() => {
        return [0, 0, 0];
      }}
    >
      <StyledMenu>
        {plantNames.map((item, i) => {
          const handleClick = (e: any) => {
            e.stopPropagation();
            e.preventDefault();
            setMenuOpen(false);
            setIsPointerLock(true);
            setGhostType(item);
          };

          return (
            <Button
              key={i}
              onClick={handleClick}
              onMouseEnter={() => setGhostType(item)}
              // style={currPlantIdx === i ? { background: "blue" } : {}}
            >
              {item}
            </Button>
          );
        })}
      </StyledMenu>
    </Html>
  );
};
