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
  SET_PLAY_STATE,
} from "./types";

import initialState from "./state";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SONG:
      return {
        ...state,
        willPlay: false,
        queue: [
          ...state.queue.slice(0, state.listPosition),
          action.payload,
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
    case NEXT_SONG:
      return { ...state, listPosition: state.listPosition + 1 };
    case PREV_SONG:
      return { ...state, listPosition: state.listPosition - 1 };
    case SET_LIST_POSITION:
      return { ...state, listPosition: action.payload };
    case SET_PLAY_STATE:
      return { ...state, willPlay: action.payload };
    default:
      break;
  }
  return state;
};

export default reducer;
