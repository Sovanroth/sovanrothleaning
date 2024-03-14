import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

const initialState = {
  loading: false,
  error: false,
  filter: {},
  data: [],
  oneData: [],
  videoData: [],
  getCourseByUser: [],
  activeCourse: [],
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
    getActiveCourse(state, actions) {
      state.loading = false;
      state.activeCourse = actions.payload;
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
    buyCourseSuccess(state, actions) {
      state.loading = false;
      state.filter = actions.payload;
    },
    getCourseByUserIDSuccess(state, action) {
      state.loading = false;
      state.getCourseByUser = action.payload;
    },
  },
});

export const getCoursesData = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axiosInstance.get(`/courses/get-all-course`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response?.data) {
      dispatch(getCourses(response?.data));
      console.log("course", response);
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const getActiveData = () => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axiosInstance.get(`/courses/get-course-by-active`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response?.data) {
      dispatch(getActiveCourse(response?.data));
      // console.log("active course", response);
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
      `/courses/get-course-by-id/${param}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (respone?.data) {
      // dispatch(getone)
      dispatch(getCourseByone(respone?.data));
      console.log(respone);
      console.log(param);
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
      `/courses/delete-course/${param}`,
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
    dispatch(stopLoading);
  }
};

export const updateCourse = (params, id) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const respone = await axiosInstance.put(
      `/courses/update-course/${id}`,
      params,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
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
    const respone = await axiosInstance.delete(`/video/delete-video/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
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
    const response = await axiosInstance.post(`/video/post-video`, params, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
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
    const response = await axiosInstance.post(`/course/create-course`, params, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
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

export const buyCourse = (courseId) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axiosInstance.post(
      `/users/buy-course?userId=${localStorage.getItem(
        "userId"
      )}&courseId=${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response?.data) {
      dispatch(buyCourseSuccess());
    }
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const getCourseByUserID = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const respone = await axiosInstance.get(
      `/users/auth/get-user-by-id/${localStorage.getItem("userId")}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (respone?.data) {
      dispatch(getCourseByUserIDSuccess(respone?.data));
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

export const {
  startLoading,
  stopLoading,
  hasError,
  setFilterSuccess,
  getCourses,
  getCourseByone,
  updateCourseSuccess,
  createCourseSuccess,
  getCourseByUserIDSuccess,
  postVideoSuccess,
  buyCourseSuccess,
  getActiveCourse,
} = coursesSlice.actions;

export default coursesSlice.reducer;
