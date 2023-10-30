import React from "react";
import { Link } from "react-router-dom";

const CreateCourse = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-7xl p-6">
        <h1 className="text-2xl">Name Your Course</h1>
        <p className="text-sm text-slate-600">
          What would you like to name your course? You can edit it later if you
          want to.
        </p>
        <div className="pt-10">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Course Title
          </label>
          <div className="mt-2 size">
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              // placeholder="you@example.com"
            />
          </div>
          <p className="text-sm pt-5 text-gray-500">
            What will you teach in this course?
          </p>
        </div>
        <Link to='/teacher-mode'>
          <button
            type="button"
            className="mr-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
        </Link>

        <button
          type="button"
          className="mt-5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CreateCourse;
