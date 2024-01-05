import "./App.css";
import GlobalCanvas from "./Components/GlobalCanvas";
// import Instructions from "./Components/Instructions";
import { useEffect, useState } from "react";

function App() {
  // const [instructionsVisible, setInstructionsVisible] = useState<boolean>(true);
  const [isPointerLock, setIsPointerLock] = useState(false);
  const [isDataMode, setIsDataMode] = useState(true);

  // setTimeout(() => {
  //   setInstructionsVisible(false);
  // }, 3000);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key == "m") setIsDataMode(!isDataMode);
  };

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [isDataMode]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* {instructionsVisible && <Instructions />} */}
      <GlobalCanvas
        // isPointerLock={isPointerLock}
        // setIsPointerLock={() => setIsPointerLock(false)}
        {...{
          isPointerLock,
          setIsPointerLock: () => setIsPointerLock(false),
          isDataMode,
          // setIsDataMode,
        }}
      />

      {/* Invisible screen over the Canvas to enable PointerLockControls */}
      {!isPointerLock && (
        <div
          style={{
            top: "0px",
            position: "absolute",
            width: "100vw",
            height: "100vh",
          }}
        ></div>
      )}
    </div>
  );
}

export default App;
