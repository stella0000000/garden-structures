import styled from 'styled-components'

const Screen = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  background: black;
  opacity: .8;
  /* filter: blur(2px); */
  z-index: 1000;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`

const Box = styled.div`
  color: white;
  /* width: 50%; */
  padding: 100px;
  font-size: 17px;
`

const Instructions = () => {
  return (
    <Screen>
      <Wrapper>
        <Box>
          Use your mouse for direction, and WASD keys for movement.
        </Box>
      </Wrapper>
    </Screen>
  )
}

export default Instructions