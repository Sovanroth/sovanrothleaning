import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { changePasswordRequest, updateUser } from "../redux/slice/loginSlice";
import { errorPrefix } from "@firebase/util";

export default function ChangePasswordModal({ onClose }) {
  const cancelButtonRef = useRef(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChangeCurrentPassword = (e) => {
    const newVal = { ...data, currentPassword: e.target.value };
    setData(newVal);
  };

  const handleChangeNewPassword = (e) => {
    const newVal = { ...data, newPassword: e.target.value };
    setData(newVal);
  };

  const changePasswordFeature = async () => {
    setLoading(true);

    try {
      const param = {
        oldPassword: data?.currentPassword,
        newPassword: data?.newPassword,
      };

      const response = await dispatch(changePasswordRequest(param));
      //   console.log(response?.data?.data?.error);
      //   console.log(response?.data?.data?.message);
      if (response?.data?.data?.error === true) {
        setError(response?.data?.data?.message);
      } else {
        onClose();
      }
      return response;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const handleClickSend = async (event) => {
    event.preventDefault();
    changePasswordFeature();
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
                <form onSubmit={handleClickSend}>
                  <div>
                    <div className="text-center">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Change Password
                      </Dialog.Title>
                      <div className="mt-5">
                        <p className="text-sm text-gray-500">
                          <div className="relative">
                            <label
                              htmlFor="currentPassword"
                              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                            >
                              Current password
                            </label>
                            <input
                              type="password"
                              name="currentPassword"
                              minlength="8"
                              value={data?.currentPassword}
                              onChange={(e) => handleChangeCurrentPassword(e)}
                              id="currentPassword"
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="Please enter your old password"
                            />
                          </div>
                          <div className="relative mt-5">
                            <label
                              htmlFor="newPassword"
                              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                            >
                              New Password
                            </label>
                            <input
                              type="password"
                              name="newPassword"
                              minlength="8"
                              required
                              value={data?.newPassword}
                              onChange={(e) => handleChangeNewPassword(e)}
                              id="newPassword"
                              title="Password must be at least 8 characters long"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="Please enter your new password"
                            />
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                  {error && (
                    <div className="text-red-500 text-sm mt-2">{error}</div>
                  )}
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
