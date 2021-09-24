import { combineReducers } from "redux";
// import filterReducer from "./filter/reducer";
// import propertiesDataReducer from "./propertiesData/reducer";
import userReducer from "./user/reducer";

const reducers = combineReducers({
  // filter: filterReducer,
  // propertiesData: propertiesDataReducer,
  user: userReducer,
});

export default reducers;
