import "./App.css";
import GlobalCanvas from "./Components/GlobalCanvas";
import { useEffect } from "react";
import { useGardenStore } from "./gardenStore";
import { Vector3 } from "three";
import { LinkedList } from "./DataStructures/LinkedList";
import { DoublyCircularlyLinkedListFromArray } from "./DataStructures/DoublyCircularlyLinkedList";

type PlantDBData = {
  _id: string;
  type: string;
  data: number[];
  position: number[];
  rotation: number[];
};

function App() {
  const { setPlantCollection } = useGardenStore();

  const convertPlantToData = ({
    _id,
    type,
    data,
    position,
    rotation,
  }: PlantDBData) => ({
    _id,
    kind: type,
    data:
      type === "bamboo"
        ? LinkedList.fromArray(data)
        : DoublyCircularlyLinkedListFromArray(data),
    position: new Vector3(position[0], position[1], position[2]),
    rotation: new Vector3(rotation[0], rotation[1], rotation[2]),
  });

  // useEffect(() => {
  //   fetch("/plants")
  //     .then((res) => res.json())
  //     .then((data) => setPlantCollection(data.map(convertPlantToData)));
  // }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <GlobalCanvas />
    </div>
  );
}

export default App;
