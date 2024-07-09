import styled from "styled-components";

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding-bottom: 20px;
  box-sizing: border-box;
`;

const Container = styled.div`
  position: relative;
  border: 1px solid black;
  color: black;
  background: white;
  padding: 20px;
  display: flex;
  gap: 20px;
  border-radius: 20px;
  box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.5);
`;

const CloseX = styled.div`
  position: absolute;
  border-radius: 100px;
  right: 0;
  top: 0;
  background: black;
  width: 30px;
  height: 30px;
  color: white;
  display: grid;
  place-content: center;
  transform: translate(50%, -50%);
  cursor: pointer;
  pointer-events: auto;
`;

const Scrim = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
`;

type MenuBoxProps = {
  children: React.ReactNode;
  onExit: () => void;
};

export const MenuBox = ({ children, onExit }: MenuBoxProps) => {
  return (
    <MenuWrapper>
      <Scrim onClick={onExit} />
      <Container>
        <CloseX onClick={onExit}>X</CloseX>
        {children}
      </Container>
    </MenuWrapper>
  );
};
