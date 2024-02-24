import { Play, PlayCircle, PlayIcon, LockKeyhole } from "lucide-react";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneData } from "../redux/slice/courseSlice";
import MuxPlayer from "@mux/mux-player-react";
import FAQ from "./FAQ";
import { isEmpty } from "@firebase/util";
import LoadingScreen from "./LoadingScreen";
import { Media, Video } from "@vidstack/player-react";
import { Player, ControlBar } from "video-react";
import "video-react/dist/video-react.css";
import ReactPlayer from "react-player";
import { Tooltip } from "react-tooltip";

const BuyCourse = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const oneData = useSelector((state) => state?.courses?.oneData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [videoData, setVideoData] = useState([])

  const initData = async () => {
    setLoading(true);
    let response = {};
    try {
      // Await the dispatch call to resolve
      response = await dispatch(getOneData(id));
    } catch (error) {
      response = error;
    }
    setLoading(false);
    console.log(response);
    return response;
  };

  useEffect(() => {
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
      ) : isEmpty(oneData?.data?.videos) ? (
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
                  {oneData?.data?.courseTitle}
                </h1>
                <p className=" text-sm mt-2">
                  {oneData?.data?.courseDescription}
                </p>
                {/* ))} */}

                <div class="border-t border-gray-500 my-4"></div>
                {/* {JSON.stringify(oneData)} */}
                {/* {oneData?.data?.videos.map((video) => (
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
                ))} */}
                {oneData?.data?.videos.map((video, index) => (
                  <div className="flex flex-row mt-2" key={index}>
                    <button
                      type="button"
                      className={`w-screen text-start rounded-md px-3 py-2 text-sm font-semibold ${
                        index === 0
                          ? "bg-white text-gray-900"
                          : "bg-gray-100 text-gray-500 pointer-events-none"
                      } shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
                      onClick={() => {
                        if (index === 0) {
                          // Handle click action for the first video
                        }
                      }}
                      data-tip={
                        index !== 0
                          ? "Please purchase the course to unlock the video"
                          : ""
                      }
                      data-for={`tooltip-${index}`} // Unique data-for attribute for each tooltip
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
                    {index !== 0 && (
                      <Tooltip
                        id={`tooltip-${index}`}
                        effect="solid"
                        place="top"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Second Column */}
            <div className="w-2/3">
              {/* Your content for the second column goes here */}
              <div className="p-4">
                {/* <MuxPlayer
                  streamType="on-demand"
                  playbackId="W87dTsEW82XvURKSCoopHQGxdwHTya1wrAVBLwN2vug"
                  metadataVideoTitle="Placeholder (optional)"
                  metadataViewerUserId="Placeholder (optional)"
                  primaryColor="#FFFFFF"
                  secondaryColor="#000000"
                /> */}
                <Media>
                  <Video
                    loading="visible"
                    poster="https://media-files.vidstack.io/poster.png"
                    controls
                    preload="true"
                  >
                    <video
                      loading="visible"
                      poster="https://media-files.vidstack.io/poster-seo.png"
                      src="https://media-files.vidstack.io/720p.mp4"
                      preload="none"
                      data-video="0"
                      controls
                    />
                  </Video>
                </Media>

                <Link
                  className="flex justify-end"
                  to={{
                    pathname: "../browse/buy-course/pricing",
                  }}
                >
                  <button
                    type="button"
                    className="rounded-full mt-5 bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Buy Course
                  </button>
                </Link>
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
