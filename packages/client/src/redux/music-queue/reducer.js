import {
  SET,
  ADD,
  CLEAR,
  SET_SHUFFLE,
  CLEAR_SHUFFLE,
  SET_ALL,
  LIKE,
} from "./types";

import initialState from "./state";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET:
      return {
        ...state,
        queue: [action.payload],
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
    case CLEAR:
      return initialState;
    case SET_SHUFFLE:
      return { ...state, isShuffled: true, shuffleOrder: action.payload };
    case CLEAR_SHUFFLE:
      return { ...state, isShuffled: false, shuffleOrder: null };
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
    // eslint-disable-next-line no-case-declarations
    default:
      break;
  }
  return state;
};

export default reducer;
