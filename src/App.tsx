import "./App.css";
import GlobalCanvas from "./Components/GlobalCanvas";
// import Instructions from "./Components/Instructions";
import { useEffect } from "react";
import { useGardenStore } from "./gardenStore";

function App() {
  // const [instructionsVisible, setInstructionsVisible] = useState<boolean>(true);
  const { isDataMode, setIsDataMode, isPointerLock } = useGardenStore();

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
      <GlobalCanvas />

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
