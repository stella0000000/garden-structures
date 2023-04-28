import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LinkedList from "./Components/LinkedList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="card">
        <LinkedList />
      </div>
    </>
  );
}

export default App;
