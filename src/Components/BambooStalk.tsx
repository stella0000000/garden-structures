import { useEffect, useState } from "react";
import { LinkedList, LinkedListFromArray } from "../DataStructures/LinkedList";
import Node3D from "./Node3D";
import ControlPanel from "./ControlPanel";
import useActiveItem from "../Hooks/useActiveItem";

type BambooStalkProps = {
  root: LinkedList;
  positionOffsets: [number, number, number];
  selectPlant: () => void;
  deselectAllPlants: () => void;
  isActive: boolean;
};

const BambooStalk = (props: BambooStalkProps) => {
  const { root, positionOffsets, selectPlant, deselectAllPlants, isActive } =
    props;
  const { activeItem, selectItem, deselectAllItems } = useActiveItem();

  let cumulativeHeight = 0;

  const [values, setValues] = useState<number[]>(root.intoArray());

  useEffect(() => {
    console.log("activeNodeIndex" + activeItem);
  }, [activeItem]);

  const children: React.ReactNode[] = [];
  children.push(
    <Node3D
      value={2}
      key={-1}
      position={[
        positionOffsets[0],
        positionOffsets[1],
        positionOffsets[2] + 0.3,
      ]}
      rotation={[0, 0, 0]}
      cylinderArgs={[1, 2, 1]}
      isSelected={false}
      defaultColor={"brown"}
      deselectAllPlants={deselectAllPlants}
      deselectAllNodes={() => {
        deselectAllItems();
        deselectAllPlants();
      }}
      selectPlant={selectPlant}
      selectNode={deselectAllItems}
      materialOverride={null}
    />
  );
  values.forEach((nodeValue, index) => {
    children.push(
      <Node3D
        value={nodeValue}
        key={index}
        position={[
          positionOffsets[0],
          positionOffsets[1] + cumulativeHeight + 0.5 * nodeValue,
          positionOffsets[2],
        ]}
        rotation={[0, 0, 0]}
        cylinderArgs={[1, 1, nodeValue]}
        isSelected={isActive && activeItem === index}
        deselectAllPlants={deselectAllPlants}
        selectPlant={selectPlant}
        defaultColor={"green"}
        deselectAllNodes={deselectAllItems}
        selectNode={() => selectItem(index)}
        materialOverride={null}
      />
    );
    cumulativeHeight += nodeValue;
  });

  const handleAppend = () => {
    let newLinkedList = LinkedListFromArray(values);
    newLinkedList.append(Math.random() * 10);
    setValues(newLinkedList.intoArray());
  };

  const handlePop = () => {
    console.log({ values });
    const len = values.length;
    let newLinkedList = LinkedListFromArray(values);
    console.log({ newLinkedList });
    newLinkedList.delete(len - 1);
    console.log({ newLinkedList });
    setValues(newLinkedList.intoArray());
  };

  const operations = {
    append: handleAppend,
    pop: handlePop,
  };

  return (
    <>
      {/* {createPortal(
        <div style={{ position: "fixed", top: 0, left: 0 }}>
          bamboocontrols
          <button onClick={() => handleAppend()}>Add a bamboo section</button>
          <button onClick={() => handlePop()}>Remove a bamboo section</button>
        </div>,
        document.body
      )} */}

      {children}

      {isActive && (
        <ControlPanel
          data={root}
          activeNodeId={activeItem}
          operations={operations}
        />
      )}
    </>
  );
};

export default BambooStalk;
