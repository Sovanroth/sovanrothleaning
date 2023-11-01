import { combineReducers } from "@reduxjs/toolkit";
import signUpReducer from "../../src/redux/slice/signUpSlice";

const rootReducer = combineReducers({
  signUp: signUpReducer,
});

export default rootReducer;