import "./App.css";
import GlobalCanvas from "./Components/GlobalCanvas";
import { useCallback, useEffect, useState } from "react";
import { MenuMode, useGardenStore } from "./gardenStore";
import { Vector3 } from "three";
import { LinkedList } from "./DataStructures/LinkedList";
import { CircularlyLinkedListFromArray } from "./DataStructures/DoublyCircularlyLinkedList";
import { initialState } from "./initialState";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";

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
        : CircularlyLinkedListFromArray(data),
    position: new Vector3(position[0], position[1], position[2]),
    rotation: new Vector3(rotation[0], rotation[1], rotation[2]),
  });

  useEffect(() => {
    fetch("/plants")
      .then((res) => res.json())
      .then((data) => setPlantCollection(data.map(convertPlantToData)));
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <GlobalCanvas />

      {/* Invisible screen over the Canvas to enable PointerLockControls */}
      {/* {!isPointerLock && (
        <div
          style={{
            top: "0px",
            position: "absolute",
            width: "100vw",
            height: "100vh",
          }}
        ></div>
      )} */}
    </div>
  );
}

export default App;
