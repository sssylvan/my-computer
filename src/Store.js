import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunkMiddleware from "redux-thunk";

import { reducer as userAppsReducer } from "./pages/home";

const reducer = combineReducers({
  userApps: userAppsReducer,
});

const middleware = applyMiddleware(thunkMiddleware);

const Store = createStore(reducer, composeWithDevTools(middleware));

export default Store;
