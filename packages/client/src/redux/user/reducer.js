import { SET_LOGIN, SET_LOGOUT } from "./types";

import initialState from "./state";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return action.payload;
    case SET_LOGOUT:
      return initialState;
    default:
      break;
  }
  return state;
};

export default reducer;
