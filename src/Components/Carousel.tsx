import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";

type CarouselProps = {};

const Carousel = () => {
  const items = ["empty hand", "flower", "bamboo"];
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [scrollY, setScrollY] = useState<number>(0);
  const scrollSensitivity = 15;
  const stickyFactor = 1.1;
  const maxDeltaY = 20;

  useEffect(() => {
    addEventListener("wheel", handleWheel);
    return () => removeEventListener("wheel", handleWheel);
  }, []);

  const handleWheel = (e: WheelEvent) => {
    setScrollY((scrollY) => scrollY + Math.min(e.deltaY, maxDeltaY));
  };

  useFrame(() => {
    if (scrollY > scrollSensitivity) {
      setSelectedIdx((selectedIdx + 1) % items.length);
      setScrollY(0);
      console.log(0);
    } else if (scrollY < -scrollSensitivity) {
      // force positive modulo because javascript
      setSelectedIdx((selectedIdx - 1 + items.length) % items.length);
      setScrollY(0);
      console.log(0);
    } else {
      setScrollY((scrollY) => {
        console.log(scrollY / stickyFactor);
        return Math.abs(scrollY / stickyFactor) < 1
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
        return [0, window.innerHeight - 200, 0];
      }}
    >
      {items.map((item, i) => (
        <div key={i} style={selectedIdx === i ? { background: "blue" } : {}}>
          {item}
        </div>
      ))}
    </Html>
  );
};

export default Carousel;
