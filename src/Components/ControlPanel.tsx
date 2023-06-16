import { DoublyCircularlyLinkedList } from "../DataStructures/DoublyCircularlyLinkedList";
import { LinkedList } from "../DataStructures/LinkedList";
import { Html } from "@react-three/drei";
import styled from "styled-components";

const Button = styled.button`
  width: 150px;
  height: 50px;
`;

type ControlPanelProps = {
  data: LinkedList | DoublyCircularlyLinkedList;
  activeNodeId: number;
  plantOperations: Record<string, () => void>        // an object - key: string, value: function
  nodeOperations: Record<string, (index: number) => void>
};

const ControlPanel = (props: ControlPanelProps) => {
  const { activeNodeId, plantOperations, nodeOperations } = props;

  return (
    // fix position
    <Html position={[30, -5, -1]}>
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

      {activeNodeId !== -1 && Object.keys(nodeOperations).map((opName, index) => {
        const operation = nodeOperations[opName];
        return (
          <Button
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

      {activeNodeId}
    </Html>
  );
};

export default ControlPanel;
