import { combineReducers } from "@reduxjs/toolkit";
import signUpReducer from "../../src/redux/slice/signUpSlice";
import coursesRedcuer from "../../src/redux/slice/courseSlice"

const rootReducer = combineReducers({
  signUp: signUpReducer,
  courses: coursesRedcuer,
});

export default rootReducer;