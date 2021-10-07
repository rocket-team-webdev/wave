import React from "react";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Input from "../Input";

test("Check input label", () => {
  render(<Input label="waveApp" />);

  expect(screen.getByLabelText(/waveApp/)).toBeInTheDocument();
});
