import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

const initialState = {
  isLoading: false,
  error: false,
  filter: {
    email: "",
    password: "",
  },
  user: {},
  profile: {},
  resetLink: {},
  resetData: {},
  changePassword: {},
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
    updateUserSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    },
    createProfileSuccess(state, actions) {
      state.isLoading = false;
      state.profile = actions.payload;
    },
    updateProfileSuccess(state, actions) {
      state.isLoading = false;
      state.profile = actions.payload;
    },
    reqLink(state, actions) {
      state.isLoading = false;
      state.resetLink = actions.payload;
    },
    resetData(state, actions) {
      state.isLoading = false;
      state.resetData = actions.payload;
    },
    changePasswordData(state, actions) {
      state.isLoading = false;
      state.changePassword = actions.payload;
    },
  },
});

export const loginUser = (params) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axiosInstance.post(`/users/auth/login`, params);

    if (response?.data) {
      dispatch(login(response?.data));
    }

    if (response?.data?.user?.token) {
      localStorage.setItem("token", response?.data?.user?.token);
      localStorage.setItem("userId", response?.data?.user?.id);
      localStorage.setItem("role", response?.data?.user?.role);
      // console.log(localStorage.getItem("userId"));
      // console.log(localStorage.getItem("token"));
      // console.log(localStorage.getItem("role"));
    }

    // console.log(response);

    return response;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const requestResetLink = (params) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axiosInstance.post(
      `/users/auth/forgot-password`,
      params
    );

    if (response?.data) {
      dispatch(reqLink(response?.data));
    }

    return response;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const resetPassword = (param) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axiosInstance.post(
      "/users/auth/reset-password",
      param
    );

    if (response?.data) {
      dispatch(resetData(response?.data));
    }

    return response;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const updateUser = (param) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const respone = await axiosInstance.put(
      `/users/auth/update-user/${localStorage.getItem("userId")}`,
      param,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (respone?.data) {
      dispatch(updateUserSuccess(respone?.data));
    }
    // console.log(respone);
    return respone;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const createProfile = (param) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axiosInstance.post(
      `/users/upload-profile/${localStorage.getItem("userId")}`,
      param,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response?.data) {
      dispatch(createProfileSuccess(response?.data));
    }
    // console.log(response);
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const updateProfile = (param, id) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axiosInstance.put(
      `/users/update-user-profile/${id}`,
      param,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response?.data) {
      dispatch(updateProfileSuccess(response?.data));
    }
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const removeProfile = (id) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axiosInstance.delete(
      `/users/delete-user-profile/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const changePasswordRequest = (params) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axiosInstance.post(
      `/users/change-password/${localStorage.getItem("userId")}`,
      params,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response?.data) {
      dispatch(changePasswordData(response?.data));
    }

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

export const {
  startLoading,
  stopLoading,
  hasError,
  setFilterSuccess,
  login,
  updateUserSuccess,
  createProfileSuccess,
  updateProfileSuccess,
  reqLink,
  resetData,
  changePasswordData,
} = logInSlice.actions;
export default logInSlice.reducer;
