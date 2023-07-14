import { useEffect, useRef, useState } from "react";
import { DoublyCircularlyLinkedList } from "../DataStructures/DoublyCircularlyLinkedList";
import { LinkedList } from "../DataStructures/LinkedList";
import { Html } from "@react-three/drei";
import styled from "styled-components";

const Button = styled.button`
  width: 150px;
  height: 50px;
  background: transparent;
  color: white;
  border: 2px solid limegreen;
  border-radius: 0;

  &:disabled {
    opacity: 0.3;
    pointer-events: none;
  }
`;

const PositionWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: -10px 10px;
`;

type ControlPanelProps = {
  data: LinkedList | DoublyCircularlyLinkedList;
  activeNodeId: number;
  plantOperations: Record<string, () => void>; // an object - key: string, value: function
  nodeOperations: Record<string, (index: number) => void>;
};

const ControlPanel = (props: ControlPanelProps) => {
  const {
    activeNodeId,
    plantOperations,
    nodeOperations
  } = props;
  
  const [controlsHeight, setControlsHeight] = useState(0);

  const positionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      const controlsHeight =
        positionRef.current?.getBoundingClientRect().height || 0;
      setControlsHeight(controlsHeight);
    });
  }, []);

  return (
    // fix position
    <Html
      //fullscreen
      calculatePosition={() => {
        return [0, window.innerHeight - controlsHeight, 0];
      }}
    >
      <PositionWrap ref={positionRef}>
        {/* {activeNodeId} */}

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

        {/* {activeNodeId !== -1 && */}
        {Object.keys(nodeOperations).map((opName, index) => {
          const operation = nodeOperations[opName];
          return (
            <Button
              disabled={activeNodeId == -1}
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
  );
};

export default ControlPanel;
