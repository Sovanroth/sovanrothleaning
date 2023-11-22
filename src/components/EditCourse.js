import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOneData, updateCourse } from "../redux/slice/courseSlice";
import { isEmpty } from "@firebase/util";
import LoadingScreen from "./LoadingScreen";

const categoryData = [
  {
    id: 1,
    name: "Front End",
  },
  {
    id: 2,
    name: "Back End",
  },
  {
    id: 3,
    name: "Accounting",
  },
  {
    id: 4,
    name: "Engineering",
  },
  {
    id: 5,
    name: "Music",
  },
];

export default function EditCourse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const oneData = useSelector((state) => state?.courses?.oneData);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState({});

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
  const handleChangeCourseActive = (e) => {
    const newVal = { ...data, active: e.target.value };
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
        category: "10",
        courseImage: data?.courseImage,
        coursePrice: data?.coursePrice,
        courseResource: data?.courseResource,
        active: "1",
      };
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
      category: "",
      courseImage: oneData?.course?.courseImage,
      coursePrice: oneData?.course?.coursePrice,
      courseResource: oneData?.course?.courseResource,
      active: "",
    });

  }, [oneData]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : isEmpty(oneData) ? (
        <div />
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

                <p className=" text-sm pt-5">
                  Drap and Drop to reorder the chapters
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
