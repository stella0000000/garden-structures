import { ScreenSpace } from "@react-three/drei";
import { DoublyCircularlyLinkedList } from "../DataStructures/DoublyCircularlyLinkedList"
import { LinkedList } from "../DataStructures/LinkedList"
import { Html } from "@react-three/drei"
import styled from 'styled-components'

const Button = styled.button`
  width: 150px;
  height: 50px;
`

type ControlPanelProps = {
  data: LinkedList | DoublyCircularlyLinkedList;
}

const ControlPanel = (props: ControlPanelProps) => {
 console.log(props)
 
  return (
    <Html>
      <Button>
        add node
      </Button>
      <Button>
        delete node
      </Button>
    </Html>
  )

}

export default ControlPanel