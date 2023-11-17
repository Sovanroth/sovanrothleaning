import { PlayCircle } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCoursesData, getOneData } from "../redux/slice/courseSlice";
import MuxVideo from "@mux/mux-video-react";

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
    <div className="px-6 lg:px-8 mt-5">
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
            <MuxVideo
              stream-type="on-demand"
              playback-id="EcHgOK9coz5K4rjSwOkoE7Y7O01201YMIC200RI6lNxnhs"
              metadata-video-title="Test VOD"
              metadata-viewer-user-id="user-id-007"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCourse;
