/* eslint-disable jest/no-disabled-tests */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Input from "../../components/Input";

describe.skip("Input Component", () => {
  test("renders", () => {
    render(<Input label="renderedInput" />);
    expect(screen.getByLabelText(/renderedInput/i)).toBeInTheDocument();
  });
  test("uploads a file and shows the name", () => {
    render(<Input type="file" label="fileInput" />);

    const inputEl = screen.getByLabelText(/fileInput/);

    const file = new File([""], "testImg.png", {
      type: "image/png",
    });

    userEvent.upload(inputEl, file);

    expect(screen.getByText(/testImg\.png/)).toBeInTheDocument();
  });
  test("when gets an error shows the message", () => {
    render(<Input hasErrorMessage errorMessage="testError" />);

    expect(screen.getByText(/testError/)).toBeInTheDocument();
  });
});
