import { useEffect, useReducer } from "react";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { LinkedList, LinkedListFromArray } from "../DataStructures/LinkedList";
import { Box, OrbitControls } from "@react-three/drei";
import BambooStalk from "./BambooStalk";
import {
  CircularlyLinkedListFromArray,
  DoublyCircularlyLinkedList,
} from "../DataStructures/DoublyCircularlyLinkedList";
import Flower from "./Flower";
import useActiveItem from "../Hooks/useActiveItem";
import gardenReducer from "../Hooks/Reducers/gardenReducer";
import * as THREE from "three";
import { Vector3 } from "three";
import { GraphNode, FlattenedGraph } from "../DataStructures/Graph";
import Constellation from "./Constellation";

/* plant data is stored at the topmost level as a React antipattern,
 * until we figure out a better way to integrate ui controls inside the canvas
 */
type Transform3D = {
  position: Vector3;
  rotation: Vector3;
};

export type BambooStalk = {
  kind: "BambooStalkData";
  data: LinkedList;
};

export type BambooStalkData = BambooStalk & Transform3D;

export type Flower = {
  kind: "FlowerData";
  data: DoublyCircularlyLinkedList;
};
export type FlowerData = Flower & Transform3D;

export type Constellation = {
  kind: "ConstellationData";
  data: FlattenedGraph;
};

export type ConstellationData = Constellation & Transform3D;

export type PlantCollection = (
  | BambooStalkData
  | FlowerData
  | ConstellationData
)[];

// dummy values for use during local testing
const testingBamboo: BambooStalkData = {
  kind: "BambooStalkData",
  data: LinkedListFromArray([2, 8, 12, 2]),
  position: new Vector3(0, 0, 0),
  rotation: new Vector3(0, 0, 0),
};

const testingBamboo2: BambooStalkData = {
  kind: "BambooStalkData",
  data: LinkedListFromArray([4, 6, 8, 2]),
  position: new Vector3(4, 0, 1),
  rotation: new Vector3(0, 0, 0),
};
const testingBamboo3: BambooStalkData = {
  kind: "BambooStalkData",
  data: LinkedListFromArray([2, 6, 4, 2]),
  position: new Vector3(2, 0, 2),
  rotation: new Vector3(0, 0, 0),
};

const testingFlower1: FlowerData = {
  kind: "FlowerData",
  data: CircularlyLinkedListFromArray([2, 2, 2, 2, 2, 2]),
  position: new Vector3(12, 4, 2),
  rotation: new Vector3(1.5708, 0, 0),
};

const generateRandomNum = (numStars: number): number => {
  // return Math.ceil(Math.random() * numStars) * Math.round(Math.random()) ? 10 : -10
  return (
    Math.ceil(Math.random() * numStars) * (Math.round(Math.random()) ? 1 : -1)
  );
};

// edges: [a, b] => [[a1, b1], [a2, b2]] = [a2-a1, b2-b1]
const populateCoords = (numStars: number): number[][][] => {
  const coords = [];

  for (let i = 0; i < numStars; i++) {
    let x1 = generateRandomNum(numStars);
    let y1 = generateRandomNum(numStars);

    let x2 = generateRandomNum(numStars);
    let y2 = generateRandomNum(numStars);

    coords.push([
      [x1, y1],
      [x2, y2],
    ]);
    // toggle = !toggle
  }

  return coords;
};
/*
[
  values[], "the positions of the nodes @ index"
  neighbors[], "the neighbors of that node @ index"

  index-aligned

  // literally an array of our nodes
    GraphNode[] - where the indicies are nodeIdx
  // array of neighbors, indicies align with nodeIdx
    GraphNode[][]

]
*/

const populateStars = (): FlattenedGraph => {
  const edges = populateCoords(3);
  // const graph: GraphNode[] = []
  // vertex [x, y]: neighbors [a, b]
  const stars: GraphNode = new GraphNode([0, 0], []);
  // let count = 0
  let nodeA, nodeB;
  for (let edge of edges) {
    const [[x1, y1], [x2, y2]] = edge; // a = [x1, y1], b = [x2, y2]
    nodeA = new GraphNode([x1, y1], []);
    nodeB = new GraphNode([x2, y2], []);

    // if (count === 0) stars.connect(nodeA)
    // count++
    stars.connect(nodeA);
    nodeA.connect(nodeB);

    // const posA = `${x1},${y1}`
    // const posB = `${x2},${y2}`
    // if (!(posA in graph)) graph[posA] = []
    // if (!(posB in graph)) graph[posB] = []u
    // graph[posA].push(graph[posB])
    // graph[posB].push(graph[posA])
  }

  console.log({ stars });
  return stars.flatten();
};

