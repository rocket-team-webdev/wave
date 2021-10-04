import {
  SET_SONG,
  SET_QUEUE,
  ADD,
  CLEAR,
  SET_SHUFFLE,
  CLEAR_SHUFFLE,
  SET_ALL,
  LIKE,
  NEXT_SONG,
  PREV_SONG,
  SET_LIST_POSITION,
} from "./types";

export const setSong = (value) => ({
  type: SET_SONG,
  payload: value,
});

export const setQueue = (value) => ({
  type: SET_QUEUE,
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

export const like = (value) => ({
  type: LIKE,
  payload: value,
});

export const nextSong = () => ({
  type: NEXT_SONG,
});

export const prevSong = () => ({
  type: PREV_SONG,
});

export const setListPosition = (value) => ({
  type: SET_LIST_POSITION,
  payload: value,
});
