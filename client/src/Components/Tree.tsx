// // Binary Search Tree component
// import { BinarySearchTreeNode } from "../DataStructures/BinarySearchTree";
// import {
//   Direction,
//   GardenReducerAction,
//   PlantName,
//   OpName,
// } from "../Hooks/Reducers/gardenReducer";
// import useActiveItem from "../Hooks/useActiveItem";

// type TreeProps = {
//   root: BinarySearchTreeNode;
//   index: number;
//   // position: Vector3;
//   // rotation: Vector3;
//   gardenDispatch: React.Dispatch<GardenReducerAction>;
//   selectPlant: () => void;
//   deselectAllPlants: () => void;
//   isActive: boolean;
// };

// const Tree = (props: TreeProps) => {
//   // const {
//   //   root,
//   //   // position,
//   //   // rotation,
//   //   selectPlant,
//   //   deselectAllPlants,
//   //   isActive,
//   //   gardenDispatch,
//   //   index,
//   // } = props;
//   // const {
//   //   activeItem: activeNode,
//   //   selectItem: selectNode,
//   //   deselectAllItems: deselectAllNodes,
//   // } = useActiveItem();

//   const handleMove = (direction: Direction) => {
//     const action: GardenReducerAction = {
//       type: "movePlant",
//       payload: {
//         index,
//         direction,
//       },
//     };
//     gardenDispatch(action);
//   };

//   const handleAppend = () => {
//     const action: GardenReducerAction = {
//       type: "plantOperation",
//       payload: {
//         plantName: PlantName.BAMBOO,
//         opName: OpName.APPEND,
//         index,
//       },
//     };
//     gardenDispatch(action);
//   };

//   const handlePop = () => {
//     const action: GardenReducerAction = {
//       type: "plantOperation",
//       payload: {
//         plantName: PlantName.BAMBOO,
//         opName: OpName.POP,
//         index,
//       },
//     };
//     gardenDispatch(action);
//   };

//   const handleInsert = (nodeIndex: number) => {
//     const action: GardenReducerAction = {
//       type: "nodeOperation",
//       payload: {
//         plantName: PlantName.BAMBOO,
//         opName: OpName.INSERT,
//         index,
//         nodeIndex,
//       },
//     };
//     gardenDispatch(action);
//   };

//   const handleDelete = (nodeIndex: number) => {
//     const action: GardenReducerAction = {
//       type: "nodeOperation",
//       payload: {
//         plantName: PlantName.BAMBOO,
//         opName: OpName.DELETE,
//         index,
//         nodeIndex,
//       },
//     };
//     gardenDispatch(action);
//   };

//   const handleDeleteAtIndex = (nodeIndex: number) => {
//     const action: GardenReducerAction = {
//       type: "nodeOperation",
//       payload: {
//         plantName: PlantName.BAMBOO,
//         opName: OpName.DELETEATINDEX,
//         index,
//         nodeIndex,
//       },
//     };
//     gardenDispatch(action);
//   };

//   const moveOperations = {
//     move: (direction: Direction) => handleMove(direction),
//   };

//   const plantOperations = {
//     append: handleAppend,
//     pop: handlePop,
//   };

//   const nodeOperations = {
//     insert: handleInsert,
//     deleteAfter: handleDelete,
//     deleteAtIndex: handleDeleteAtIndex,
//   };

//   return <>hi</>;
// };

// export default Tree;
