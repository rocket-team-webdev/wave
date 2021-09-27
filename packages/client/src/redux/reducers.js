import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import queueReducer from "./music-queue/reducer";

const reducers = combineReducers({
  user: userReducer,
  queue: queueReducer,
});

export default reducers;
