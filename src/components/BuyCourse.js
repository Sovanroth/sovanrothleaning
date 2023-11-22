import { Play, PlayCircle, PlayIcon } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneData } from "../redux/slice/courseSlice";
import MuxPlayer from "@mux/mux-player-react";
import FAQ from "./FAQ";
import { isEmpty } from "@firebase/util";
import LoadingScreen from "./LoadingScreen";

const BuyCourse = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const oneData = useSelector((state) => state?.courses?.oneData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState([])

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

  useEffect(() => {
    console.log(oneData);
    initData();
  }, []);

  // useEffect(() => {
  //   const item = oneData?.course?.videos;
  //   setVideoData(item)
  // })

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : isEmpty(oneData?.course?.videos) ? (
        <LoadingScreen />
      ) : (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-5">
          {/* {JSON.stringify(oneData)} */}

          <button
            onClick={() => navigate(-1)}
            type="button"
            className="rounded-full bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Back
          </button>

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
                {/* {JSON.stringify(oneData)} */}
                {oneData?.course?.videos.map((video) => (
                  <div className="flex flex-row mt-2">
                    <button
                      type="button"
                      className=" w-screen text-start rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <div className="flex flex-row">
                        <PlayCircle />
                        <p className=" content-center ml-2 mt-px rem align-middle">
                          {video.video_title}
                        </p>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Second Column */}
            <div className="w-2/3">
              {/* Your content for the second column goes here */}
              <div className="p-4">
                <MuxPlayer
                  streamType="on-demand"
                  playbackId="p6ONh8T3gJ89jEX1JOlMZJzXNlB6FMFTCVsskQfnY6Q"
                  metadataVideoTitle="Placeholder (optional)"
                  metadataViewerUserId="Placeholder (optional)"
                  primaryColor="#FFFFFF"
                  secondaryColor="#000000"
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
          {/* <FAQ/> */}
        </div>
      )}
    </div>
  );
};

export default BuyCourse;
