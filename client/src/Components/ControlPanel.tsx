import { useEffect, useRef, useState } from "react";
import { Html } from "@react-three/drei";
import styled from "styled-components";
import { Direction } from "../gardenStore";
import { useGardenStore } from "../gardenStore";

const Screen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: red;
  opacity: 0.5;
`;

const Button = styled.button`
  background: transparent;
  color: white;
  border: 1px solid #717171;
  border-radius: 100px;
  cursor: default;
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

const PositionWrap = styled.div`
  display: flex;
  gap: 10px;
  margin: -25px 40px;
  width: 350px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border: 1px solid red;

  @media only screen and (max-width: 700px) {
    margin: -30px 25px;
    width: 150px;
  }
`;

const Arrow = styled.button`
  border: 1px solid #717171;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  font-size: 35px;
  margin: 0px;
  padding: 0px;
  width: 50px;
  height: 50px;
  background: transparent;
  color: #e4e4e4;
  cursor: default;

  &:hover {
    border: 1px solid #ddff00;
  }

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

const ArrowWrap = styled.div`
  margin: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

const LeftRightWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 160px;

  @media only screen and (max-width: 700px) {
    width: 125px;
  }
`;

type ControlPanelProps = {
  // data: LinkedList | DoublyCircularlyLinkedList;
  activeNodeId: number;
  moveOperations: Record<string, (direction: Direction) => void>;
  plantOperations: Record<string, () => void>;
  // an object - key: string, value: function
  nodeOperations: Record<string, (index: number) => void>;
};

const ControlPanel = ({
  activeNodeId,
  moveOperations,
  plantOperations,
  nodeOperations,
}: // data,
ControlPanelProps) => {
  const { setIsPointerLock, setActiveNode, setActivePlant } = useGardenStore();

  const [controlsHeight, setControlsHeight] = useState(0);
  const [controlsWidth, setControlsWidth] = useState(0);
  const positionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      const controlsHeight =
        positionRef.current?.getBoundingClientRect().height || 0;
      setControlsHeight(controlsHeight);

      const controlsWidth =
        positionRef.current?.getBoundingClientRect().width || 0;
      setControlsWidth(controlsWidth + 25);
    });
  }, []);

  const handleClick = () => {
    // e.preventDefault();
    // e.stopPropagation();
    console.log("screen clicked");
    setIsPointerLock(true);
    setActiveNode(-1);
    setActivePlant(-1);
  };

  return (
    // fix position
    <Html
      calculatePosition={() => {
        return [0, 0, 0];
      }}
    >
      <Screen onClick={handleClick}>
        <ArrowWrap>
          <Arrow
            onPointerDown={(e) => {
              e.stopPropagation();
              moveOperations.move(Direction.UP);
              e.preventDefault();
            }}
          >
            ↑
          </Arrow>
          <LeftRightWrap>
            <Arrow
              onPointerDown={(e) => {
                e.stopPropagation();
                moveOperations.move(Direction.LEFT);
              }}
            >
              ←
            </Arrow>
            <Arrow
              onPointerDown={(e) => {
                e.stopPropagation();
                moveOperations.move(Direction.RIGHT);
              }}
            >
              →
            </Arrow>
          </LeftRightWrap>
          <Arrow
            onPointerDown={(e) => {
              e.stopPropagation();
              moveOperations.move(Direction.DOWN);
            }}
          >
            ↓
          </Arrow>
        </ArrowWrap>
        <PositionWrap ref={positionRef}>
          {Object.keys(plantOperations).map((opName, index) => {
            const operation = plantOperations[opName];
            return (
              <Button
                key={index}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  operation();
                }}
                onDoubleClick={(e) => e.stopPropagation()}
              >
                {opName}
              </Button>
            );
          })}

          {Object.keys(nodeOperations).map((opName, index) => {
            const operation = nodeOperations[opName];
            return (
              <Button
                disabled={activeNodeId === -1}
                key={index}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  operation(activeNodeId);
                }}
                onDoubleClick={(e) => e.stopPropagation()}
              >
                {opName}
              </Button>
            );
          })}
        </PositionWrap>
      </Screen>
    </Html>
  );
};

export default ControlPanel;
