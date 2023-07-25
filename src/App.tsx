// import { useState } from "react";
import "./App.css";
import GlobalCanvas from "./Components/GlobalCanvas";
// import Instructions from "./Components/Instructions";

function App() {
  // const [instructionsVisible, setInstructionsVisible] = useState<boolean>(true)

  // setTimeout(() => {
  //   setInstructionsVisible(false)
  // }, 3000)

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* {instructionsVisible && <Instructions />} */}
      <GlobalCanvas />
    </div>
  );
}

export default App;
