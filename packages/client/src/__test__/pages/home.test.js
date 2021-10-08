/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jest/no-disabled-tests */

// import userEvent from "@testing-library/user-event";
import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import { render, screen, cleanup, fireEvent } from "../../utils/test-utils";
import "@testing-library/jest-dom";

import Home from "../../pages/Public/Home";

jest.mock("firebase/compat/app", () => {
  return {
    auth: jest.fn(() => {
      return {
        onAuthStateChanged: jest.fn().mockResolvedValue(),
      };
    }),
    apps: [],
    initializeApp: jest.fn(),
  };
});

describe("Home Page test", () => {
  afterEach(cleanup);

  test("Home page rendering", async () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Home />
      </Router>,
    );

    // Home page rendered - Popular
    expect(screen.getByText(/welcome to waveapp/i)).toBeInTheDocument();
  });
});
