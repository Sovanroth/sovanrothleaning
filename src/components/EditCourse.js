import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOneData, updateCourse } from "../redux/slice/courseSlice";
import { isEmpty } from "@firebase/util";
import LoadingScreen from "./LoadingScreen";

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
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    const newCheckedValue = data?.active === "1" ? "0" : "1";
    setIsChecked(newCheckedValue === "1");
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
    let response = {};
    try {
      response = dispatch(getOneData(id));
    } catch (error) {
      response = error;
    }
    setLoading(false);
    return response;
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
      dispatch(updateCourse(params, id));
      console.log(params);
      navigate("/teacher-mode");
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    console.log(oneData);
    initData();
  }, []);

  useEffect(() => {
    setData({
      courseTitle: oneData?.course?.courseTitle,
      courseDescription: oneData?.course?.courseDescription,
      category: oneData?.course?.category,
      courseImage: oneData?.course?.courseImage,
      coursePrice: oneData?.course?.coursePrice,
      courseResource: oneData?.course?.courseResource,
      active: oneData?.course?.active,
    });
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

          {/* {JSON.stringify(oneData)} */}
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

              {/* Course Title */}
              <div class="mt-10 border bg-slate-100 rounded-md p-4">
                <div class="font-medium text-sm flex items-center justify-between">
                  Course Title
                  {/* <button className=" flex">
                <Edit2 size={14} className=" mt-0.5" />
                <p className="ml-1 text-sm">Edit Title</p>
              </button> */}
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
                  {/* <button className=" flex">
                <Edit2 size={14} className=" mt-0.5" />
                <p className="ml-1 text-sm">Edit Description</p>
              </button> */}
                </div>
                <div className="mt-3">
                  <textarea
                    rows={4}
                    name="courseDescription"
                    id="courseDescription"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    // placeholder={oneData?.course?.courseDescription}
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
                    defaultValue="Canada"
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
                  {/* <button className=" flex">
                <Edit2 size={14} className=" mt-0.5" />
                <p className="ml-1 text-sm">Edit Image</p>
              </button> */}
                </div>
                <div className="mt-3">
                  <input
                    type="text"
                    name="courseImage"
                    id="courseImage"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    // placeholder={oneData?.course?.courseImage}
                    value={data.courseImage}
                    onChange={(e) => handleChangeCourseImage(e)}
                  />
                </div>
                <img
                  className=" w-full mt-3"
                  src={oneData?.course?.courseImage}
                />
              </div>

              {/* Access Setting */}
              {/* <div class="mt-6 border bg-slate-100 rounded-md p-4">
            <div class="font-medium text-sm flex items-center justify-between">
              Access Setting
            </div>
            <p className=" text-sm pt-5">This Chapter is free for preview.</p>
          </div> */}
            </div>
            <div className=" pt-4">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleUdpateCourse}
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  POST
                </button>
                {/* <button
              type="button"
              className="ml-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500"
            >
              Delete
            </button> */}
              </div>
              {/* <div className=" mt-12 flex">
            <FaThList color="#CCCCCC" size={30} />
            <div className="pt-1 pl-1.5">Course Chapters</div>
          </div> */}

              <div class="mt-6 border bg-slate-100 rounded-md p-4">
                <div class="font-medium text-sm flex items-center justify-between">
                  Course Chapters
                  {/* <button className=" flex">
                <PlusCircle size={14} className=" mt-0.5" />
                <p className="ml-1 text-sm">Add Chapter</p>
              </button> */}
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
                        <span class="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" />
                  </label>
                </div>

                <p className=" text-sm pt-5">
                  Videos List
                </p>
              </div>

              {/* Course Price */}
              <div class="mt-6 border bg-slate-100 rounded-md p-4">
                <div class="font-medium text-sm flex items-center justify-between">
                  Course Price
                  {/* <button className=" flex">
                <Edit2 size={14} className=" mt-0.5" />
                <p className="ml-1 text-sm">Edit Price</p>
              </button> */}
                </div>
                <div className="mt-3">
                  <input
                    type="text"
                    name="coursePrice"
                    id="coursePrice"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    // placeholder={oneData?.course?.coursePrice}
                    value={data.coursePrice}
                    onChange={(e) => handleChangeCoursePrice(e)}
                  />
                </div>
              </div>

              <div class="mt-6 border bg-slate-100 rounded-md p-4">
                <div class="font-medium text-sm flex items-center justify-between">
                  Acceess Privacy
                  {/* <button className=" flex">
                <PlusCircle size={14} className=" mt-0.5" />
                <p className="ml-1 text-sm">Add Resource</p>
              </button> */}
                </div>

                <div className="relative flex items-start mt-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      aria-describedby="comments-description"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      checked={Boolean(data?.active === "1")}
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
              <div class="mt-6 border bg-slate-100 rounded-md p-4">
                <div class="font-medium text-sm flex items-center justify-between">
                  Resource and Attatchments
                  {/* <button className=" flex">
                <PlusCircle size={14} className=" mt-0.5" />
                <p className="ml-1 text-sm">Add Resource</p>
              </button> */}
                </div>
                <div className="mt-3">
                  <input
                    type="text"
                    name="courseResource"
                    id="courseResource"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    // placeholder={oneData?.course?.courseResource}
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
