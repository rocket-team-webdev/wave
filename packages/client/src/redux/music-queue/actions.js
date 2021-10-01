import { SET, ADD, CLEAR, SET_SHUFFLE, CLEAR_SHUFFLE, SET_ALL } from "./types";

export const setQueue = (value) => ({
  type: SET,
  payload: value,
});

export const setQueueAll = (value) => ({
  type: SET_ALL,
  payload: value,
});

export const addSong = (value) => ({
  type: ADD,
  payload: value,
});

export const clearQueue = () => ({
  type: CLEAR,
});

export const setShuffle = (value) => ({
  type: SET_SHUFFLE,
  payload: value,
});

export const clearShuffle = () => ({
  type: CLEAR_SHUFFLE,
});
