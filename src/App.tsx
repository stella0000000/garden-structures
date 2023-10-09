import "./App.css";
import GlobalCanvas from "./Components/GlobalCanvas";
import Instructions from "./Components/Instructions";
import { useState } from "react";

function App() {
  const [instructionsVisible, setInstructionsVisible] = useState<boolean>(true);

  setTimeout(() => {
    setInstructionsVisible(false);
  }, 3000);

  const [isPointerLock, setIsPointerLock] = useState(false);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {instructionsVisible && <Instructions />}
      <GlobalCanvas
        isPointerLock={isPointerLock}
        setIsPointerLock={() => setIsPointerLock(false)}
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
