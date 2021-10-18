import {
  SET_SONG,
  SET_QUEUE,
  ADD,
  DELETE,
  CLEAR,
  SET_SHUFFLE,
  CLEAR_SHUFFLE,
  SET_REPEAT,
  SET_ALL,
  LIKE,
  NEXT_SONG,
  PREV_SONG,
  SET_LIST_POSITION,
  SET_PLAY_STATE,
  SET_VOLUME,
} from "./types";

import initialState from "./state";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SONG:
      return {
        ...state,
        willPlay: false,
        listPosition: action.payload.listPosition,
        queue: [
          // ...state.queue.slice(0, state.listPosition),
          action.payload.track,
          ...state.queue.slice(state.listPosition + 1),
        ],
      };
    case SET_QUEUE:
      return {
        ...state,
        queue: action.payload,
      };
    case SET_ALL:
      return {
        ...state,
        ...action.payload,
      };
    case ADD:
      return {
        ...state,
        queue: [...state.queue, action.payload],
      };
    case DELETE:
      return {
        ...state,
        willPlay: false,
        listPosition: action.payload.listPosition - action.payload.offset,
        queue: [
          ...state.queue.slice(0, action.payload.index),
          ...state.queue.slice(action.payload.index + 1),
        ],
      };
    case CLEAR:
      return initialState;
    case SET_SHUFFLE:
      return { ...state, isShuffled: true, shuffleOrder: action.payload };
    case CLEAR_SHUFFLE:
      return { ...state, isShuffled: false, shuffleOrder: null };
    case SET_REPEAT:
      return { ...state, repeatState: action.payload };
    case LIKE: {
      const currentSong = state.queue[action.payload];
      currentSong.isLiked = !currentSong.isLiked;
      return {
        ...state,
        queue: [
          ...state.queue.slice(0, action.payload),
          currentSong,
          ...state.queue.slice(action.payload + 1),
        ],
      };
    }
    case NEXT_SONG:
      return { ...state, listPosition: state.listPosition + 1, willPlay: true };
    case PREV_SONG:
      return { ...state, listPosition: state.listPosition - 1, willPlay: true };
    case SET_LIST_POSITION:
      return { ...state, listPosition: action.payload };
    case SET_PLAY_STATE:
      return { ...state, willPlay: action.payload };
    case SET_VOLUME:
      return { ...state, volume: action.payload };
    default:
      break;
  }
  return state;
};

export default reducer;
