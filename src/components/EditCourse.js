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
import EditVideoModal from "./EditVideoModal";

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
];

export default function EditCourse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const oneData = useSelector((state) => state?.courses?.oneData);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [videoName, setVideoName] = useState("");
  const [videoId, setVideoId] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoResource, setVideoResource] = useState("");
  const [video, setVideo] = useState("");

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

  const editModal = (tilte, url, id, description, resource) => {
    setVideoTitle(tilte);
    setVideoURL(url);
    setVideo(id);
    setVideoDescription(description);
    setVideoResource(resource);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
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
    const file = e.target.files[0];
    setData({ ...data, courseImage: file });
    console.log(file);

    const selectedImagePreview = document.getElementById(
      "selected-image-preview"
    );
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        selectedImagePreview.src = e.target.result;
        selectedImagePreview.classList.remove("hidden");
      };
      reader.readAsDataURL(file);
    } else {
      selectedImagePreview.src = "";
      selectedImagePreview.classList.add("hidden");
    }
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
      const updatedData = {
        courseTitle: data?.courseTitle,
        courseDescription: data?.courseDescription,
        category: data?.category,
        courseImage: data?.courseImage,
        coursePrice: data?.coursePrice,
        courseResource: data?.courseResource,
        active: data?.active,
      };

      const formData = new FormData();

      if (originalData.courseTitle !== updatedData.courseTitle) {
        formData.append("courseTitle", data?.courseTitle);
      }

      if (originalData.category !== updatedData.category) {
        formData.append("category", data?.category);
      }

      if (originalData.courseDescription !== updatedData.courseDescription) {
        formData.append("courseDescription", data?.courseDescription);
      }

      if (originalData.coursePrice !== updatedData.coursePrice) {
        formData.append("coursePrice", data?.coursePrice);
      }

      if (originalData.courseResource !== updatedData.courseResource) {
        formData.append("courseResource", data?.courseResource);
      }

      if (originalData.active !== updatedData.active) {
        formData.append("active", data?.active);
      }

      if (originalData.courseImage !== data.courseImage) {
        formData.append("courseImage", data?.courseImage);
      }

      const numberOfChangedFields = Object.keys(formData).length;
      if (numberOfChangedFields === 0) {
        navigate("/teacher-mode");
      }

      const response = await dispatch(updateCourse(formData, id));
      if (response?.data?.error == false) {
        navigate("/teacher-mode");
      }
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      await dispatch(getCoursesData());
      setLoading(false);
    }
  };

  useEffect(() => {
    initData();
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
      setOriginalData({
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-7xl lg:mx-auto pt-4 sm:w-screen">
            <div className="pl-8 pr-8 sm:pr-0">
              <div className=" text-start">
                <div className=" flex justify-between">
                  <button
                    onClick={() => navigate(-1)}
                    type="button"
                    className="rounded-full bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleUdpateCourse}
                    className="sm:hidden rounded-full bg-green-500 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                  >
                    {loading ? "Updating..." : "Update"}
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
                      <option>{category.id}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Course Image */}
              <div class="mt-6 border bg-slate-100 rounded-md p-4">
                <div class="font-medium text-sm flex items-center justify-between">
                  Course Image
                </div>
                <div class=" mt-3 flex items-center justify-center w-full">
                  <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Click to upload</span>
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        JPG, JPEG, PNG
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      accept="image/*"
                      class="hidden"
                      onChange={handleChangeCourseImage}
                    />
                  </label>
                </div>

                <div>
                  <div className="mt-2 text-center text-sm">Preview Image</div>
                  <img
                    className="mt-2"
                    src=""
                    alt="Selected Image"
                    class="hidden"
                    id="selected-image-preview"
                  />
                </div>
              </div>

              <div className="sm:hidden">
                {/* <div className="mt-5 flex-grow text-start rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                  <div className="flex flex-row justify-center">
                    <ListChecks size={35} className=" text-indigo-600" />
                    <h1 className="ml-2 mt-2 text-center">Course Chapter</h1>
                  </div>
                </div> */}

                {/* <div class="mt-6 border bg-slate-100 rounded-md p-4">
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
                      {addModalOpen && (
                        <AddVideoModal onClose={closeAddModal} />
                      )}
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
                            editModal(
                              video?.video_title,
                              video?.video_url,
                              video?.id
                            )
                          }
                          className="ml-3 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            deletModal(video?.video_title, video?.id)
                          }
                          className="ml-2 mr-3 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
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

                    {editModalOpen && (
                      <EditVideoModal
                        onClose={closeEditModal}
                        videoTitle={videoTitle}
                        videoURL={videoURL}
                        videoId={video}
                      />
                    )}
                  </p>
                </div> */}

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
                    <div className="ml-3 text-sm">
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

            <div className="hidden sm:block pr-8">
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
                          editModal(
                            video?.video_title,
                            video?.video_url,
                            video?.id,
                            video?.video_description,
                            video?.video_resource
                          )
                        }
                        className="ml-3 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          deletModal(video?.video_title, video?.id)
                        }
                        className="ml-2 mr-3 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
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

                  {editModalOpen && (
                    <EditVideoModal
                      onClose={closeEditModal}
                      videoTitle={videoTitle}
                      videoURL={videoURL}
                      videoId={video}
                      videoDescriptionValue={videoDescription}
                      videoResourceValue={videoResource}
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
