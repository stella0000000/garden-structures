import { Html } from "@react-three/drei";
import styled from "styled-components";
import { PlantName, useGardenStore } from "../../gardenStore";
import { MenuBox } from "./MenuBox";
import { PlantControls } from "./PlantControls";

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding-bottom: 20px;
  box-sizing: border-box;
`;

const Scrim = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
`;

export const Button = styled.button`
  background: black;
  color: white;
  border-radius: 100px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #e4e4e4;

  &:hover {
    border: 1px solid #ddff00;
  }

  &:disabled {
    opacity: 0.3;
    pointer-events: none;
  }
`;

const Pointer = styled.div`
  display: block;
  color: white;
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);

  &:after {
    content: "+";
  }
`;

export const HUD = () => {
  const {
    plantCollection,
    setIsPointerLock,
    instructionsVisible,
    setInstructionsVisible,

    activeNode,
    activePlant,
    setActiveNode,
    setActivePlant,
    deselectAllPlants,
    deselectAllNodes,
    //
    appendNode,
    popNode,
    insertNode,
    deleteAfterNode,
    deleteAtIdx,
  } = useGardenStore();

  const activePlantType = plantCollection[activePlant]?.kind as PlantName;
  const menuHasContent = activePlantType || instructionsVisible;

  const closeMenus = () => {
    setInstructionsVisible(false);
    deselectAllPlants();
    deselectAllNodes();
    setIsPointerLock(true);
  };

  return (
    <Html calculatePosition={() => [0, 0, 0]}>
      {menuHasContent ? (
        <>
          <Scrim onClick={closeMenus} />
          <MenuWrapper>
            {/* show instructions when first loaded */}
            {instructionsVisible && (
              <MenuBox onExit={closeMenus}>
                Direction: move mouse<br></br>s Walk: `w, a, s, d` keys<br></br>
                Planting: `g` key<br></br>[ This website is in progress. ]
              </MenuBox>
            )}

            {activePlant !== -1 && (
              <PlantControls
                activePlantType={activePlantType}
                closeMenus={closeMenus}
              />
            )}

            {/* show menu for the active plant when one is selected
            {activePlantType === "BambooStalkData" && (
              <MenuBox onExit={closeMenus}>
                <Button>I'm some bamboo controls!</Button>
                {activeNode !== -1 && (
                  <Button>And also some node controls</Button>
                )}
              </MenuBox>
            )}

            {activePlantType === "FlowerData" && (
              <MenuBox onExit={closeMenus}>
                <Button>I'm some Flower controls!</Button>
                {activeNode !== -1 && (
                  <Button>And also some node controls</Button>
                )}
              </MenuBox>
            )} */}
          </MenuWrapper>
        </>
      ) : (
        <Pointer />
      )}
    </Html>
  );
};

// const operations = {
//   bamboo: {
//     plant: {
//       append: () => appendNode(PlantName.BAMBOO, activePlant),
//       pop: () => popNode(activePlant),
//     },
//     node:
//       activeNode !== -1
//         ? {
//             insert: () => insertNode(activePlant, activeNode),
//             deleteAfter: () => deleteAfterNode(activePlant, activeNode),
//             deleteAtIndex: () =>
//               deleteAtIdx(PlantName.BAMBOO, activePlant, activeNode),
//           }
//         : {},
//   },
//   flower: {
//     plant: {},
//     node: {},
//   },
// };

// const buttons = [
//   {
//     id: "appendNode",
//     label: "Append Node",
//     plantTypes: ["bamboo", "flower"],
//     does: (plantName: PlantName) => appendNode(plantName, activePlant),
//   },
//   {
//     id: "popNode",
//     label: "Pop Node",
//     plantTypes: ["bamboo"],
//     does: () => popNode(activePlant),
//   },
// ];
