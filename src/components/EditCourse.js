import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteVideo,
  getCoursesData,
  getOneData,
  updateCourse,
} from "../redux/slice/courseSlice";
import { isEmpty } from "@firebase/util";
import LoadingScreen from "./LoadingScreen";
import {
  Blocks,
  CircleDollarSign,
  File,
  Hand,
  ListChecks,
  PlayCircle,
} from "lucide-react";
import DeleteVideoModal from "./DeleteVideoModal";
import AddVideoModal from "./AddVideoModal";

const categoryData = [
  {
    id: 1,
    name: "FRONT END",
  },
  {
    id: 2,
    name: "BACK END",
  },
  {
    id: 3,
    name: "ACCOUNTING",
  },
  {
    id: 4,
    name: "ENGINEERING",
  },
  {
    id: 5,
    name: "MUSIC",
  },
  {
    id: 6,
    name: "MOGWARTS",
  },
];

export default function EditCourse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const oneData = useSelector((state) => state?.courses?.oneData);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [videoName, setVideoName] = useState("");
  const [videoId, setVideoId] = useState("");

  const deletModal = (name, id) => {
    setVideoId(id);
    setVideoName(name);
    setDeleteModalOpen(true);
  };

  const addModal = () => {
    setAddModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const handleCheckboxChange = () => {
    const newCheckedValue = data?.active === 1 ? 0 : 1;
    setIsChecked(newCheckedValue === 1);
    const newVal = { ...data, active: newCheckedValue };
    setData(newVal);
  };

  const handleChangeCourseTitle = (e) => {
    const newVal = { ...data, courseTitle: e.target.value };
    setData(newVal);
  };

  const handleChangeCourseDescriptin = (e) => {
    const newVal = { ...data, courseDescription: e.target.value };
    setData(newVal);
  };

  const handleChangeCourseImage = (e) => {
    const newVal = { ...data, courseImage: e.target.value };
    setData(newVal);
  };
  const handleChangeCoursePrice = (e) => {
    const newVal = { ...data, coursePrice: e.target.value };
    setData(newVal);
  };
  const handleChangeCourseResrouce = (e) => {
    const newVal = { ...data, courseResource: e.target.value };
    setData(newVal);
  };

  const handleChnageCategory = (e) => {
    const newVal = { ...data, category: e.target.value };
    setData(newVal);
  };

  const initData = async () => {
    setLoading(true);
    try {
      const response = await dispatch(getOneData(id));
      return response;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const handleUdpateCourse = async () => {
    setLoading(true);
    try {
      const params = {
        courseTitle: data?.courseTitle,
        courseDescription: data?.courseDescription,
        category: data?.category,
        courseImage: data?.courseImage,
        coursePrice: data?.coursePrice,
        courseResource: data?.courseResource,
        active: data?.active,
      };
      console.log(params);
      await dispatch(updateCourse(params, id));
      console.log(params);
      navigate("/teacher-mode");
    } catch (error) {
      await dispatch(getCoursesData());
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    initData();
    // console.log(oneData);
  }, []);

  useEffect(() => {
    if (oneData) {
      setData({
        courseTitle: oneData?.data?.courseTitle,
        courseDescription: oneData?.data?.courseDescription,
        category: oneData?.data?.category,
        courseImage: oneData?.data?.courseImage,
        coursePrice: oneData?.data?.coursePrice,
        courseResource: oneData?.data?.courseResource,
        active: oneData?.data?.active,
      });
    }
  }, [oneData]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : isEmpty(oneData) ? (
        <LoadingScreen />
      ) : (
        <div>
          <div className=" text-center m-5 font-bold text-xl">Edit Course</div>

          <div className="grid grid-cols-2 gap-4 max-w-7xl mx-auto pt-4">
            <div className="pl-8">
              <div className=" text-start">
                <div className=" flex">
                  <button
                    onClick={() => navigate(-1)}
                    type="button"
                    className="rounded-full bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Back
                  </button>
                  {/* <p className=" text-xl font-bold">Course Setup</p> */}
                </div>
              </div>

              <div className="mt-5 flex-grow text-start rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                <div className="flex flex-row justify-center">
                  <Blocks size={35} className=" text-indigo-600" />
                  <h1 className="ml-2 mt-2 text-center">
                    Customize Your Course
                  </h1>
                </div>
              </div>

              {/* Course Title */}
              <div class="mt-5 border bg-slate-100 rounded-md p-4">
                <div class="font-medium text-sm flex items-center justify-between">
                  Course Title
                </div>

                <div className="mt-3">
                  <input
                    type="text"
                    name="courseTitle"
                    id="courseTitle"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={data.courseTitle}
                    onChange={(e) => handleChangeCourseTitle(e)}
                  />
                </div>
              </div>

              {/* Course Description */}
              <div class="mt-6 border bg-slate-100 rounded-md p-4">
                <div class="font-medium text-sm flex items-center justify-between">
                  Course Description
                </div>
                <div className="mt-3">
                  <textarea
                    rows={4}
                    name="courseDescription"
                    id="courseDescription"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    value={data.courseDescription}
                    onChange={(e) => handleChangeCourseDescriptin(e)}
                  />
                </div>
              </div>

              {/* Course Category */}
              <div class="mt-6 border bg-slate-100 rounded-md p-4">
                <div class="font-medium text-sm flex items-center justify-between">
                  Course Cateogry
                </div>
                <div className=" mt-5">
                  <select
                    id="courseCategory"
                    name="courseCategory"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={data?.category}
                    onChange={(e) => handleChnageCategory(e)}
                  >
                    {categoryData.map((category) => (
                      <option>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Course Image */}
              <div class="mt-6 border bg-slate-100 rounded-md p-4">
                <div class="font-medium text-sm flex items-center justify-between">
                  Course Image
                </div>
                <div className="mt-3">
                  <input
                    type="text"
                    name="courseImage"
                    id="courseImage"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={data.courseImage}
                    onChange={(e) => handleChangeCourseImage(e)}
                  />
                </div>
                <img
                  className=" w-full mt-3"
                  src={oneData?.course?.courseImage}
                />
              </div>
            </div>
            <div className=" pt-1">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleUdpateCourse}
                  className="rounded-full bg-green-500 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
              <div className="mt-5 flex-grow text-start rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                <div className="flex flex-row justify-center">
                  <ListChecks size={35} className=" text-indigo-600" />
                  <h1 className="ml-2 mt-2 text-center">Course Chapter</h1>
                </div>
              </div>

              <div class="mt-6 border bg-slate-100 rounded-md p-4">
                <div class="flex items-center justify-between">
                  <div class="font-medium text-sm">Course Chapters</div>
                  <div className="flex">
                    <button
                      type="button"
                      onClick={() => addModal()}
                      className=" rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Video
                    </button>
                    {addModalOpen && <AddVideoModal onClose={closeAddModal} />}
                  </div>
                </div>

                <p className=" text-sm pt-2 overflow-y-auto max-h-80 ">
                  {oneData?.data?.videos?.map((video) => (
                    <div className="mt-3 flex flex-row">
                      <div className="flex-grow text-start rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        <div className="flex flex-row">
                          <PlayCircle />
                          <p className="content-center ml-2 mt-px rem align-middle">
                            {video?.video_title}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          deletModal(video?.video_title, video?.id)
                        }
                        className="ml-3 mr-3 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  {deleteModalOpen && (
                    <DeleteVideoModal
                      onClose={closeDeleteModal}
                      videoName={videoName}
                      videoId={videoId}
                    />
                  )}
                </p>
              </div>

              {/* Course Price */}

              <div className="mt-5 flex-grow text-start rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                <div className="flex flex-row justify-center">
                  <CircleDollarSign size={35} className=" text-indigo-600" />
                  <h1 className="ml-2 mt-2 text-center">Course Price</h1>
                </div>
              </div>
              <div class="mt-6 border bg-slate-100 rounded-md p-4">
                <div class="font-medium text-sm flex items-center justify-between">
                  Course Price
                </div>
                <div className="mt-3">
                  <input
                    type="text"
                    name="coursePrice"
                    id="coursePrice"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={data.coursePrice}
                    onChange={(e) => handleChangeCoursePrice(e)}
                  />
                </div>
              </div>

              <div className="mt-5 flex-grow text-start rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                <div className="flex flex-row justify-center">
                  <Hand size={35} className=" text-indigo-600" />
                  <h1 className="ml-2 mt-2 text-center">Acceess Privacy</h1>
                </div>
              </div>

              <div class="mt-6 border bg-slate-100 rounded-md p-4">
                <div class="font-medium text-sm flex items-center justify-between">
                  Acceess Privacy
                </div>

                <div className="relative flex items-start mt-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      aria-describedby="comments-description"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      checked={Boolean(data?.active === 1)}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label
                      htmlFor="comments"
                      className="font-medium text-gray-900"
                    >
                      Click this checkbox if you want everyone to see your
                      course as public and buy it.
                    </label>
                  </div>
                </div>
              </div>

              {/* Resource */}
              <div className="mt-5 flex-grow text-start rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                <div className="flex flex-row justify-center">
                  <File size={35} className=" text-indigo-600" />
                  <h1 className="ml-2 mt-2 text-center">
                    Resource and Attatchments
                  </h1>
                </div>
              </div>
              <div class="mt-6 border bg-slate-100 rounded-md p-4">
                <div class="font-medium text-sm flex items-center justify-between">
                  Resource and Attatchments
                </div>
                <div className="mt-3">
                  <input
                    type="text"
                    name="courseResource"
                    id="courseResource"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={data.courseResource}
                    onChange={(e) => handleChangeCourseResrouce(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
