/* eslint-disable jest/no-disabled-tests */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Input from "../../components/Input";

describe("Input component tests", () => {
  test.skip("Check input label", () => {
    render(<Input label="waveApp" />);
    expect(screen.getByLabelText(/waveApp/)).toBeInTheDocument();
  });
});
