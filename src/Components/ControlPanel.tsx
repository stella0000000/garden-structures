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
};

const ControlPanel = (props: ControlPanelProps) => {
  const { activeNodeId } = props;
  console.log(props);

  return (
    <Html>
      <Button>add node</Button>
      <Button>delete node</Button>
      {activeNodeId}
    </Html>
  );
};

export default ControlPanel;
