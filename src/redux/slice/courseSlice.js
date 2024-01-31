import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

const initialState = {
  loading: false,
  error: false,
  filter: {},
  data: [],
  oneData: [],
  videoData: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    hasError(state, action) {
      state.loading = false;
      state.filter = action.payload;
    },
    setFilterSuccess(state, actions) {
      state.loading = false;
      state.filter = actions.payload;
    },
    getCourses(state, actions) {
      state.loading = false;
      state.data = actions.payload;
    },
    getCourseByone(state, actions) {
      state.loading = false;
      state.oneData = actions.payload;
    },
    updateCourseSuccess(state, actions) {
      state.loading = false;
      state.data = actions.payload;
    },
    postVideoSuccess(state, actions) {
      state.loading = false;
      state.videoData = actions.payload;
    },
    createCourseSuccess(state, actions) {
      state.loading = false;
      state.data = actions.payload;
    },
  },
});

export const getCoursesData = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axiosInstance.get(`/course/get-all-courses`);
    if (response?.data) {
      dispatch(getCourses(response?.data));
      // console.log("course", response);
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const getOneData = (param) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const respone = await axiosInstance.get(
      `/course/get-course-with-video/${param}`
    );
    if (respone?.data) {
      // dispatch(getone)
      dispatch(getCourseByone(respone?.data));
      return respone;
    }
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading);
  }
};

export const deleteCourse = (param) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axiosInstance.delete(
      `/course/delete-course/${param}`
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading);
  }
};

export const updateCourse = (params, id) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const respone = await axiosInstance.patch(
      `/course/update-course/${id}`,
      params
    );
    if (respone?.data) {
      dispatch(updateCourseSuccess(respone?.data));
    }
    console.log(respone);
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const deleteVideo = (id) => async (dispatch) => {
  dispatch(startLoading);

  try {
    const respone = await axiosInstance.delete(`/video/delete-video/${id}`);
    return respone;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const postVideo = (params) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axiosInstance.post(`/video/post-video`, params);
    if (response?.data) {
      dispatch(postVideoSuccess());
    }
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading);
  }
};

export const createCourse = (params) => async (dispatch) => {
  dispatch(startLoading);

  try {
    const response = await axiosInstance.post(`/course/create-course`, params);
    if (response?.data) {
      dispatch(createCourseSuccess());
    }
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading);
  }
};

export const {
  startLoading,
  stopLoading,
  hasError,
  setFilterSuccess,
  getCourses,
  getCourseByone,
  updateCourseSuccess,
  createCourseSuccess,
  postVideoSuccess,
} = coursesSlice.actions;

export default coursesSlice.reducer;
