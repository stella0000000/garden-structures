import { useState } from "react";

type HookReturnType = [number, (num: number) => void, () => void];

const useActiveItem: () => HookReturnType = () => {
  const [activeItem, setActiveItem] = useState<number>(-1);

  const selectItem = (key: number) => {
    setActiveItem(key);
  };

  const deselectAllItems = () => {
    setActiveItem(-1);
  };

  return [activeItem, selectItem, deselectAllItems];
};

export default useActiveItem;
