import { useEffect, useRef, useState } from "react";
import { DoublyCircularlyLinkedList } from "../DataStructures/DoublyCircularlyLinkedList";
import { LinkedList } from "../DataStructures/LinkedList";
import { Html } from "@react-three/drei";
import styled from "styled-components";
import { Direction } from "../Hooks/Reducers/gardenReducer";

const Button = styled.button`
  /* width: auto; */
  height: 40px;
  background: transparent;
  color: white;
  border: 1px solid #ff0088;
  border-radius: 100px;
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border: 1px solid #ddff00;
  }

  &:disabled {
    opacity: 0.3;
    pointer-events: none;
  }

  @media only screen and (max-width: 700px) {
    display: none;
    /* height: 30px;
    font-size: 12px; */
  }
`;

// const AddRemovePlant = styled.button`
//   text-transform: uppercase;
//   background: transparent;
//   color: #ffffff;
//   font-size: 14px;
//   cursor: default;
//   border: 1px solid transparent;

//   &:hover {
//     border: 1px solid transparent;
//   }
// `

const PositionWrap = styled.div`
  display: flex;
  gap: 10px;
  margin: -25px 10px;
  width: 350px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  /* border: 1px solid red; */

  @media only screen and (max-width: 700px) {
    margin: -30px 25px;
    width: 150px;
  }
`;

const Arrow = styled.button`
  border: 1px solid #ff0088;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  font-size: 40px;
  margin: 0px;
  padding: 0px;
  width: 60px;
  height: 60px;
  background: transparent;
  color: white;
  cursor: default;

  &:hover {
    border: 1px solid #ddff00;
  }

  @media only screen and (max-width: 700px) {
    /* font-size: 20px;
    width: 40px;
    height: 40px;
    width: 40px;
    height: 40px; */
    display: none;
  }
`

const ArrowWrap = styled.div`
  margin: -5px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media only screen and (max-width: 700px) {
    /* margin: 60px 5px; */
    display: none;
  }
`

const LeftRightWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 190px;

  @media only screen and (max-width: 700px) {
    width: 125px;
  }
`

type ControlPanelProps = {
  data: LinkedList | DoublyCircularlyLinkedList;
  activeNodeId: number;
  moveOperations: Record<string, (direction: Direction) => void>;
  plantOperations: Record<string, () => void>;
    // an object - key: string, value: function
  nodeOperations: Record<string, (index: number) => void>;
  // handleKeyDown: (e: any) => void;
};

const ControlPanel = (props: ControlPanelProps) => {
  const {
    activeNodeId,
    moveOperations,
    plantOperations,
    nodeOperations,
    data,
    // handleKeyDown
  } = props;
  const [controlsHeight, setControlsHeight] = useState(0);
  const [controlsWidth, setControlsWidth] = useState(0);
  const positionRef = useRef<HTMLDivElement>(null);

  const plantType =()=> {
    const dataStructure = data.constructor.name
    if (dataStructure === 'LinkedList') return '🎋'
    else if (dataStructure === 'DoublyCircularlyLinkedList') return '🌸'
  } 

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
        <ArrowWrap
          // onKeyDown={(e) => handleKeyDown(e)}
        >
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
          {/* <AddRemovePlant>plant {plantType()}</AddRemovePlant>
          <AddRemovePlant>remove {plantType()}</AddRemovePlant> */}
        </PositionWrap>
      </Html>
    </>
  );
};

export default ControlPanel;
