import { SET, ADD, CLEAR } from "./types";

import initialState from "./state";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET:
      return action.payload;
    case ADD:
      return state.queue.push(action.payload);
    case CLEAR:
      return initialState;
    default:
      break;
  }
  return state;
};

export default reducer;
