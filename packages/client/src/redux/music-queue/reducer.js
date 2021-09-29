import { SET, ADD, CLEAR, SET_SHUFFLE, CLEAR_SHUFFLE } from "./types";

import initialState from "./state";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET:
      return action.payload;
    case ADD:
      return state.queue.push(action.payload);
    case CLEAR:
      return initialState;
    case SET_SHUFFLE:
      return { ...state, isShuffled: true, shuffleOrder: action.payload };
    case CLEAR_SHUFFLE:
      return { ...state, isShuffled: false, shuffleOrder: null };

    default:
      break;
  }
  return state;
};

export default reducer;
