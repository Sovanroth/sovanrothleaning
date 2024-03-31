import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getActiveData,
  getAllCoursesByUser,
  getCourseByCategory,
} from "../redux/slice/courseSlice";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { AreaChart, Code2, DatabaseZap, Music, Settings } from "lucide-react";
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
    category: "MUSIC",
    icon: <Music size={16} color="purple" />,
  },
];

export default function ExploreCourse() {
  const [loading, setLoading] = useState(false);
  const activeData = useSelector((state) => state?.courses?.activeCourse);
  const allCoursesByUserData = useSelector(
    (state) => state?.courses?.allCoursesByUser
  );
  const courseByCategory = useSelector(
    (state) => state?.courses?.courseByCategory
  );
  const dispatch = useDispatch();
  const [clickedCategoryId, setClickedCategoryId] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const coursesToRender = activeId
    ? courseByCategory?.data
    : allCoursesByUserData?.data;

  const handleButtonClick = (id) => {
    setClickedCategoryId(id);
    setActiveId(id === activeId ? null : id);
    // console.log(id);
    handleInitCategoryData(id);
  };

  const getCategoryName = (categoryNumber) => {
    const category = list.find((item) => item.id === categoryNumber);
    return category ? category.category : "Unknown";
  };

  const initActiveData = async () => {
    setLoading(true);

    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await dispatch(getAllCoursesByUser());
      // console.log(response);
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
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initActiveData();
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <div className="mx-auto mt-5 grid max-w-2xl">
          <div className="hidden md:flex flex-row gap-2">
            {list.map((data) => (
              <button
                key={data.id}
                type="button"
                className={`rounded-full bg-white px-3 py-1.5 text-xs text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors duration-300 ${
                  activeId === data.id ? "bg-blue-300" : ""
                }`}
                onClick={() => handleButtonClick(data.id)}
              >
                <div className="flex flex-row">
                  {data.icon}
                  <div className="ml-1 align-middle"> {data.category}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingScreen />
      ) : isEmpty(allCoursesByUserData) ? (
        <LoadingScreen />
      ) : (
        <div className="bg-white ">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-4 md:grid-cols-2">
              {coursesToRender?.error === true ? (
                <p>Course not found</p>
              ) : (
                coursesToRender &&
                coursesToRender.map((post, index) => (
                  <Link to={`/browse/buy-course/${post.id}`}>
                    <motion.article
                      key={post.id + index}
                      className="flex flex-col items-start justify-between relative"
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

                          {/* Add label */}
                          {post?.owned === 1 && (
                            <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs rounded-md px-2 py-1">
                              Owned
                            </div>
                          )}
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
                            <p
                              key={post.coursePrice}
                              className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 "
                            >
                              {post.coursePrice}
                            </p>
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
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
