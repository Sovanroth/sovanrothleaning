import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCoursesData, getOneData } from "../redux/slice/courseSlice";
import Moment from "react-moment";
import { Link, useNavigate } from "react-router-dom";
import { AreaChart, Code2, DatabaseZap, Music, Settings } from "lucide-react";
import LoadingScreen from "./LoadingScreen";
import { isEmpty } from "@firebase/util";

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
  const data = useSelector((state) => state?.courses?.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const originalCourse = data?.data;
  // const [course, setCourse] = useState(originalCourse);
  // const course = data?.data;

  const initData = async () => {
    setLoading(true);
    let response = {};

    try {
      const response = await dispatch(getCoursesData());
      console.log(response)
    } catch (error) {
      console.log(error);
      response = error;
    }
    setLoading(false);
    return response;
  };

  // const initDataByOne = async () => {
  //   setLoading(true);
  //   try {
  //     const respone = await dispatch(getOneData());
  //     console.log("onedata", respone);
  //     return respone;
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  // };

  // const handleClickBackend = () => {
  //   const category1 =
  //     data?.data?.filter((course) => course.category === "1") || [];
  //   setCourse(category1);
  // };

  useEffect(() => {
    console.log(data);
    initData();
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : isEmpty(data) ? (
        <LoadingScreen />
      ) : (
        <div className="bg-white ">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto mt-5 grid max-w-2xl">
              <div className="hidden md:flex flex-row gap-2">
                {list.map((data) => (
                  <button
                    type="button"
                    className="rounded-full bg-white px-3 py-1.5 text-xs text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <div className=" flex flex-row">
                      {data.icon}
                      <div className="ml-px align-middle">{data.category}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-4 md:grid-cols-2">
              {data?.data?.map((post, index) => (
                <Link to={`/browse/buy-course/${post.course_id}`}>
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
                          {post.create_at}
                        </Moment>
                        <a
                          key={post.category}
                          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 "
                        >
                          {post.category}
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
                          className="mt-1 line-clamp-3 text-sm leading-6 text-gray-600"
                        >
                          {post.courseDescription}
                        </p>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
