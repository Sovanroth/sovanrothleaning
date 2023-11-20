import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCourse,
  getCoursesData,
} from "../../src/redux/slice/courseSlice";
import LoadingScreen from "./LoadingScreen";
import { isEmpty } from "@firebase/util";

const Courses = () => {
  const course = useSelector((state) => state?.courses?.data);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const refreshData = () => {
    dispatch(getCoursesData());
  };

  const deleteData = async (param) => {
    setLoading(true);
    let respone = {};
    try {
      const response = dispatch(deleteCourse(param));
      refreshData();
    } catch (error) {
      console.log(error);
      respone = error;
    }
    setLoading(false);
    return respone;
  };

  useEffect(() => {
    dispatch(getCoursesData());
    console.log(course);
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : isEmpty(course) ? (
        <LoadingScreen />
      ) : (
        <div className="mx-auto">
          <div className="App max-w-7xl mx-auto mt-5">
            <div className="flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 mx-auto">
                  <div className="flex justify-between items-center mb-4">
                    <div></div>
                    <Link to="/teacher-mode/create">
                      <button
                        to="/teachermode-courses/create"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add courses
                      </button>
                    </Link>
                  </div>
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Title
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <FiMoreHorizontal size={18} />
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {course?.data?.map((person) => (
                          <tr key={person.title}>
                            <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900">
                              {person.courseTitle}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {person.coursePrice}
                            </td>
                            <td
                              className={`whitespace-nowrap px-3 py-4 text-sm font-bold ${
                                person.active === "1"
                                  ? "text-green"
                                  : "text-red"
                              }`}
                            >
                              {person.active === "1" ? "Publish" : "Unpublish"}
                            </td>
                            <td>
                              <button
                                type="button"
                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteData(person?.course_id)}
                                className="ml-1 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-100"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
