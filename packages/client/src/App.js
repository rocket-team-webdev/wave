import React from "react";

import Button from "./components/Button";
import Input from "./components/Input";

function App() {
  return (
    <div>
      <Button>My button</Button>
      <Button secondaryBtn fullWidth>
        My button
      </Button>
      <Input />
      <Input fullWidth />
    </div>
  );
}

export default App;
