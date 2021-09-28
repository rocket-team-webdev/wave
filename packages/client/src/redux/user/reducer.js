import { SET_LOGIN, SET_LOGOUT, SET_REGISTER } from "./types";

import initialState from "./state";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return { ...state, ...action.payload };
    case SET_REGISTER:
      return { ...state, isRegistering: action.payload };
    case SET_LOGOUT:
      return initialState;
    default:
      break;
  }
  return state;
};

export default reducer;
