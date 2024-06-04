import "./App.css";
import GlobalCanvas from "./Components/GlobalCanvas";
import Instructions from "./Components/Instructions";
import { useEffect, useState } from "react";
import { useGardenStore } from "./gardenStore";
import { Vector3 } from "three";
import { LinkedList } from "./DataStructures/LinkedList";
import { CircularlyLinkedListFromArray } from "./DataStructures/DoublyCircularlyLinkedList";
import { initialState } from "./initialState";

type PlantDBData = {
  _id: string;
  type: string;
  data: number[];
  position: number[];
  rotation: number[];
};

function App() {
  const {
    isDataMode,
    setIsDataMode,
    isPointerLock,
    instructionsVisible,
    setPlantCollection,
    plantCollection,
  } = useGardenStore();

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
      type === "bambooStalkData"
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

  useEffect(() => {
    console.log({ plantCollection });
  }, [plantCollection]);

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [isDataMode]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key == "m") setIsDataMode(!isDataMode);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {instructionsVisible && <Instructions />}
      <GlobalCanvas />

      {/* Invisible screen over the Canvas to enable PointerLockControls */}
      {!isPointerLock && (
        <div
          style={{
            top: "0px",
            position: "absolute",
            width: "100vw",
            height: "100vh",
          }}
        ></div>
      )}
    </div>
  );
}

export default App;
