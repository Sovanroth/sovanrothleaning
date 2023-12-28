import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: false,
  filter: {
    email: "",
    password: "",
  },
  user: {},
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

export const loginUser = (params) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axiosInstance.post(`/auth/login`, params);
    if (response?.data) {
      dispatch(login(response?.data));
    }

    localStorage.setItem("token", response?.data?.user?.token);
    console.log(localStorage.getItem("token"));

    return response;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const logOut = async () => {
  localStorage.clear();
  console.log(localStorage.getItem("token"));
};

export const { startLoading, stopLoading, hasError, setFilterSuccess, login } =
  logInSlice.actions;
export default logInSlice.reducer;
