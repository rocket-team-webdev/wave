import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";

import "@testing-library/jest-dom";

import App from "../App";

test("full app rendering/navigating", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>,
  );

  // Home page
  expect(screen.getByText(/App view/i)).toBeInTheDocument();

  //   const leftClick = { button: 0 };
  //   userEvent.click(screen.getByText(/about/i), leftClick);

  // check that the content changed to the new page
  //   expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument();
});
