import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: false,
  filter: {
    email: "",
    role: "",
    username: "",
    password: "",
  },
  user: [],
};

const signUpSlice = createSlice({
  name: "signUp", // Add the name option
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.filter = action.payload;
    },
    setFilterSuccess(state, actions) {
      state.isLoading = false;
      state.filter = actions.payload;
    },
    signUp(state, actions) {
      state.isLoading = false;
      state.user = actions.payload;
    },
  },
});

export const createUser = (params) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axios.post(
      `http://localhost:8000/auth/signup`,
      params
    );
    if (response?.data) {
      dispatch(signUp(response?.data));
    }
    console.log("signup", response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const { startLoading, stopLoading, hasError, setFilterSuccess, signUp } =
  signUpSlice.actions;

export default signUpSlice.reducer;
