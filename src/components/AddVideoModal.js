import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { changePasswordRequest, updateUser } from "../redux/slice/loginSlice";
import { errorPrefix } from "@firebase/util";
import { getOneData, postVideo } from "../redux/slice/courseSlice";

export default function AddVideoModal({ onClose }) {
  const cancelButtonRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    videoTitle: "",
    videoUrl: "",
    videoDescription: "",
    videoResource: "",
  });
  const { id } = useParams();

  const handleChangeVideoTitle = (e) => {
    const newVal = { ...data, videoTitle: e.target.value };
    setData(newVal);
  };

  const handleChangeVideoUrl = (e) => {
    const newVal = { ...data, videoUrl: e.target.value };
    setData(newVal);
  };

  const handleChangeVideoDescription = (e) => {
    const newVal = { ...data, videoDescription: e.target.value };
    setData(newVal);
  };

  const hanldeChnageVideoResource = (e) => {
    const newVal = { ...data, videoResource: e.target.value };
    setData(newVal);
  };

  const createVideo = async () => {
    setLoading(true);

    try {
      const params = {
        video_title: data?.videoTitle,
        video_url: data?.videoUrl,
        video_description: data?.videoDescription,
        video_resource: data?.videoResource,
      };

      const respone = await dispatch(postVideo(id, params));

      console.log(respone);
      onClose();
      return respone;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      await dispatch(getOneData(id));
      setLoading(false);
    }
  };

  const handleClickSubmit = async (event) => {
    event.preventDefault();
    createVideo();
  };

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity  backdrop-filter backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <form onSubmit={handleClickSubmit}>
                  <div>
                    <div className="text-center">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Add video information
                      </Dialog.Title>
                      <div className="mt-5">
                        <p className="text-sm text-gray-500">
                          <div className="relative">
                            <label
                              htmlFor="videoTitle"
                              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                            >
                              Video Title
                            </label>
                            <input
                              type="text"
                              name="videoTitle"
                              value={data?.videoTitle}
                              onChange={(e) => handleChangeVideoTitle(e)}
                              id="videoTitle"
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="Nest js #1"
                            />
                          </div>
                          <div className="relative mt-5">
                            <label
                              htmlFor="newPassword"
                              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                            >
                              Video Url
                            </label>
                            <input
                              type="url"
                              name="videoUrl"
                              required
                              value={data?.videoUrl}
                              onChange={(e) => handleChangeVideoUrl(e)}
                              id="videoUrl"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="youtube.com"
                            />
                          </div>

                          <div className="relative mt-5">
                            <label
                              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                            >
                              Video Description
                            </label>
                            <input
                              type="text"
                              name="videoDescription"
                              required
                              value={data?.videoDescription}
                              onChange={(e) => handleChangeVideoDescription(e)}
                              id="videoUrl"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
                            />
                          </div>


                          <div className="relative mt-5">
                            <label
                              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                            >
                              Video Resource
                            </label>
                            <input
                              type="url"
                              name="videoResource"
                              required
                              value={data?.videoResource}
                              onChange={(e) => hanldeChnageVideoResource(e)}
                              id="videoUrl"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="youtube.com"
                            />
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-5 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    >
                      {loading ? "Loading ..." : "Add"}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      onClick={() => onClose()}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
