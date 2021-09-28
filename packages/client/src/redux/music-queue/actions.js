import { SET, ADD, CLEAR } from "./types";

export const setQueue = (value) => ({
  type: SET,
  payload: value,
});

export const addSong = (value) => ({
  type: ADD,
  payload: value,
});

export const clearQueue = () => ({
  type: CLEAR,
});
