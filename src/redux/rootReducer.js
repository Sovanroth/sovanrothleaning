import { combineReducers } from "@reduxjs/toolkit";
import signUpReducer from "../../src/redux/slice/signUpSlice";
import coursesRedcuer from "../../src/redux/slice/courseSlice"
import loginReducer from "../../src/redux/slice/loginSlice"

const rootReducer = combineReducers({
  signUp: signUpReducer,
  courses: coursesRedcuer,
  logIn: loginReducer,
});

export default rootReducer;