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
  courseByCategory: [],
  searchCourse: [],
  allCoursesByUser: [],
  oneCourseByUser: {},
  checkout: {},
  excecutePayment: {},
  comment: {},
  replyData: {},
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
    updateVideoSuccess(state, actions) {
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
    getCourseByCategorySuccess(state, actions) {
      state.loading = false;
      state.courseByCategory = actions.payload;
    },
    searchCourseSuccess(state, actions) {
      state.loading = false;
      state.searchCourse = actions.payload;
    },
    getAllCoursesByUserSuccess(state, actions) {
      state.loading = false;
      state.allCoursesByUser = actions.payload;
    },
    getOneCoruseByUserSuccess(state, actions) {
      state.loading = false;
      state.oneCourseByUser = actions.payload;
    },
    getCheckOutSuccess(state, actions) {
      state.loading = false;
      state.checkout = actions.payload;
    },
    getExcecutePaymentSuccess(state, actions) {
      state.loading = false;
      state.excecutePayment = actions.payload;
    },
    createCommentSuccess(state, actions) {
      state.loading = false;
      state.comment = actions.payload;
    },
    createReplySuccess(state, actions) {
      state.loading = false;
      state.replyData = actions.payload;
    },
    getCommentSuccess(state, actions) {
      state.loading = false;
      state.comment = actions.payload;
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
      // console.log(respone);
      // console.log(param);
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

    return respone;
    // console.log(respone);
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const deleteVideo = (id) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axiosInstance.delete(
      `/courses/delete-course-video/${id}`,
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

export const postVideo = (id, params) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axiosInstance.post(
      `/courses/post-video/${id}`,
      params,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
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
    const response = await axiosInstance.post(
      `/courses/create-course`,
      params,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // console.log(response);
    if (response?.data) {
      dispatch(createCourseSuccess());
    }
    return response;
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
      null,
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

export const getCourseByCategory = (id) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axiosInstance.get(
      `/users/get-category?userId=${localStorage.getItem(
        "userId"
      )}&categoryId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response?.data) {
      dispatch(getCourseByCategorySuccess(response?.data));
    }

    return response;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const getSearchCourse = (param) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axiosInstance.get(
      `/courses/search-course?search-input=${param}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response?.data) {
      dispatch(searchCourseSuccess(response?.data));
    }
    return response;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const getAllCoursesByUser = () => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axiosInstance.get(
      `/users/get-all-course-by-user/${localStorage.getItem("userId")}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response?.data) {
      dispatch(getAllCoursesByUserSuccess(response?.data));
      // console.log(response);
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const getOneCourseByUser = (id) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axiosInstance.get(
      `/users/get-one-course?userId=${localStorage.getItem(
        "userId"
      )}&courseId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response?.data) {
      dispatch(getOneCoruseByUserSuccess(response?.data));
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const updateVideoData = (id, params) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axiosInstance.put(
      `/courses/update-video/${id}`,
      params,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response?.data) {
      dispatch(updateVideoSuccess(response?.data));
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const checkOut = (param) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axiosInstance.post(
      `/users/paypal/create-order`,
      param,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response?.data) {
      dispatch(getCheckOutSuccess(response?.data));
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const excecutePaymentData = (param) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axiosInstance.post(
      `/users/paypal/execute-payment`,
      param,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response?.data) {
      dispatch(getExcecutePaymentSuccess(response?.data));
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const getCommentByCourse = (courseId) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axiosInstance.get(
      `/comments/get-comment-by-course-id/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response?.data) {
      dispatch(getCommentSuccess(response?.data));
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading);
  }
};

export const postComment = (courseId, param) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axiosInstance.post(
      `/comments/create-comment/${localStorage.getItem("userId")}/${courseId}`,
      param,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response?.data) {
      dispatch(postVideoSuccess(response?.data));
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const deleteComemet = (commentId) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axiosInstance.delete(
      `/comments/delete-comment/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const editComment = (commentId, param) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await axiosInstance.put(
      `/comments/upadte-comment/${commentId}`,
      param,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const createReply = (commmentId, param) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axiosInstance.post(
      `/replies/create-reply/${localStorage.getItem("userId")}/${commmentId}`,
      param,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response?.data) {
      dispatch(createReplySuccess(response?.data));
      return response;
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
  getCourseByUserIDSuccess,
  postVideoSuccess,
  buyCourseSuccess,
  getActiveCourse,
  getCourseByCategorySuccess,
  searchCourseSuccess,
  getAllCoursesByUserSuccess,
  getOneCoruseByUserSuccess,
  updateVideoSuccess,
  getCheckOutSuccess,
  getExcecutePaymentSuccess,
  createCommentSuccess,
  createReplySuccess,
  getCommentSuccess,
} = coursesSlice.actions;

export default coursesSlice.reducer;
