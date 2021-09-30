import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { PLAYER_QUEUE } from "../constants/local-storage";
import { loadLocalStorageItems, setLocalStorage } from "../utils/localStorage";

import CombinedReducers from "./reducers";

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const appliedMiddleware = devTools
  ? compose(applyMiddleware(thunk), devTools)
  : compose(applyMiddleware(thunk));

const store = createStore(
  CombinedReducers,
  loadLocalStorageItems(PLAYER_QUEUE, {}),
  appliedMiddleware,
);

store.subscribe(() => setLocalStorage(store.getState(), PLAYER_QUEUE));

export default store;
