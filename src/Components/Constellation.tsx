import { FlattenedGraph, GraphNode } from "../DataStructures/Graph";
import {
  GardenReducerAction,
  // PlantName,
} from "../Hooks/Reducers/gardenReducer";
import { Euler, Vector3 } from "three";
// import * as THREE from "three";
import Node3D from "./Node3D";
import useActiveItem from "../Hooks/useActiveItem";
// import { Line, ScreenSpace } from "@react-three/drei";
// import { ScreenSpace } from '@react-three/drei'
import { useEffect, useState } from "react";
import { defaultStarMaterial, starBlinkMaterial } from "../materials";
import { cylinder } from "../geometries";
import { Line } from "@react-three/drei";
import { useGardenStore } from "../gardenStore";

type ConstellationProps = {
  data: FlattenedGraph;
  index: number;
  gardenDispatch: React.Dispatch<GardenReducerAction>;
  position: Vector3;
  rotation: Vector3;
  isActive: boolean;
};

enum Search {
  BFS,
  DFS,
}

const Constellation = ({
  data,
  index,
  position,
  rotation,
  isActive,
}: ConstellationProps) => {
  const [activeNode, setActiveNode, unsetActiveNode] = useActiveItem();
  const { setActivePlant } = useGardenStore();

  const root = GraphNode.unflatten(data);
  const [search, setSearch] = useState(Search.BFS);
  const [allStars, setAllStars] = useState(root.bfs());
  const [currStarIdx, setCurrStarIdx] = useState(0);

  const selectThisConstellation = () => {
    setActivePlant(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrStarIdx((currStarIdx + 1) % allStars.length);
    }, 250);
    return () => clearInterval(interval);
  }, [currStarIdx, allStars.length]);

  useEffect(() => {
    if (currStarIdx === 0) {
      search === Search.BFS ? setSearch(Search.DFS) : setSearch(Search.BFS);

      if (search === Search.BFS) {
        setAllStars(root.bfs());
      } else {
        setAllStars(root.dfs());
      }
    }
  }, [currStarIdx]);

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
  allStars.forEach((graphNode, nodeIndex) => {
    // plant nodes
    starChildren.push(
      <Node3D
        value={2}
        key={nodeIndex}
        position={position
          .clone()
          .add(new Vector3(graphNode.val[0], graphNode.val[1], 0))}
        rotation={rotation.clone()}
        geometry={cylinder}
        cylinderArgs={[0.125, 0.125, 0.125]}
        isSelected={isActive && activeNode === nodeIndex}
        selectParentPlant={selectThisConstellation}
        defaultMaterial={
          currStarIdx === nodeIndex ? starBlinkMaterial : defaultStarMaterial
        }
        deselectAllNodes={unsetActiveNode}
        selectNode={() => setActiveNode(nodeIndex)}
      />
    );
  });

  Array.from(uniqueEdgeMap.values()).forEach((nodes, index) => {
    const [node1, node2] = nodes;
    const p1 = position.clone().add(new Vector3(node1.val[0], node1.val[1], 0));
    const p2 = position.clone().add(new Vector3(node2.val[0], node2.val[1], 0));

    edgeChildren.push(
      <Line
        // fix key
        key={node1.val[0] + index}
        points={[p1, p2]}
        color="white"
        dashed={true}
        dashScale={6}
        lineWidth={0.5}
      />
    );
  });

  return (
    <group
      rotation={new Euler(Math.PI / 2, 0, 0)}
      position={[1, 100, 0]}
      scale={5}
    >
      {/* <ScreenSpace depth={30}> */}
      {starChildren}
      {edgeChildren}
      {/* </ScreenSpace> */}
    </group>
  );
};

export default Constellation;
