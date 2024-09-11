import { useState } from "react";
import "./App.css";
import Button from "./components/atoms/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button>a</Button>
    </>
  );
}

export default App;
