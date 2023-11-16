import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { async } from "@firebase/util";

const initialState = {
  isLoading: false,
  error: false,
  filter: {},
  data: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    // startLoading(state) {
    //   state.isLoading = true;
    // },
    // stopLoading(state) {
    //   state.isLoading = false;
    // },
    hasError(state, action) {
      state.isLoading = false;
      state.filter = action.payload;
    },
    setFilterSuccess(state, actions) {
      state.isLoading = false;
      state.filter = actions.payload;
    },
    getCourses(state, actions) {
      state.isLoading = false;
      state.data = actions.payload;
    },
  },
});

export const getCoursesData = () => async (dispatch) => {
  dispatch(startLoading());
  try{
      const response = await axios.get(`http://localhost:8000/course/get-all-courses`);
      if(response?.data) {
          dispatch(getCourses(response?.data));
          // console.log("course", response);
          return response;
      }
  } catch (error) {
      console.log(error);
      return error;
  }
  dispatch(stopLoading())
};

export const deleteCourse = (param) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.delete(`http://localhost:8000/course/delete-course/${param}`);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}


export const { startLoading, stopLoading, hasError, setFilterSuccess, getCourses } =
  coursesSlice.actions;

export default coursesSlice.reducer;


