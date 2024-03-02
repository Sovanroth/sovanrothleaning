import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCourse,
  getCoursesData,
} from "../../src/redux/slice/courseSlice";
import LoadingScreen from "./LoadingScreen";
import { isEmpty } from "@firebase/util";
import DeleteCourseModal from "./DeleteCourseModal";

const Courses = () => {
  const course = useSelector((state) => state?.courses?.data);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const refreshData = () => {
    setLoading(true);
    dispatch(getCoursesData());
    setLoading(false)
  };

  const deleteData = async (param) => {
    setLoading(true);
    let respone = {};
    try {
      respone = dispatch(deleteCourse(param));
      console.log(respone)
    } catch (error) {
      console.log(error);
      respone = error;
    }
    setLoading(false);
    refreshData();
    return respone;
  };

  const handleChangeEditCoursePage = () => {
    navigate("/teacher-mode/edit-course");
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = (courseId) => {
    // Handle the delete logic here
    // You can call your deleteData function here
    // deleteData(courseId);

    // After handling delete, close the modal
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    // If the user cancels the delete operation, close the modal
    setShowDeleteModal(false);
  };

  useEffect(() => {
    console.log(course);
    dispatch(getCoursesData())
    refreshData()
  }, [getCoursesData]);

  useEffect(() => {
  }, [])

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
                    <Link to="/teacher-mode/create-course">
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
                                person.active === 1
                                  ? "text-green"
                                  : "text-red"
                              }`}
                            >
                              {person.active === 1 ? "Publish" : "Unpublish"}
                            </td>
                            <td>
                              <Link
                                to={`/teacher-mode/edit-course/${person.id}`}
                              >
                                <button
                                  type="button"
                                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                  Edit
                                </button>
                              </Link>

                              <button
                                type="button"
                                onClick={() => deleteData(person?.id)}
                                // onClick={handleDeleteClick}
                                className="ml-1 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-red-400 shadow-sm ring-1 ring-inset ring-red-400 hover:bg-red-100"
                              >
                                Delete
                                <span>
                                  {showDeleteModal && (
                                    <DeleteCourseModal
                                      onConfirm={handleDeleteConfirm}
                                      onCancel={handleDeleteCancel}
                                      courseId={person?.id}
                                      courseTitle={person?.courseTitle}
                                    />
                                  )}
                                </span>
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
