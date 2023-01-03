import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  rootReducer,

  composeEnhancers(applyMiddleware(thunk))
);

export default store;
