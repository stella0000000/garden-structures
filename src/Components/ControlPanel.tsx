import { useEffect, useRef, useState } from "react";
import { DoublyCircularlyLinkedList } from "../DataStructures/DoublyCircularlyLinkedList";
import { LinkedList } from "../DataStructures/LinkedList";
import { Html } from "@react-three/drei";
import styled from "styled-components";
import { Direction } from "../Hooks/Reducers/gardenReducer";

const Button = styled.button`
  width: auto;
  height: 45px;
  background: transparent;
  color: white;
  border: 1px solid #ffc3db;
  border-radius: 100px;
  cursor: default;

  &:hover {
    border: 1px solid #ddff00;
  }

  &:disabled {
    opacity: 0.3;
    pointer-events: none;
  }
`;

const PositionWrap = styled.div`
  display: flex;
  gap: 10px;
  margin: -40px -10px;
  width: 300px;
  height: 150px;
  justify-content: center;
  align-items: center;
  /* height: 300px; */
  /* border: 1px solid red; */
  flex-wrap: wrap;
`;

const Arrow = styled.button`
  border: 1px solid #ffc3db;
  border-radius: 100px;
  text-align: center;
  font-size: 40px;
  font-weight: 500px;
  margin: 0px;
  padding: 0px;
  width: 65px;
  height: 65px;
  background: transparent;
  color: white;
  cursor: default;

  &:hover {
    border: 1px solid #ddff00;
  }
`

const ArrowWrap = styled.div`
  margin: -30px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LeftRightWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 190px;
`

type ControlPanelProps = {
  data: LinkedList | DoublyCircularlyLinkedList;
  activeNodeId: number;
  moveOperations: Record<string, (direction: Direction) => void>;
  plantOperations: Record<string, () => void>;
    // an object - key: string, value: function
  nodeOperations: Record<string, (index: number) => void>;
};

const ControlPanel = (props: ControlPanelProps) => {
  const {
    activeNodeId,
    moveOperations,
    plantOperations,
    nodeOperations
  } = props;
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

  return (
    // fix position
    <>
      <Html
      calculatePosition={() => {
        return [0, window.innerHeight - 200, 0]
      }}>
        <ArrowWrap>
          <Arrow
            onPointerDown={(e) => {
              e.stopPropagation();
              moveOperations.move(Direction.UP)
            }}>↑</Arrow>
          <LeftRightWrap>
            <Arrow
              onPointerDown={(e) => {
                e.stopPropagation();
                moveOperations.move(Direction.LEFT)
              }}>←</Arrow>
            <Arrow
            onPointerDown={(e) => {
              e.stopPropagation();
              moveOperations.move(Direction.RIGHT)
            }}>→</Arrow>
          </LeftRightWrap>
          <Arrow
            onPointerDown={(e) => {
              e.stopPropagation();
              moveOperations.move(Direction.DOWN)
            }}>↓</Arrow>
        </ArrowWrap>
      </Html>
      <Html
        // fullscreen
        calculatePosition={() => {
          return [window.innerWidth - controlsWidth, window.innerHeight - controlsHeight, 0];
        }}
      >
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
      </Html>
    </>
  );
};

export default ControlPanel;
