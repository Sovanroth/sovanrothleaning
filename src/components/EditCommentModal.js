import { Fragment, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import {
  editComment,
  getOneData,
  postComment,
} from "../redux/slice/courseSlice";

export default function EditCommentModal({ onClose, comment, id, courseId }) {
  const cancelButtonRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    commentData: comment || "",
  });

  console.log(courseId);

  const handleChnageCommentText = (e) => {
    const newVal = { ...data, commentData: e.target.value };
    setData(newVal);
  };

  const createComment = async () => {
    setLoading(true);

    try {
      const params = {
        commentData: data?.commentData,
      };

      const response = await dispatch(editComment(id, params));

      onClose();
      return response;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      await dispatch(getOneData(courseId));
      setLoading(false);
    }
  };

  const handleClickSubmit = async (event) => {
    event.preventDefault();
    createComment();
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
                        Edit Comment
                      </Dialog.Title>
                      <div className="mt-5">
                        <p className="text-sm text-gray-500">
                          <div className="relative">
                            <label
                              htmlFor="videoTitle"
                              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                            ></label>
                            <textarea
                              type="text"
                              value={data?.commentData}
                              onChange={(e) => handleChnageCommentText(e)}
                              required
                              className=" h-32 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="Add your comment..."
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
                      {loading ? "Loading ..." : "Update"}
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
