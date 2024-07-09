import { PlantName, useGardenStore } from "../../gardenStore";
import { MenuBox } from "./MenuBox";
import { Button } from "./HUD";

export const PlantControls = ({
  activePlantType,
  closeMenus,
}: {
  activePlantType?: PlantName;
  closeMenus: () => void;
}) => {
  const {
    activePlant,
    activeNode,

    appendNode,
    popNode,
    insertNode,
    deleteAfterNode,
    deleteAtIdx,
  } = useGardenStore();

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
    <MenuBox onExit={closeMenus}>
      {Object.keys(plantOperations).map((opName, index) => {
        const operation =
          plantOperations[opName as keyof typeof plantOperations];
        if (operation)
          return (
            <Button
              key={index}
              onPointerDown={(e) => {
                e.stopPropagation();
                operation();
              }}
              onDoubleClick={(e) => e.stopPropagation()}
            >
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
              onPointerDown={(e) => {
                e.stopPropagation();
                operation();
              }}
              onDoubleClick={(e) => e.stopPropagation()}
            >
              {opName}
            </Button>
          );
      })}
    </MenuBox>
  );
};
