import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  filter: {},
  data: [],
  oneData: [],
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
    postVideoSuccess(state, actions){
      state.loading = false;
      state.data = actions.payload;
    }
  },
});

export const getCoursesData = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.get(
      `http://54.179.248.23:8000/course/get-all-courses`
    );
    if (response?.data) {
      dispatch(getCourses(response?.data));
      // console.log("course", response);
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
  dispatch(stopLoading());
};

export const getOneData = (param) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const respone = await axios.get(
      `http://54.179.248.23:8000/course/get-course-with-video/${param}`
    );
    if (respone?.data) {
      // dispatch(getone)
      dispatch(getCourseByone(respone?.data));
      return respone;
    }
  } catch (error) {
    console.log(error);
    return error;
  }

  dispatch(stopLoading);
};

export const deleteCourse = (param) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.delete(
      `http://54.179.248.23:8000/course/delete-course/${param}`
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateCourse = (params, id) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const respone = await axios.patch(
      `http://54.179.248.23:8000/course/update-course/${id}`,
      params
    );
    if (respone?.data) {
      dispatch(updateCourseSuccess(respone?.data));
    }
    console.log(respone);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteVideo = (id) => async (dispatch) => {
  dispatch(startLoading);

  try {
    const respone = await axios.delete(
      `http://54.179.248.23:8000/video/delete-video/${id}`
    );
    return respone;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postVideo = (params) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axios.post(
      `http://54.179.248.23:8000/video/post-video`,
      params
    );
    if(response?.data) {
      dispatch(postVideoSuccess())
    }
  } catch (error) {
    console.log(error);
    return error;
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
  postVideoSuccess,
} = coursesSlice.actions;

export default coursesSlice.reducer;
