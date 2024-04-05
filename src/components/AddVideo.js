import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { requestResetLink } from "../redux/slice/loginSlice";

const AddVideo = () => {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div className="bg-white px-5 py-4 shadow sm:rounded-lg sm:px-12">
        <div className="text-center text-xl font-bold">Add video for course Test</div>

        <div className="flex mt-5">
          <button
            type="button"
            className="mr-2 w-1/2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Not Now
          </button>
          <button
            type="button"
            className="ml-2 w-1/2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVideo;
