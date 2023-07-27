import { GraphNode } from "../DataStructures/Graph";
import { GardenReducerAction } from "../Hooks/Reducers/gardenReducer";
import { Vector3 } from "three";
import Node3D from "./Node3D";
import useActiveItem from "../Hooks/useActiveItem";
import { useEffect } from "react";
import { Line, ScreenSpace } from "@react-three/drei";

type ConstellationProps = {
  root: GraphNode;
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
    root,
    position,
    rotation,
    selectPlant,
    deselectAllPlants,
    isActive,
    // gardenDispatch,
    // index,
  } = props;

  const {
    activeItem: activeNode,
    selectItem: selectNode,
    deselectAllItems: deselectAllNodes,
  } = useActiveItem();

  useEffect(() => {
    console.log({ root });
  }, [root]);

  const children: React.ReactNode[] = [];

  // uncursed:  read
  const uniqueEdgeMap = new Map<string, [GraphNode, GraphNode]>();
  root.dfs().forEach((node) => {
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
  root.dfs().forEach((graphNode, index) => {
    // plant nodes
    children.push(
      <Node3D
        value={2}
        key={index}
        position={position
          .clone()
          .add(new Vector3(graphNode.val[0], graphNode.val[1], 0))}
        rotation={rotation.clone().add(new Vector3(0, 0, 0))}
        cylinderArgs={[0.1, 0.2, 0.2]}
        isSelected={isActive && activeNode === index}
        deselectAllPlants={deselectAllPlants}
        selectPlant={selectPlant}
        defaultColor={"rgb(255,230,230)"}
        deselectAllNodes={deselectAllNodes}
        selectNode={() => selectNode(index)}
        materialOverride={null}
      />
    );
  });

  Array.from(uniqueEdgeMap.values()).forEach((nodes, index) => {
    const [node1, node2] = nodes;
    const p1 = position.clone().add(new Vector3(node1.val[0], node1.val[1], 0));
    const p2 = position.clone().add(new Vector3(node2.val[0], node2.val[1], 0));

    children.push(
      <Line
        key={node1.val[0] + index}
        points={[p1, p2]}
        color="white"
        dashed={true}
        dashScale={4}
        lineWidth={2}
      />
    );
  });

  return (
    <ScreenSpace depth={75}>
      {children}
    </ScreenSpace>
  );
};

export default Constellation;
