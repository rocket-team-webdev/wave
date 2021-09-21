import React from "react";

import Button from "./components/Button";
import Input from "./components/Input";

function App() {
  return (
    <div>
      <Button>Primary button</Button>
      <Button secondaryBtn>Secondary button</Button>
      <Input />
      <Input fullWidth />
    </div>
  );
}

export default App;
