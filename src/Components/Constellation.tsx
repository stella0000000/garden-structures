import { FlattenedGraph, GraphNode } from "../DataStructures/Graph";
import {
  GardenReducerAction,
  // PlantName,
} from "../Hooks/Reducers/gardenReducer";
import { Vector3 } from "three";
// import * as THREE from "three";
import Node3D from "./Node3D";
import useActiveItem from "../Hooks/useActiveItem";
// import { Line, ScreenSpace } from "@react-three/drei";
import { ScreenSpace } from '@react-three/drei'
import { useEffect, useState } from "react";
import { defaultStarMaterial, starBlinkMaterial } from "../materials";

type ConstellationProps = {
  data: FlattenedGraph;
  index: number;
  gardenDispatch: React.Dispatch<GardenReducerAction>;
  position: Vector3;
  rotation: Vector3;
  selectPlant: () => void;
  deselectAllPlants: () => void;
  isActive: boolean;
};

const Constellation = (props: ConstellationProps) => {
  const {
    data,
    position,
    rotation,
    selectPlant,
    deselectAllPlants,
    isActive,
    // gardenDispatch,
    // index,
  } = props;

  const root = GraphNode.unflatten(data);
  const allStars = root.bfs();
  const [currStarIdx, setCurrStarIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrStarIdx((currStarIdx + 1) % allStars.length);
    }, 250);
    return () => clearInterval(interval);
  }, [currStarIdx, allStars.length]);

  // useEffect(() => {
  //   console.log('constellation')
  // }, [])

  const {
    activeItem: activeNode,
    selectItem: selectNode,
    deselectAllItems: deselectAllNodes,
  } = useActiveItem();

  const starChildren: React.ReactNode[] = [];
  const edgeChildren: React.ReactNode[] = [];

  // uncursed:  read
  const uniqueEdgeMap = new Map<string, [GraphNode, GraphNode]>();

  allStars.forEach((node) => {
    const nodeHash = `${node.val[0]},${node.val[1]}`;
    for (const neighbor of node.neighbors) {
      const neighborHash = `${neighbor.val[0]},${neighbor.val[1]}`;
      const fullHash =
        nodeHash < neighborHash
          ? nodeHash + neighborHash
          : neighborHash + nodeHash;
      if (!uniqueEdgeMap.has(fullHash)) {
        uniqueEdgeMap.set(fullHash, [node, neighbor]);
      }
    }
  });
  // console.log({ allStars })

  // root node
  // .dfs() => returns the full array

  // console.log('dfs: '+ root.dfs().map(node => node.uuid.slice(10)))
  // console.log('bfs: ' + root.bfs().map(node => node.uuid.slice(10)))
  allStars.forEach((graphNode, index) => {
    // plant nodes
    starChildren.push(
      <Node3D
        value={2}
        key={index}
        position={position
          .clone()
          .add(new Vector3(graphNode.val[0], graphNode.val[1], 0))}
        rotation={rotation.clone()}
        // cylinderArgs={[1, 1, 1]}
        cylinderArgs={[0.125, 0.125, 0.125]}
        isSelected={isActive && activeNode === index}
        deselectAllPlants={deselectAllPlants}
        selectPlant={selectPlant}
        defaultMaterial={
          currStarIdx === index ? starBlinkMaterial : defaultStarMaterial
        }
        deselectAllNodes={deselectAllNodes}
        selectNode={() => selectNode(index)}
        // opacity={0.1}
        // transparent
      />
    );
    // console.log(graphNode.val[0], graphNode.val[1])
    // console.log(position
    //   .clone()
    //   .add(new Vector3(graphNode.val[0], graphNode.val[1], 0)))
  });

  // Array.from(uniqueEdgeMap.values()).forEach((nodes, index) => {
  //   const [node1, node2] = nodes;
  //   const p1 = position.clone().add(new Vector3(node1.val[0], node1.val[1], 0));
  //   const p2 = position.clone().add(new Vector3(node2.val[0], node2.val[1], 0));

  //   edgeChildren.push(
  //     <Line
  //       // fix key
  //       key={node1.val[0] + index}
  //       points={[p1, p2]}
  //       color="rgb(255, 255, 255)"
  //       // dashed={true}
  //       // dashScale={0}
  //       lineWidth={0.4}
  //       // opacity={0.5}
  //       // transparent
  //     />
  //   );
  // });

  return (
    <ScreenSpace depth={30}>
      {starChildren}
      {edgeChildren}
    </ScreenSpace>
  );
};

export default Constellation;
