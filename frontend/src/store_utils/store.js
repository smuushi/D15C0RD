import { legacy_createStore as createStore } from "redux";

import { combineReducers } from "redux";

import { applyMiddleware } from "redux";

import { compose } from "redux";

import thunk from "redux-thunk";

import { SessionReducer } from "../reducers/SessionReducer";
// import UsersReducer from "../reducers/userReducer";

const rootReducer = combineReducers({
  session: SessionReducer
})


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

export const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};