import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import AddCommentModal from "./AddCommentModal";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import EditCommentModal from "./EditCommentModal";
import DeleteCommentModal from "./DeleteCommentModal";
import {
  createReply,
  getOneCourseByUser,
  getOneData,
} from "../redux/slice/courseSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Comment = ({ data }) => {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [commentData, setComment] = useState("");
  const [commentId, setCommentId] = useState("");
  const [deleteCommentId, setDeleteCommentId] = useState("");
  const userId = localStorage.getItem("userId");
  const [replyingCommentId, setReplyingCommentId] = useState(null);
  const [reply, setReply] = useState({
    replyData: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChangeReply = (e) => {
    const newVal = { ...reply, replyData: e.target.value };
    setReply(newVal);
  };

  const toggleReply = (commentID) => {
    setCommentId(commentID);
    setReplyingCommentId(commentID === replyingCommentId ? null : commentID);
  };

  const addModalOpen = () => {
    setAddModal(true);
  };

  const closeAddModal = () => {
    setAddModal(false);
  };
  const editModalOpen = (comment, id) => {
    setEditModal(true);
    setComment(comment);
    setCommentId(id);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  const deleteModalOpen = (id) => {
    setDeleteCommentId(id);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const createReplyFunction = () => {
    setLoading(true);

    try {
      const param = {
        replyData: reply?.replyData,
      };

      console.log(param);
      console.log(commentId);

      const response = dispatch(createReply(commentId, param));
      return response;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      if (data?.data?.owned == 1) {
        dispatch(getOneCourseByUser(data?.data?.id));
      } else {
        dispatch(getOneData(data?.data?.id));
      }
      toggleReply(null);
      setLoading(false);
    }
  };

  return (
    <div className="antialiased mx-auto max-w-7xl px-6 lg:px-4 mt-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Comments</h3>
        <button
          type="button"
          onClick={() => addModalOpen()}
          className="rounded-full bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Comment
        </button>
        {addModal && <AddCommentModal onClose={closeAddModal} oneData={data} />}
      </div>

      {data?.data?.comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10 mb-10">
          <img
            height="100"
            width="200"
            src="https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696470.jpg?t=st=1714377477~exp=1714381077~hmac=58dc5abbf17200f20afbeb6463939ea45d4c7defde225a4a67d16e66b85c4d6a&w=1800"
          />
          <div className=" text-md font-bold">No Comment Yet!</div>
          <div className=" text-sm mt-2">
            Say something to start the conversation
          </div>
        </div>
      ) : (
        <div className="mt-3 overflow-y-auto max-h-[600px] py-3">
          {data?.data?.comments.map((comment) => (
            <div className="space-y-4 mt-3">
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  {comment?.user?.profile?.profileImage == null ? (
                    <div className=" text-xl">
                      <img
                        className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                        src={comment?.user?.profile?.profileImage}
                        alt={comment?.user?.profile?.profileImage}
                      />
                    </div>
                  )}
                </div>
                <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                  <div className="flex justify-between items-center">
                    <div>
                      <strong>{comment?.user?.username}</strong>{" "}
                      <span className="text-xs text-gray-500">
                        <Moment fromNow>{comment?.createdAt}</Moment>
                      </span>
                      {comment?.user?.role === 1 ? (
                        <span className="inline-flex ml-1 items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                          Admin
                        </span>
                      ) : (
                        <div></div>
                      )}
                    </div>
                    {comment?.user?.id === userId ? (
                      <></>
                    ) : (
                      <div className=" hidden">test</div>
                    )}
                  </div>
                  <p className="text-sm mt-2 text-justify">
                    {comment?.commentData}
                  </p>
                  <div className="flex items-center">
                    <button
                      className="my-2 mr-2 text-gray-500 font-bold text-xs"
                      onClick={() => toggleReply(comment.id)}
                    >
                      Reply
                    </button>
                    {replyingCommentId === comment.id && (
                      <div className="relative mt-2 flex items-center text-sm w-full">
                        <input
                          type="text"
                          onChange={(e) => handleChangeReply(e)}
                          className="block border-0 py-1.5 w-full pr-10 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Enter your reply..."
                        />
                        <div
                          className="absolute inset-x-0 bottom-0 border-t border-gray-300"
                          aria-hidden="true"
                        />
                        <button
                          className="absolute right-2"
                          onClick={() => createReplyFunction()}
                        >
                          <PaperAirplaneIcon className="h-6 w-6 text-gray-500" />
                        </button>
                      </div>
                    )}
                  </div>

                  {comment?.replies.map((reply) => (
                    <div className="space-y-4 mt-3">
                      <div className="flex">
                        <div className="flex-shrink-0 mr-3">
                          {reply?.user.profile === null ? (
                            <img
                              className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8"
                              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            />
                          ) : (
                            <img
                              src={reply?.user.profile?.profileImage}
                              className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8"
                            />
                          )}
                        </div>
                        <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                          <strong>{reply?.user?.username}</strong>{" "}
                          <span className="text-xs text-gray-400">
                            <Moment fromNow>{reply?.createdAt}</Moment>
                          </span>
                          {reply?.user?.role === 1 ? (
                            <span className="inline-flex ml-1 items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                              Admin
                            </span>
                          ) : (
                            <div></div>
                          )}
                          <p className="text-xs sm:text-sm text-justify">
                            {reply?.replyData}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;

// <Menu
//   as="div"
//   className="relative inline-block text-left"
// >
//   <div>
//     {editModal && (
//       <EditCommentModal
//         onClose={closeEditModal}
//         comment={commentData}
//         id={commentId}
//         courseId={data?.data?.id}
//       />
//     )}
//     <Menu.Button className="flex items-center rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
//       <span className="sr-only">Open options</span>
//       <EllipsisVerticalIcon
//         className="h-5 w-5"
//         aria-hidden="true"
//       />
//     </Menu.Button>
//     {deleteModal && (
//       <DeleteCommentModal
//         onClose={closeDeleteModal}
//         commentId={deleteCommentId}
//         courseId={data?.data?.id}
//       />
//     )}
//   </div>

//   <Transition
//     as={Fragment}
//     enter="transition ease-out duration-100"
//     enterFrom="transform opacity-0 scale-95"
//     enterTo="transform opacity-100 scale-100"
//     leave="transition ease-in duration-75"
//     leaveFrom="transform opacity-100 scale-100"
//     leaveTo="transform opacity-0 scale-95"
//   >
//     <Menu.Items className="absolute right-0 z-10 mt-2 w-fit origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//       <div className="py-1">
//         <Menu.Item>
//           {({ active }) => (
//             <button
//               onClick={() =>
//                 editModalOpen(
//                   comment?.commentData,
//                   comment?.id
//                 )
//               }
//               className={classNames(
//                 active
//                   ? "bg-gray-100 text-gray-900"
//                   : "text-gray-700",
//                 "block w-full px-4 py-2 text-left text-sm"
//               )}
//             >
//               Edit
//             </button>
//           )}
//         </Menu.Item>
//         <Menu.Item>
//           {({ active }) => (
//             <button
//               onClick={() => deleteModalOpen(comment?.id)}
//               className={classNames(
//                 active
//                   ? "bg-gray-100 text-gray-900"
//                   : "text-gray-700",
//                 "block w-full px-4 py-2 text-left text-sm"
//               )}
//             >
//               Delete
//             </button>
//           )}
//         </Menu.Item>
//       </div>
//     </Menu.Items>
//   </Transition>
// </Menu>
