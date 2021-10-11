/* eslint-disable jest/no-disabled-tests */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Input from "../../components/Input";

describe("Input Component", () => {
  it("renders", () => {
    render(<Input label="renderedInput" />);
    expect(screen.getByLabelText(/renderedinput/i)).toBeInTheDocument();
  });
  it("uploads a file and shows the name", () => {
    render(<Input type="file" label="fileInput" />);

    const inputEl = screen.getByLabelText(/fileInput/);

    const file = new File([""], "testImg.png", {
      type: "image/png",
    });

    userEvent.upload(inputEl, file);

    expect(screen.getByText(/testImg\.png/)).toBeInTheDocument();
  });
  it("when gets an error shows the message", () => {
    render(<Input hasErrorMessage errorMessage="testError" />);

    expect(screen.getByText(/testError/)).toBeInTheDocument();
  });
});
