import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getActiveData,
  getCourseByCategory,
  getCourseByUserID,
} from "../redux/slice/courseSlice";
import Moment from "react-moment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AreaChart,
  Clapperboard,
  Code2,
  DatabaseZap,
  Music,
  Settings,
} from "lucide-react";
import LoadingScreen from "./LoadingScreen";
import { isEmpty } from "@firebase/util";
import { motion } from "framer-motion";

const list = [
  {
    id: 1,
    category: "FRONT END",
    icon: <Code2 size={16} color="blue" />,
  },
  {
    id: 2,
    category: "BACK END",
    icon: <DatabaseZap size={16} color="red" />,
  },
  {
    id: 3,
    category: "ACCOUNTING",
    icon: <AreaChart size={16} color="green" />,
  },
  {
    id: 4,
    category: "ENGINEERING",
    icon: <Settings size={16} />,
  },
  {
    id: 5,
    category: "Movie",
    icon: <Clapperboard size={16} color="purple" />,
  },
];

export default function CourseOwned() {
  const [loading, setLoading] = useState(false);
  const data = useSelector((state) => state?.courses?.getCourseByUser);
  const activeCourse = useSelector((state) => state?.courses?.activeCourse);
  const courseByCategory = useSelector(
    (state) => state?.courses?.courseByCategory
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(null);
  const [clickedCategoryId, setClickedCategoryId] = useState(null);
  const coursesToRender = activeId ? courseByCategory?.data : data?.data;
  let role = localStorage.getItem("role");

  const getCategoryName = (categoryNumber) => {
    const category = list.find((item) => item.id === categoryNumber);
    return category ? category.category : "Unknown";
  };

  const initData = async () => {
    setLoading(true);
    let response = {};
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await dispatch(getCourseByUserID());
    } catch (error) {
      console.log(error);
      response = error;
    }
    setLoading(false);
    return response;
  };

  const getAllCourseForAdmin = async () => {
    setLoading(true);
    try {
      const response = await dispatch(getActiveData());
      return response;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const handleInitCategoryData = async (id) => {
    setLoading(true);

    try {
      const response = await dispatch(getCourseByCategory(id));
      return response;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (id) => {
    setClickedCategoryId(id);
    setActiveId(id === activeId ? null : id);
    handleInitCategoryData(id);
  };

  useEffect(() => {
    initData();
    getAllCourseForAdmin();
  }, []);

  return (
    <div>
      {/* <div className="mx-auto mt-5 grid max-w-2xl justify-center">
        <div className="hidden md:flex flex-row gap-2">
          {list.map((data, index) => (
            <button
              key={index}
              type="button"
              className="rounded-full bg-white px-3 py-1.5 text-xs text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => handleButtonClick(data.id)}
            >
              <div className="flex flex-row items-center">
                {data.icon}
                <div className="ml-1">{data.category}</div>
              </div>
            </button>
          ))}
        </div>
      </div> */}

      {loading ? (
        <LoadingScreen />
      ) : isEmpty(data?.data?.courses) ? (
        <div class="flex items-center justify-center">
          <div>
            <div class="flex justify-center items-center">
              <img src="/13.svg" width="400" alt="No Content" />
            </div>
            <h1 class="text-center text-xl font-bold">
              You haven't bought any courses yet.
            </h1>
          </div>
        </div>
      ) : (
        <div className="bg-white ">
          {role === "1" ? (
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-4 md:grid-cols-2">
                {activeCourse?.data?.map((post, index) => (
                  <Link to={`/dashboard/course/${post.id}`}>
                    <motion.article
                      key={post.id + index}
                      className="flex flex-col items-start justify-between"
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <article
                        key={post.id + index}
                        className="flex flex-col items-start justify-between"
                      >
                        <div className="relative w-full">
                          <img
                            key={post.courseImage}
                            src={post.courseImage}
                            alt=""
                            className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                          />
                          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                        </div>
                        <div className="max-w-xl">
                          <div className="mt-2 flex items-center gap-x-4 text-xs">
                            <Moment key={post?.create_at} format="DD-MMM-YYYY">
                              {post.createdAt}
                            </Moment>
                            <a
                              key={post.category}
                              className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600"
                            >
                              {getCategoryName(post.category)}
                            </a>
                          </div>
                          <div className="group relative">
                            <h3 className="mt-1 font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                              <a href={post.href} key={post.courseTitle}>
                                <span className="absolute inset-0" />
                                {post.courseTitle}
                              </a>
                            </h3>
                            <p
                              key={post.courseDescription}
                              className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600"
                            >
                              {post.courseDescription}
                            </p>
                          </div>
                        </div>
                      </article>
                    </motion.article>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-4 md:grid-cols-2">
                {data?.data?.courses?.map((post, index) => (
                  <Link to={`/dashboard/course/${post.id}`}>
                    <motion.article
                      key={post.id + index}
                      className="flex flex-col items-start justify-between"
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <article
                        key={post.id + index}
                        className="flex flex-col items-start justify-between"
                      >
                        <div className="relative w-full">
                          <img
                            key={post.courseImage}
                            src={post.courseImage}
                            alt=""
                            className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                          />
                          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                        </div>
                        <div className="max-w-xl">
                          <div className="mt-2 flex items-center gap-x-4 text-xs">
                            <Moment key={post?.create_at} format="DD-MMM-YYYY">
                              {post.createdAt}
                            </Moment>
                            <a
                              key={post.category}
                              className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600"
                            >
                              {getCategoryName(post.category)}
                            </a>
                          </div>
                          <div className="group relative">
                            <h3 className="mt-1 font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                              <a href={post.href} key={post.courseTitle}>
                                <span className="absolute inset-0" />
                                {post.courseTitle}
                              </a>
                            </h3>
                            <p
                              key={post.courseDescription}
                              className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600"
                            >
                              {post.courseDescription}
                            </p>
                          </div>
                        </div>
                      </article>
                    </motion.article>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
