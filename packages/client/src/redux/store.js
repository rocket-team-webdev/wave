import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import CombinedReducers from "./reducers";

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const appliedMiddleware = devTools
  ? compose(applyMiddleware(thunk), devTools)
  : compose(applyMiddleware(thunk));
const store = createStore(CombinedReducers, appliedMiddleware);

export default store;
