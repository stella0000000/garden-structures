import { ScreenSpace } from "@react-three/drei";
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
  operations: {
    [key: string]: () => void;
  };
};

const ControlPanel = (props: ControlPanelProps) => {
  const { activeNodeId, operations } = props;

  console.log(props);

  return (
    <Html>
      {Object.keys(operations).map((opName) => {
        const operation = operations[opName];
        return (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              operation();
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
