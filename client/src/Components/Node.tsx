import { useEffect, useState } from "react";

const Node = ({ value }: { value: number }) => {
  const [currentHeight, setCurrentHeight] = useState(0);

  const incrementHeight = () => {
    requestAnimationFrame(() => {
      if (currentHeight < value * 10) {
        setCurrentHeight(currentHeight + 1);
      } else {
        setCurrentHeight(currentHeight);
      }
    });
  };

  useEffect(() => {
    incrementHeight();
  }, [currentHeight]);

  return (
    <div>
      <div
        style={{
          height: currentHeight,
          margin: "0 3px",
          background:
            "linear-gradient(90deg, rgba(0,36,6,1) 0%, rgba(9,121,20,1) 17%, rgba(123,252,135,1) 49%, rgba(9,121,20,1) 81%, rgba(0,36,6,1) 100%)",
        }}
      >
        Node: {value}
      </div>
      <div
        style={{
          borderRadius: 3,
          height: 10,
          background:
            "radial-gradient(circle, rgba(181,174,110,1) 80%, rgba(83,74,32,1) 100%)",
        }}
      ></div>
    </div>
  );
};

export default Node;
