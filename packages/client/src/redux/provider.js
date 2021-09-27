import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";

const Provider = ({ children }) => (
  <ReduxProvider store={store}>{children}</ReduxProvider>
);

export default Provider;
