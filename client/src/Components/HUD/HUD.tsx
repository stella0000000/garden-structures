import { Html } from "@react-three/drei";
import styled from "styled-components";
import { MenuMode, useGardenStore } from "../../gardenStore";
import { MenuBox } from "./MenuBox";
import { PlantControls } from "./PlantControls";
import { MainMenu } from "./MainMenu";
import { useEffect } from "react";
import GhostPlant from "../GhostPlant";

/*
click on node, or plant
- delete, append, pop, etc buttons
- lose pointerLock
- move button
  - engage pointerlock
  - lock plant with "mouse"
  - click to place plant in new location
*/

const Pointer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: grid;
  place-content: center;

  &:after {
    color: white;
    content: "+";
  }
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

export const HUD = () => {
  const {
    setIsPointerLock,
    menuMode,
    setMenuMode,
    setIsDataMode,
    isDataMode,
    setGhostType,
    ghostType,
  } = useGardenStore();

  useEffect(() => {
    console.log(menuMode);
  }, [menuMode]);

  const onCloseAnyMenu = () => {
    setIsPointerLock(true);
    setMenuMode(MenuMode.NONE);
  };

  const onOpenAnyMenu = () => {
    setIsPointerLock(false);
  };

  // click anywhere to return to pointerlock if no menus are open
  const handleNoMenuScreenClick = () => {
    setIsPointerLock(true);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isDataMode, menuMode, ghostType]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "e") {
      if (menuMode === MenuMode.MAIN) {
        // if MAIN is open, close it
        onCloseAnyMenu();
        setGhostType(undefined);
      } else if (ghostType && menuMode === MenuMode.NONE) {
        // if there is a ghost but no menu, clear the ghost
        setGhostType(undefined);
      } else {
        // base case: open MAIN
        setMenuMode(MenuMode.MAIN);
        onOpenAnyMenu();
      }
    } else if (e.key == "m") {
      // handle "m" to toggle data mode
      setIsDataMode(!isDataMode);
    }
  };

  return (
    <Html calculatePosition={() => [0, 0, 0]}>
      {/* show pointerlock pointer if no menus open */}
      {menuMode === MenuMode.NONE && (
        <Pointer onClick={handleNoMenuScreenClick} />
      )}

      {/* show main menu when active */}
      {menuMode === MenuMode.MAIN && (
        <MainMenu onCloseAnyMenu={onCloseAnyMenu} />
      )}

      {/* show plant controls when a plant is selected */}
      {menuMode === MenuMode.PLANT && (
        <PlantControls onCloseAnyMenu={onCloseAnyMenu} />
      )}

      {/* show instructions when first loaded */}
      {menuMode === MenuMode.INTRO && (
        <MenuBox onExit={onCloseAnyMenu}>
          Direction: move mouse<br></br>s Walk: `w, a, s, d` keys<br></br>
          Planting: `g` key<br></br>[ This website is in progress. ]
        </MenuBox>
      )}
    </Html>
  );
};
