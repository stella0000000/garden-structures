import { MenuMode, PlantName, useGardenStore } from "../../gardenStore";
import { MenuBox } from "./MenuBox";
import { Button } from "./HUD";
import { useEffect } from "react";

export const MainMenu = () => {
  const plantNames = Object.values(PlantName);
  const { setGhostType, setMenuMode } = useGardenStore();

  const handlePlantSelectorClick = (plantName: PlantName) => {
    setGhostType(plantName);
    setMenuMode(MenuMode.NONE);
  };

  const handleClose = () => {
    setGhostType(undefined);
    setMenuMode(MenuMode.NONE);
  };

  return (
    <MenuBox onExit={handleClose}>
      {plantNames.map((plantName, i) => {
        return (
          <Button
            key={i}
            onClick={() => handlePlantSelectorClick(plantName)}
            onMouseEnter={() => setGhostType(plantName)}
          >
            {plantName}
          </Button>
        );
      })}
    </MenuBox>
  );
};
