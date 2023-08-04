import { FlattenedGraph, GraphNode } from "../DataStructures/Graph";
import { GardenReducerAction } from "../Hooks/Reducers/gardenReducer";
import { Vector3 } from "three";
import Node3D from "./Node3D";
import useActiveItem from "../Hooks/useActiveItem";
import { Line, ScreenSpace } from "@react-three/drei";
import { useEffect, useState } from "react";

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
  const allStars = root.dfs()
  const [currStarIdx, setCurrStarIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(currStarIdx)
      setCurrStarIdx((currStarIdx + 1) % allStars.length)
    }, 750);
    return () => clearInterval(interval);
  }, [currStarIdx, allStars.length]);

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
        rotation={rotation.clone().add(new Vector3(0, 0, 0))}
        // cylinderArgs={[0.1, 0.2, 0.2]}
        cylinderArgs={[0.75, 0.75, 0.75]}
        isSelected={isActive && activeNode === index}
        deselectAllPlants={deselectAllPlants}
        selectPlant={selectPlant}
        defaultColor={currStarIdx === index ? "red" : "rgb(255,230,230)"}
        deselectAllNodes={deselectAllNodes}
        selectNode={() => selectNode(index)}
        materialOverride={null}
        // opacity={0.1}
        // transparent
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
        key={node1.val[0] + index * Math.random()}
        points={[p1, p2]}
        color="rgb(255, 255, 255)"
        dashed={true}
        dashScale={4}
        lineWidth={2}
        // opacity={0.5}
        // transparent
      />
    );
  });

  return <ScreenSpace depth={75}>{starChildren}{edgeChildren}</ScreenSpace>;
};

export default Constellation;
