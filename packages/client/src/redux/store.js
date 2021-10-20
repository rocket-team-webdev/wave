import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { PLAYER_QUEUE } from "../constants/local-storage";
import { loadLocalStorageItems, setLocalStorage } from "../utils/localStorage";
import userInitialState from "./user/state";
import queueInitialState from "./music-queue/state";

import CombinedReducers from "./reducers";

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const appliedMiddleware = devTools
  ? compose(applyMiddleware(thunk), devTools)
  : compose(applyMiddleware(thunk));

const ls = {
  user: userInitialState,
  queue: loadLocalStorageItems(PLAYER_QUEUE, queueInitialState),
};

const store = createStore(CombinedReducers, ls, appliedMiddleware);

store.subscribe(() => setLocalStorage(store.getState().queue, PLAYER_QUEUE));

export default store;
