import { combineReducers } from "redux";

// import articleReducer from './articleReducer';
import addReducer from "./addReducer";

const rootReducer = combineReducers({
  add: addReducer,
});

export default rootReducer;
