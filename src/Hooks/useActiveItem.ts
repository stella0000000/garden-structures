import { useState } from "react";

const useActiveItem = () => {
  const [activeItem, setActiveItem] = useState<number>(-1);

  const deselectAllItems = () => {
    setActiveItem(-1);
  };

  const selectItem = (key: number) => {
    setActiveItem(key);
  };

  return {
    activeItem,
    selectItem,
    deselectAllItems,
  };
};

export default useActiveItem;
