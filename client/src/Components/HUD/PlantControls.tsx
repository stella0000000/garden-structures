import { MenuMode, PlantName, useGardenStore } from "../../gardenStore";
import { MenuBox } from "./MenuBox";
import { Button } from "./HUD";

export const PlantControls = () => {
  const {
    plantCollection,

    activePlant,
    activeNode,

    setActivePlant,
    setActiveNode,

    appendNode,
    popNode,
    insertNode,
    deleteAfterNode,
    deleteAtIdx,

    setGhostType,

    setMenuMode,
  } = useGardenStore();

  const activePlantType = plantCollection[activePlant]?.kind as PlantName;

  const handleClose = () => {
    setActivePlant(-1);
    setActiveNode(-1);
    setMenuMode(MenuMode.NONE);
  };

  const handleMoveClick = () => {
    setGhostType(activePlantType);
    setMenuMode(MenuMode.NONE);
  };

  const plantOperations =
    activePlantType == "bamboo"
      ? {
          append: () => appendNode(activePlantType, activePlant),
          pop: () => popNode(activePlant),
        }
      : activePlantType == "flower"
      ? {
          append: () => appendNode(activePlantType, activePlant),
        }
      : {};

  const nodeOperations =
    activePlantType == "bamboo"
      ? {
          insert: () => insertNode(activePlant, activeNode),
          deleteAfter: () => deleteAfterNode(activePlant, activeNode),
          deleteAtIndex: () =>
            deleteAtIdx(activePlantType, activePlant, activeNode),
        }
      : activePlantType == "flower"
      ? {
          deleteAtIndex: () =>
            deleteAtIdx(activePlantType, activePlant, activeNode),
        }
      : {};

  return (
    <MenuBox onExit={handleClose}>
      {Object.keys(plantOperations).map((opName, index) => {
        const operation =
          plantOperations[opName as keyof typeof plantOperations];
        if (operation)
          return (
            <Button key={index} onClick={operation}>
              {opName}
            </Button>
          );
      })}
      {Object.keys(nodeOperations).map((opName, index) => {
        const operation = nodeOperations[opName as keyof typeof nodeOperations];
        if (operation)
          return (
            <Button
              disabled={activeNode === -1}
              key={index}
              onClick={operation}
            >
              {opName}
            </Button>
          );
      })}

      <Button onClick={handleMoveClick}>move!?</Button>
    </MenuBox>
  );
};