const testingConstellationStar1 = populateStars();

// const testingConstellationStar1: GraphNode = new GraphNode([10, 30], []);
// const testingConstellationStar2: GraphNode = new GraphNode([10, 5], []);
// const testingConstellationStar3: GraphNode = new GraphNode([5, 15], []);
// const testingConstellationStar4: GraphNode = new GraphNode([15, 15], []);
// testingConstellationStar1.connect(testingConstellationStar2);
// testingConstellationStar1.connect(testingConstellationStar3);
// testingConstellationStar4.connect(testingConstellationStar1);
// testingConstellationStar2.connect(testingConstellationStar3);

const testingConstellation1: ConstellationData = {
  kind: "ConstellationData",
  data: testingConstellationStar1,
  position: new Vector3(),
  rotation: new Vector3(),
};

const initialTestingState: PlantCollection = [
  testingBamboo,
  testingBamboo2,
  testingBamboo3,
  testingFlower1,
  testingConstellation1,
];

// const texture = new THREE.TextureLoader().load("dirt.jpeg");
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set(4, 4);

// const dirtMaterial = new THREE.MeshBasicMaterial({
//   map: texture,
//   color: "rgb(135, 111, 89)",
// });

const GlobalCanvas: React.FC = () => {
  const [plantData, dispatch] = useReducer(gardenReducer, initialTestingState);
  const {
    activeItem: activePlant,
    selectItem: selectPlant,
    deselectAllItems: deselectAllPlants,
  } = useActiveItem();

  useEffect(() => {
    console.log({ activePlant });
  }, [activePlant]);

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "append", payload: { index: 4 } });
    }, 1000);
  }, []);

  // renders the appropriate JSX for each plant in the PlantData based on type
  const children = () => {
    return plantData?.map((plant, index) => {
      switch (plant.kind) {
        case "BambooStalkData": {
          // sets x offset for this BambooStalk based on its index in the plantData array
          return (
            <BambooStalk
              key={index}
              index={index}
              gardenDispatch={dispatch}
              root={plant.data}
              position={plant.position}
              rotation={plant.rotation}
              selectPlant={() => selectPlant(index)}
              deselectAllPlants={deselectAllPlants}
              isActive={activePlant === index}
            />
          );
        }
        case "FlowerData": {
          // TODO: UNIMPLEMENTED: component for rendering flowers
          return (
            <Flower
              key={index}
              index={index}
              gardenDispatch={dispatch}
              root={plant.data}
              position={plant.position}
              rotation={plant.rotation}
              selectPlant={() => selectPlant(index)}
              deselectAllPlants={deselectAllPlants}
              isActive={activePlant === index}
            />
          );
        }
        case "ConstellationData": {
          return (
            <Constellation
              key={index}
              index={index}
              gardenDispatch={dispatch}
              data={plant.data}
              position={plant.position}
              rotation={plant.rotation}
              selectPlant={() => selectPlant(index)}
              deselectAllPlants={deselectAllPlants}
              isActive={activePlant === index}
            />
          );
        }
        default: {
          // !UNREACHABLE
          return <></>;
        }
      }
    });
  };

  return (
    <>
      <Canvas camera={{ position: [0, 20, 50] }}>
        <OrbitControls target={[5, 5, 0]} />
        <ambientLight intensity={1} />
        <directionalLight intensity={1} />
        {/* World box for missed click events */}
        <Box
          args={[75, 75, 75]}
          visible={true}
          onPointerDown={(e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            deselectAllPlants();
          }}
          material={
            new THREE.MeshLambertMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 0,
              side: THREE.BackSide,
            })
          }
        />
        {children()}
        {/* <Plane
          args={[20, 20]}
          rotation={[-1.57, 0, 0]}
          material={dirtMaterial}
        ></Plane> */}
      </Canvas>
    </>
  );
};

export default GlobalCanvas;
