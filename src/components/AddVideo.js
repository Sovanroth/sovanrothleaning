import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteVideo, getOneData, postVideo } from "../redux/slice/courseSlice";
import DeleteVideoModal from "./DeleteVideoModal";
import LoadingScreen from "./LoadingScreen";
import { isEmpty } from "@firebase/util";

const AddVideo = () => {
  const [loading, setLoading] = useState(false);
  const oneData = useSelector((state) => state?.courses?.oneData);
  // const { id } = useParams();
  const dispatch = useDispatch();
  const id = 26;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoName, setVideoName] = useState("");
  const [videoId, setVideoId] = useState("");

  const openMoal = (name, id) => {
    setVideoId(id);
    setVideoName(name);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getData = async () => {
    setLoading(true);

    try {
      const respone = await dispatch(getOneData(id));
      // console.log(respone);
      return respone;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const postCourseVideo = async () => {
    setLoading(true);

    try {
      const param = {
        video_title: "1",
        video_url: "1",
      };

      await dispatch(postVideo(id, param));
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  // const deleteVideoData = async (videoID) => {
  //   setLoading(false);

  //   try {
  //     await deleteVideo(videoID);
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : isEmpty(oneData) ? (
        <LoadingScreen />
      ) : (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[720px]">
          <div className="bg-white px-5 py-4 shadow sm:rounded-lg sm:px-12">
            <div className="text-center text-md font-bold">
              Add video for course Test
            </div>

            <div className="overflow-y-auto max-h-80">
              {oneData?.data?.videos?.map((video) => (
                <div className="flex justify-between items-center text-sm mt-2">
                  <div className="truncate">{video?.video_title}</div>
                  <button
                    className="mr-3 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                    onClick={() => openMoal(video?.video_title, video?.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            {isModalOpen && (
              <DeleteVideoModal
                onClose={closeModal}
                videoName={videoName}
                videoId={videoId}
              />
            )}

            <div className="flex mt-5">
              <button
                type="button"
                className="mr-2 w-1/2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Not Now
              </button>
              <button
                type="button"
                className="ml-2 w-1/2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddVideo;
