import React from "react";

import Button from "./components/Button";
import Input from "./components/Input";

function App() {
  return (
    <div>
      <Button>Primary button</Button>
      <Button secondaryBtn>Secondary button</Button>
      <Button isNegative>Secondary button</Button>
      <Button isNegative secondaryBtn>
        Secondary button
      </Button>
      <Button isSmall>Secondary button</Button>
      <Input
        label="hey"
        id="aloha"
        type="password"
        placeholder="This is a placeholder"
      />
    </div>
  );
}

export default App;
