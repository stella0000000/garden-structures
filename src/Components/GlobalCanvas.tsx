import { useReducer, useRef } from "react";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { LinkedList } from "../DataStructures/LinkedList";
import { Box, Plane } from "@react-three/drei";
import BambooStalk from "./BambooStalk";
import {
  CircularlyLinkedListFromArray,
  DoublyCircularlyLinkedList,
} from "../DataStructures/DoublyCircularlyLinkedList";
import Flower from "./Flower";
import useActiveItem from "../Hooks/useActiveItem";
import gardenReducer from "../Hooks/Reducers/gardenReducer";
import * as THREE from "three";
import { Vector3, Euler } from "three";
import { GraphNode, FlattenedGraph } from "../DataStructures/Graph";
import Constellation from "./Constellation";
import { dirtMaterial } from "../materials";
import FirstPersonCameraControls from "./FirstPersonCameraControls";

const camera = new THREE.PerspectiveCamera();

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
  data: LinkedList.fromArray([2, 8, 12, 2]),
  position: new Vector3(0, 0, 0),
  rotation: new Vector3(0, 0, 0),
};

const testingBamboo2: BambooStalkData = {
  kind: "BambooStalkData",
  data: LinkedList.fromArray([4, 6, 8, 2]),
  position: new Vector3(4, 0, 1),
  rotation: new Vector3(0, 0, 0),
};
const testingBamboo3: BambooStalkData = {
  kind: "BambooStalkData",
  data: LinkedList.fromArray([2, 6, 4, 2]),
  position: new Vector3(2, 0, 2),
  rotation: new Vector3(0, 0, 0),
};

const testingFlower1: FlowerData = {
  kind: "FlowerData",
  data: CircularlyLinkedListFromArray([2, 2, 2, 2, 2, 2]),
  position: new Vector3(12, 4, 2),
  rotation: new Vector3(1.5708, 0, 0),
};

// Fix generating constellation graph
// for visual purposes (dfs, bfs)
// start @ [0, 0] root node
// root.connect(nodeA)
// nodeA.connect(nodeB)
// BUT NOW for clear DFS viz, generate A, B nodes within quadrants + specify layers
// B will ALWAYS have to have higher Math.abs(x, y) than A, and not switching quadrants = or keep X, while Y can flip
// i.e. B is in outer ring of A

/*
    1. where is the root node and/or parent node is
    2. calculate arc range param (cone variance)
    3. calc vector from center of arc range to center of graph
    4. pick random num from 0 to arc range
    5. math to plot that coord on arc (?)
*/

// edges: [a, b] => [[a1, b1], [a2, b2]] = [a2-a1, b2-b1]
const populateStars = (): GraphNode => {
  const root = new GraphNode([0, 0], []);

  const r = 4;
  const arr = [];
  let sum = 0;
  const numNodesLayer1 = 4;
  const numLayers = 5;
  for (let i = 0; i < numLayers; i++) sum += Math.pow(2, i) * numNodesLayer1;
  for (let i = 0; i < sum; i++) arr.push(Math.random() * 2 * Math.PI);
  arr.sort();
  const offset = Math.pow(2, numLayers) - 1;

  for (let i = Math.floor(offset / 2) + 1; i < sum; i += offset) {
    const node = traverse(numLayers, 1, i, arr, r);
    if (node) root.connect(node);
  }

  return root;
};

const traverse = (
  numLayers: number,
  currLayer: number,
  index: number,
  arr: number[],
  r: number
) => {
  if (currLayer > numLayers) return;
  if (index >= arr.length) return;

  const angle = arr[index];

  const x = Math.cos(angle) * currLayer * r;
  const y = Math.sin(angle) * currLayer * r;
  const node = new GraphNode([x, y], []);

  // jump is halved on each level
  const remainingLayers = numLayers - currLayer;
  const jump = Math.pow(2, remainingLayers - 1);

  const left = traverse(numLayers, currLayer + 1, index - jump, arr, r);
  const right = traverse(numLayers, currLayer + 1, index + jump, arr, r);

  if (left) node.connect(left);
  if (right) node.connect(right);

  return node;
};

//  1   *   1   *    *     1   *    *    1
// [ 5, 50, 90, 120, 200, 340, 345, 347, 350 ]

// if (index % 3 === 1) l1
// else l2

// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]

// 4 + 2*4 + 4*4 + 8*4
// 4 + (2*1)*4 + (2*2)*4 + (2*2*2)*4

// 3 + 6 + 12 + 24 = 45
// 4 8 16 = 28

// let sum = 0
// var branches = 4
// for (let i=0; i<3; i++) {
//     sum += Math.pow(2, i) * branches
// }

// 2^power of num layers   - 1
//
/*

      3         10          17
    /  \      /   \       /    \
   1   5    8      12    15     19
 /\    /\   /\     /\    /\     /\
0 2   4 6  7


0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16

          9
         / \
            3
            / \
           5   8  
          /\   /\
         4  6 7  9




*/

// initial number is Math.floor(offset/2)

const testingConstellationStar1 = populateStars().flatten();

const testingConstellation1: ConstellationData = {
  kind: "ConstellationData",
  data: testingConstellationStar1,
  position: new Vector3(),
  rotation: new Vector3(0, 1.5, 0),
  // rotation: new Euler(0, 90, 0)
};

const initialTestingState: PlantCollection = [
  testingBamboo,
  testingBamboo2,
  testingBamboo3,
  testingFlower1,
  testingConstellation1,
];

const GlobalCanvas: React.FC = () => {
  const [plantData, dispatch] = useReducer(gardenReducer, initialTestingState);
  const {
    activeItem: activePlant,
    selectItem: selectPlant,
    deselectAllItems: deselectAllPlants,
  } = useActiveItem();

  const cameraRef = useRef(camera);

  // useEffect(() => {
  //   console.log({ activePlant });
  // }, [activePlant]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch({ type: "append", payload: { index: 4 } });
  //   }, 1000);
  // }, []);

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
          // UNREACHABLE!
          return <></>;
        }
      }
    });
  };

  return (
    <>
      <Canvas camera={cameraRef.current}>
        {/* <OrbitControls target={[5, 5, 0]} /> */}
        <FirstPersonCameraControls cameraRef={cameraRef} />
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
        <Plane
          args={[1000, 1000]}
          rotation={new Euler(-Math.PI / 2, 0, 0)}
          material={dirtMaterial}
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

//  1   *   1   *    *     1   *    *    1
// [ 5, 50, 90, 120, 200, 340, 345, 347, 350 ]
// [ 5, 50, 90, 120, 200, 340, 345, 347, 350 ]

// if (index % 3 === 1) l1
// else l2

// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]

/*

      3         10          17
    /  \      /   \       /    \
   1   5    8      12    15     19
 /\    /\   /\     /\    /\     /\
0 2   4 6  7

*/
