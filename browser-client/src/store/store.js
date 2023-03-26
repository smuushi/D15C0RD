// import { createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
// import thunk from "redux-thunk";
// import rootReducer from "../reducers/root_reducer";

import { createStore } from "redux";
import rootReducer from "../reducers/root_reducer";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk"

const configureStore = (preloadedState = {}) =>
  createStore(rootReducer, preloadedState, applyMiddleware(thunk));

export default configureStore;