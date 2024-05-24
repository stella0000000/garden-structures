import styled from "styled-components";
import { useGardenStore } from "../gardenStore";
import { useEffect } from "react";

const Screen = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  background: black;
  opacity: 0.8;
  /* filter: blur(2px); */
  z-index: 1000;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const Box = styled.div`
  color: white;
  width: 50%;
  padding: 100px;
  font-size: 20px;
`;

const Instructions = () => {
  const { setInstructionsVisible, instructionsVisible, setIsPointerLock } =
    useGardenStore();

  useEffect(() => {
    console.log({ instructionsVisible });
  }, [instructionsVisible]);

  const handleClick = () => {
    console.log("clickity");
    setInstructionsVisible(false);
    setIsPointerLock(true);
  };

  return (
    <Screen onClick={handleClick}>
      <Wrapper>
        <Box>
          Direction: move mouse<br></br>
          Walk: `w, a, s, d` keys<br></br>
          Planting: `g` key<br></br>[ This website is in progress. ]
        </Box>
      </Wrapper>
    </Screen>
  );
};

export default Instructions;
