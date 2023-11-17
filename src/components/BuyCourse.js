import { PlayCircle } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCoursesData, getOneData } from "../redux/slice/courseSlice";
import MuxPlayer from "@mux/mux-video-react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const BuyCourse = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const oneData = useSelector((state) => state?.courses?.oneData);
  const dispatch = useDispatch();

  const initData = async () => {
    setLoading(true);

    try {
      const respone = dispatch(getOneData(id));
      return respone;
    } catch (error) {
      console.log(error);
      return error;
    }
    setLoading(false);
  };

  // const initData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await dispatch(getCoursesData());
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  //   // setLoading(false);
  // };

  // const activeCourses = data?.data?.filter(course => course.active === "1") || [];

  useEffect(() => {
    console.log(oneData);
    initData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-5">
      {/* {JSON.stringify(oneData)} */}
      <div className="flex">
        {/* First Column */}
        <div className="w-1/3">
          {/* Your content for the first column goes here */}
          <div className=" p-4">
            {/* {oneData?.map((data) => ( */}
            <h1 className="text-xl font-bold">
              {oneData?.course?.courseTitle}
            </h1>
            <p className=" text-sm mt-2">
              {oneData?.course?.courseDescription}
            </p>
            {/* ))} */}

            <div class="border-t border-gray-500 my-4"></div>

            <div className="flex flex-row">
              <div>
                <PlayCircle />
              </div>
              <div className="ml-2">description</div>
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className="w-2/3">
          {/* Your content for the second column goes here */}
          <div className="p-4">
            <MuxPlayer
              streamType="on-demand"
              width={1080}
              playbackId="EcHgOK9coz5K4rjSwOkoE7Y7O01201YMIC200RI6lNxnhs"
              metadata={{
                video_id: "video-id-54321",
                video_title: "Test video title",
                viewer_user_id: "user-id-007",
              }}
            />
            <div class="mt-6 border bg-slate-100 rounded-md p-4">
              <div class="font-medium text-sm flex items-center justify-between">
                Resource and Attatchments
              </div>
              {/* <p className=" text-sm pt-5 italic">No Attatchments</p> */}
              <a
                className=" text-sm pt-10 italic text-blue-400 underline"
                href={oneData?.course?.courseResource}
                target="_blank"
              >
                {oneData?.course?.courseResource}
              </a>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-full mt-5 bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Buy Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCourse;
