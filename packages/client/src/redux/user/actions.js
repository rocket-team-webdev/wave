import { SET_LOGIN, SET_LOGOUT, SET_REGISTER } from "./types";

export const logIn = (value) => ({
  type: SET_LOGIN,
  payload: value,
});

export const isRegistering = (value) => ({
  type: SET_REGISTER,
  payload: value,
});

export const logOut = () => ({ type: SET_LOGOUT });
