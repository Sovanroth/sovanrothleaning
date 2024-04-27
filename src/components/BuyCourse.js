import { Play, PlayCircle, PlayIcon, LockKeyhole } from "lucide-react";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneCourseByUser, getOneData } from "../redux/slice/courseSlice";
import MuxPlayer from "@mux/mux-player-react";
import { isEmpty } from "@firebase/util";
import LoadingScreen from "./LoadingScreen";
import "video-react/dist/video-react.css";
import { Tooltip } from "react-tooltip";
import ReactPlayer from "react-player";

const BuyCourse = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const oneData = useSelector((state) => state?.courses?.oneData);
  const oneCourseByUser = useSelector(
    (state) => state?.courses?.oneCourseByUser
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showFullText, setShowFullText] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(null);
  const [currentVideoDescription, setCurrentVideoDescription] = useState(null);
  const [currentVideoResource, setCurrentVideoResource] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(9 / 16);

  const handleButtonClick = (
    index,
    videoUrl,
    videoDescription,
    videoResource
  ) => {
    setCurrentVideoUrl(videoUrl);
    setCurrentVideoDescription(videoDescription);
    setCurrentVideoResource(videoResource);
    setActiveIndex(index);
  };

  const toggleShowText = () => {
    setShowFullText(!showFullText);
  };

  const initData = async () => {
    setLoading(true);
    let response = {};
    try {
      response = await dispatch(getOneCourseByUser(id));
    } catch (error) {
      response = error;
    }
    setLoading(false);
    // console.log(response);
    return response;
  };

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    if (
      oneCourseByUser &&
      oneCourseByUser.data &&
      oneCourseByUser.data.owned === 1 &&
      oneCourseByUser.data.videos.length > 0
    ) {
      setCurrentVideoUrl(oneCourseByUser.data.videos[0].video_url);
      setCurrentVideoDescription(oneData?.data?.videos[0].video_description);
      setCurrentVideoResource(oneData?.data?.videos[0].video_resource);
      setActiveIndex(0);
    } else if (oneData && oneData.data && oneData.data.videos.length > 0) {
      setCurrentVideoUrl(oneData.data.videos[0].video_url);
      setCurrentVideoDescription(oneData?.data?.videos[0].video_description);
      setCurrentVideoResource(oneData?.data?.videos[0].video_resource);
      setActiveIndex(0);
    }
  }, [oneCourseByUser, oneData]);

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : isEmpty(oneCourseByUser?.data?.videos) ? (
        <LoadingScreen />
      ) : (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-5">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className=" hidden md:block rounded-full bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-3"
          >
            Back
          </button>

          <div className="flex">
            <div className="w-1/3 hidden md:block">
              <div className=" p-4">
                <h1 className="text-xl font-bold">
                  {oneCourseByUser?.data?.courseTitle}
                </h1>
                <div>
                  <p
                    key={oneCourseByUser?.data?.courseDescription}
                    className={`mt-1 ${
                      showFullText ? "line-clamp-none" : "line-clamp-4"
                    } text-sm leading-6`}
                  >
                    {oneCourseByUser?.data?.courseDescription}
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
                {oneCourseByUser?.data?.owned === 1 ? (
                  <div className="overflow-y-auto max-h-80">
                    {oneCourseByUser?.data?.videos.map((video, index) => (
                      <div className="flex flex-row mt-2" key={index}>
                        <button
                          type="button"
                          className={`w-screen text-start rounded-md px-3 py-2 text-sm font-semibold bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors duration-300 ${
                            activeIndex === index
                              ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-gray-300"
                              : "hover:bg-gray-50"
                          }`}
                          onClick={() =>
                            handleButtonClick(
                              index,
                              video.video_url,
                              video.video_description,
                              video.video_resource
                            )
                          }
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
                ) : (
                  <div className="overflow-y-auto max-h-80">
                    {oneCourseByUser?.data?.videos.map((video, index) => (
                      <div className="flex flex-row mt-2" key={index}>
                        <button
                          type="button"
                          className={`w-screen text-start rounded-md px-3 py-2 text-sm font-semibold ${
                            index === 0
                              ? "bg-white text-gray-900"
                              : "bg-gray-100 text-gray-500 pointer-events-none"
                          } shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
                          onClick={() =>
                            handleButtonClick(index, video.video_url)
                          }
                        >
                          <div className="flex flex-row">
                            {index === 0 ? (
                              <PlayCircle size={24} />
                            ) : (
                              <LockKeyhole size={22} />
                            )}
                            <p className="content-center ml-2 mt-px align-middle">
                              {video.video_title}
                            </p>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Second Column */}
            <div className="w-full lg:w-2/3">
              <div className="p-4">
                <div className="md:hidden pb-5">
                  <h1 className="text-xl font-bold text-center">
                    {oneCourseByUser?.data?.courseTitle}
                  </h1>
                  <div>
                    <p
                      key={oneCourseByUser?.data?.courseDescription}
                      className={`mt-1 ${
                        showFullText ? "line-clamp-none" : "line-clamp-2"
                      } text-sm leading-6`}
                    >
                      {oneCourseByUser?.data?.courseDescription}
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
                </div>
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

                <div className="md:hidden mt-3 ">
                  {oneCourseByUser?.data?.owned === 1 ? (
                    <div className="overflow-y-auto max-h-60">
                      {oneCourseByUser?.data?.videos.map((video, index) => (
                        <div className="flex flex-row mt-2" key={index}>
                          <button
                            type="button"
                            className={`w-screen text-start rounded-md px-3 py-2 text-sm font-semibold bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors duration-300 ${
                              activeIndex === index
                                ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-gray-300"
                                : "hover:bg-gray-50"
                            }`}
                            onClick={() =>
                              handleButtonClick(index, video.video_url)
                            }
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
                  ) : (
                    <div className="overflow-y-auto max-h-60">
                      {oneCourseByUser?.data?.videos.map((video, index) => (
                        <div className="flex flex-row mt-2" key={index}>
                          <button
                            type="button"
                            className={`w-screen text-start rounded-md px-3 py-2 text-sm font-semibold ${
                              index === 0
                                ? "bg-white text-gray-900"
                                : "bg-gray-100 text-gray-500 pointer-events-none"
                            } shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
                            onClick={() =>
                              handleButtonClick(
                                index,
                                video.video_url,
                                video.video_description,
                                video.video_resource
                              )
                            }
                          >
                            <div className="flex flex-row">
                              {index === 0 ? (
                                <PlayCircle size={24} />
                              ) : (
                                <LockKeyhole size={22} />
                              )}
                              <p className="content-center ml-2 mt-px align-middle">
                                {video.video_title}
                              </p>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {oneCourseByUser?.data?.owned === 1 ? (
                  // <div class="mt-6 border bg-slate-100 rounded-md p-4">
                  //   <div class="font-medium text-sm flex items-center justify-between">
                  //     Resource and Attatchments
                  //   </div>
                  //   <a
                  //     href={oneCourseByUser?.data?.courseResource}
                  //     className="mt-3 text-sm italic text-blue-800 hover:underline"
                  //     target="_blank"
                  //     rel="noopener noreferrer"
                  //   >
                  //     {oneCourseByUser?.data?.courseResource}
                  //   </a>
                  // </div>
                  <div>
                    {currentVideoDescription === "" ? (
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
                          {oneCourseByUser?.data?.courseResource}
                        </a>
                      </div>
                    ) : (
                      <div>
                        <div class="mt-6 border bg-slate-100 rounded-md p-4">
                          <div class="font-medium text-sm flex items-center justify-between">
                            Description
                          </div>
                          <div class=" text-sm flex items-center justify-between text-justify">
                            {currentVideoDescription}
                          </div>
                        </div>
                        <div className="mt-2 border bg-slate-100 rounded-md p-4">
                          <div class="font-medium mt-1 text-sm flex items-center justify-between">
                            Resource
                          </div>
                          <a
                            href={oneData?.data?.courseResource}
                            className="mt-3 text-sm italic text-blue-800 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {currentVideoResource}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <Link
                      className="flex justify-end"
                      to={{
                        pathname: `../browse/buy-course/pricing/${oneCourseByUser?.data?.id}`,
                      }}
                    >
                      <button
                        type="button"
                        className="rounded-full mt-5 bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {/* {loading ? "Loading..." : "Log in"} */}
                        {/* Enroll for {oneCourseByUser?.data?.coursePrice} */}
                        {loading
                          ? "Loading ..."
                          : `Enroll for ${oneCourseByUser?.data?.coursePrice}$`}
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyCourse;
