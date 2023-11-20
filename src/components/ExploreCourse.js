import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCoursesData, getOneData } from "../redux/slice/courseSlice";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export default function ExploreCourse() {
  const [loading, setLoading] = useState(false);
  const data = useSelector((state) => state?.courses?.data);
  const dispatch = useDispatch();

  const initData = async () => {
    setLoading(true);
    try {
      const response = await dispatch(getCoursesData());
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
    // setLoading(false);
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

  useEffect(() => {
    console.log(data);
    initData();
  }, []);

  return (
    <div className="bg-white ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-4 md:grid-cols-2">
          {data?.data?.map((post, index) => (
            <Link to= {`/browse/buy-course/${post.course_id}`}>
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
                    <Moment key={post?.create_at} format="DD-MMMM-YYYY">
                      {post.create_at}
                    </Moment>
                    {/* <time
                    key={post.date}
                    dateTime={post.datetime}
                    className="text-gray-500"
                  >
                    {post.create_at}
                  </time> */}
                    <a
                      // href={post.category}
                      key={post.category}
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {/* {post.category} */}
                      {post?.category === "1"
                        ? "Front-End"
                        : post?.category === "2"
                        ? "Back-End"
                        : post?.category === "3"
                        ? "Full-Stack Development"
                        : post?.category === "4"
                        ? "Mobile App Development"
                        : post?.category === "5"
                        ? "Web Development"
                        : "Mogwarts"}
                    </a>
                    <p
                      key={post.coursePrice}
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
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
  );
}
