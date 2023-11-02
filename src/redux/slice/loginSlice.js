import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: false,
  filter: {
    email: "",
    password: "",
  },
  user: [],
};

const logInSlice = createSlice({
  name: "logIn", // Add the name option
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
    login(state, actions) {
      state.isLoading = false;
      state.user = actions.payload;
    },
  },
});

export const { startLoading, stopLoading, hasError, setFilterSuccess, login } =
  logInSlice.actions;

export const createUser = (params) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axios.post(
      `http://localhost:8000/auth/login`,
      params
    );
    if (response?.data) {
      dispatch(login(response?.data));
    }
    console.log("login", params);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default signUpSlice.reducer;
