import { PlantName, useGardenStore } from "../../gardenStore";
import { MenuBox } from "./MenuBox";
import { Button } from "./HUD";
import { useEffect } from "react";

export const MainMenu = ({
  onCloseAnyMenu,
}: {
  onCloseAnyMenu: () => void;
}) => {
  const plantNames = Object.values(PlantName);
  const { setGhostType } = useGardenStore();

  const handlePlantSelectorClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    plantName: PlantName
  ) => {
    console.log(`clicked ${plantName}`);
    setGhostType(plantName);
    onCloseAnyMenu();
  };

  const handleClose = () => {
    setGhostType(undefined);
    onCloseAnyMenu();
  };

  return (
    <MenuBox onExit={handleClose}>
      {plantNames.map((plantName, i) => {
        return (
          <Button
            key={i}
            onClick={(e) => handlePlantSelectorClick(e, plantName)}
            onMouseEnter={() => setGhostType(plantName)}
          >
            {plantName}
          </Button>
        );
      })}
    </MenuBox>
  );
};
