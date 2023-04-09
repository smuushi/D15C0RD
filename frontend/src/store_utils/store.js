import { legacy_createStore as createStore } from "redux";

import { combineReducers } from "redux";

import { applyMiddleware } from "redux";

import { compose } from "redux";

import thunk from "redux-thunk";

import { SessionReducer, SessionErrorReducer } from "../reducers/SessionReducer";
// import UsersReducer from "../reducers/userReducer";

import { ModalReducer } from "../reducers/ModalReducer";

import { ServerReducer, serverErrorReducer } from "../reducers/ServerReducer";

import { UserReducer } from "../reducers/UserReducer";

import { ChannelReducer } from "../reducers/ChannelReducer";

import { InviteReducer } from "../reducers/InviteReducer";


const entitiesReducer = combineReducers({
    session: SessionReducer,
    servers: ServerReducer,
    users: UserReducer,
    channels: ChannelReducer,
    invite: InviteReducer
})



const errorsReducer = combineReducers({
    sessionError: SessionErrorReducer,
    serverError: serverErrorReducer
})

const rootReducer = combineReducers({
  entities: entitiesReducer,
  activeModal: ModalReducer,
  errors: errorsReducer
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