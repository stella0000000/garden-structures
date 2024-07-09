import { PlantName, useGardenStore } from "../../gardenStore";
import { MenuBox } from "./MenuBox";
import { Button } from "./HUD";

export const MainMenu = ({ closeMenus }: { closeMenus: () => void }) => {
  const plantNames = Object.values(PlantName);
  const { setGhostType } = useGardenStore();

  const handlePlantButtonClick = (e: any, plantName: PlantName) => {
    // e.stopPropagation();
    // e.preventDefault();
    // // setMenuOpen(false);
    // // setIsPointerLock(true);
    // setGhostType(plantName);
    // closeMenus();
  };

  return (
    <MenuBox onExit={closeMenus}>
      {plantNames.map((plantName, i) => {
        return (
          <Button
            key={i}
            onClick={(e) => handlePlantButtonClick(e, plantName)}
            onMouseEnter={() => setGhostType(plantName)}
          >
            {plantName}
          </Button>
        );
      })}
    </MenuBox>
  );
};
