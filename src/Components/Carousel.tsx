import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { PlantName } from "../gardenStore";

const Wrapper = styled.div`
  border: 1px solid pink;
  width: 100vw;
  display: flex;
  flex-direction: row;
  bottom: 0px;
  column-gap: 30px;
  align-items: center;
  background-color: black;
  position: relative;
  top: 100dvh;
  transform: translateY(-100%);
`;

const Reticle = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid white;
  border-radius: 50%;
  position: fixed;
  left: 50dvw;
  top: 50dvh;
  transform: translate(-50%, -50%);
`;

const Button = styled.div`
  font-size: 30px;
  width: 100%;
`;

type CarouselProps = {
  setGhostType: (a: PlantName) => void;
  ghostType: PlantName;
};

const Carousel = (props: CarouselProps) => {
  const { setGhostType, ghostType } = props;
  const plantNames = Object.values(PlantName);
  const currPlantIdx = plantNames.indexOf(ghostType);
  const [scrollY, setScrollY] = useState<number>(0);
  const scrollSensitivity = 8;
  const stickyFactor = 1.1;
  const maxDeltaY = 2;

  useEffect(() => {
    addEventListener("wheel", handleWheel);
    // console.log(plantNames[selectedIdx]);
    return () => removeEventListener("wheel", handleWheel);
  }, []);

  const closerToZero = (a: number, b: number) => {
    if (Math.abs(a) < Math.abs(b)) {
      return a;
    } else {
      return b;
    }
  };

  const handleWheel = (e: WheelEvent) => {
    setScrollY((scrollY) => scrollY + closerToZero(e.deltaY, maxDeltaY));
  };

  useFrame(() => {
    if (scrollY > scrollSensitivity) {
      setGhostType(plantNames[(currPlantIdx + 1) % plantNames.length]);
      setScrollY(0);
      // console.log(0);
    } else if (scrollY < -scrollSensitivity) {
      // force positive modulo because javascript
      // setSelectedIdx((selectedIdx - 1 + items.length) % items.length);
      setGhostType(
        plantNames[(currPlantIdx - 1 + plantNames.length) % plantNames.length]
      );
      setScrollY(0);
      // console.log(0);
    } else {
      setScrollY((scrollY) => {
        // console.log(scrollY / stickyFactor);
        return Math.abs(scrollY / stickyFactor) < 0.25
          ? 0
          : scrollY / stickyFactor;
      });
    }
  });

  // useEffect(() => {
  //   let calculatedScrollY = scrollY;

  //   if (scrollY > scrollSensitivity) {
  //     setSelectedIdx((selectedIdx + 1) % items.length);
  //     calculatedScrollY = 0;
  //   }

  //   if (scrollY < -scrollSensitivity) {
  //     // force positive modulo because javascript
  //     setSelectedIdx((selectedIdx - 1 + items.length) % items.length);
  //     calculatedScrollY = 0;
  //   }

  //   // rubber band effect
  //   // figure out which scroll location we're closest to 0, 1, 2
  //   // move scrollY by some small amount to whichever we are closest to
  //   // const direction = scrollY % items.length

  //   // we are already right at a boundary / button
  //   console.log(calculatedScrollY);
  //   // if (calculatedScrollY % scrollSensitivity === 0) return;

  //   const stickyDistance =
  //     0.5 * scrollSensitivity - (calculatedScrollY % scrollSensitivity);

  //   calculatedScrollY = calculatedScrollY + stickyDistance / 2;
  //   setScrollY(calculatedScrollY);

  //   // [           .               .                ]

  //   // length of line = items.length * scrollSensitivity
  //   // < avg = slide down
  //   // > avg = slide up
  // }, [scrollY]);

  return (
    <Html
      calculatePosition={() => {
        return [0, 0, 0];
      }}
    >
      <Wrapper>
        {plantNames.map((item, i) => (
          <Button
            key={i}
            style={currPlantIdx === i ? { background: "blue" } : {}}
          >
            {item}
          </Button>
        ))}
      </Wrapper>
      <Reticle />
    </Html>
  );
};

export default Carousel;
