import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingScreen from "./LoadingScreen";
import { isEmpty } from "@firebase/util";
import { getOneData } from "../redux/slice/courseSlice";
import { LockKeyhole, PlayCircle } from "lucide-react";
import { Tooltip } from "react-tooltip";
import MuxPlayer from "@mux/mux-player-react";
import ReactPlayer from "react-player";

const ViewsCourse = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const oneData = useSelector((state) => state?.courses?.oneData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showFullText, setShowFullText] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(9 / 16);

  useEffect(() => {
    if (oneData?.data?.videos.length > 0) {
      setCurrentVideoUrl(oneData.data.videos[0].video_url);
      setActiveIndex(0);
    }
  }, [oneData]);

  const handleButtonClick = (index, videoUrl) => {
    setCurrentVideoUrl(videoUrl);
    setActiveIndex(index);
  };

  const toggleShowText = () => {
    setShowFullText(!showFullText);
  };

  const initData = async () => {
    setLoading(true);
    let response = {};

    try {
      response = await dispatch(getOneData(id));
    } catch (error) {
      console.log(error);
      response = error;
    }
    setLoading(false);
    console.log(response);
    return response;
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : isEmpty(oneData?.data?.videos) ? (
        <LoadingScreen />
      ) : (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-5">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="rounded-full bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Back
          </button>

          <div className="flex">
            <div className="w-1/3">
              <div className=" p-4">
                <h1 className="text-xl font-bold">
                  {oneData?.data?.courseTitle}
                </h1>

                <div>
                  <p
                    key={oneData?.data?.courseDescription}
                    className={`mt-1 ${
                      showFullText ? "line-clamp-none" : "line-clamp-4"
                    } text-sm leading-6`}
                  >
                    {oneData?.data?.courseDescription}
                  </p>
                  {!showFullText && (
                    <button
                      className="text-blue-500 underline mt-1 text-sm cursor-pointer"
                      onClick={toggleShowText}
                    >
                      See more
                    </button>
                  )}
                  {showFullText && (
                    <button
                      className="text-blue-500 underline mt-1 text-sm cursor-pointer"
                      onClick={toggleShowText}
                    >
                      Show less
                    </button>
                  )}
                </div>
                <div class="border-t border-gray-500 my-4"></div>
                {oneData?.data?.videos.map((video, index) => (
                  <div className="flex flex-row mt-2" key={index}>
                    <button
                      type="button"
                      className={`w-screen text-start rounded-md px-3 py-2 text-sm font-semibold bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors duration-300 ${
                        activeIndex === index
                          ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-gray-300"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleButtonClick(index, video.video_url)}
                    >
                      <div className="flex flex-row">
                        <PlayCircle size={24} />
                        <p className="content-center ml-2 mt-px align-middle">
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
              <div className="p-4">
                <div
                  className="w-full relative"
                  style={{ paddingTop: `${aspectRatio * 100}%` }}
                >
                  <ReactPlayer
                    url={currentVideoUrl}
                    width="100%"
                    height="100%"
                    controls
                    className="absolute top-0 left-0"
                  />
                </div>

                <div class="mt-6 border bg-slate-100 rounded-md p-4">
                  <div class="font-medium text-sm flex items-center justify-between">
                    Resource and Attatchments
                  </div>
                  <a
                    href={oneData?.data?.courseResource}
                    className="mt-3 text-sm italic text-blue-800 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {oneData?.data?.courseResource}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewsCourse;
