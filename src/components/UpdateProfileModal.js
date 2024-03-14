import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { updateUser } from "../redux/slice/loginSlice";

export default function UpdateProfileModal({
  headerMessage,
  infoMessage,
  onClose,
  exampleText,
  type,
}) {
  const cancelButtonRef = useRef(null);
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleChangeData = (e) => {
    setData(e.target.value);
    if (type === "email" && e.target.value) {
      validateEmail(e.target.value);
    }
    if (type === "password" && e.target.value) {
      validatePassword(e.target.value);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError("");
    return true;
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    setError("");
    return true;
  };

  const updateSetting = async (infoMessage) => {
    try {
      let tobeUpdate = {};
      if (infoMessage === "Full Name") {
        const param = {
          username: data,
        };
        tobeUpdate = param;
      } else if (infoMessage === "Email") {
        if (!validateEmail(data)) return;
        const param = {
          email: data,
        };
        tobeUpdate = param;
      } else if (infoMessage === "Password") {
        if (!validatePassword(data)) return;
        const param = {
          password: data,
        };
        tobeUpdate = param;
      }

      // console.log(tobeUpdate);
      const response = await dispatch(updateUser(tobeUpdate));
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // const handleSubmit = (infoMessage) => {
  //   if (!data) {
  //     setError("Please enter a value.");
  //     return;
  //   }
  //   if (type === "email" && !validateEmail(data)) return;
  //   if (type === "password" && !validatePassword(data)) return;
  //   setError("");
  //   updateSetting(infoMessage);
  //   onClose();
  // };

  const handleSubmit = async (infoMessage) => {
    if (!data) {
      setError("Please enter a value.");
      return;
    }
    if (type === "email" && !validateEmail(data)) return;
    if (type === "password" && !validatePassword(data)) return;
    setError("");

    try {
      const response = await updateSetting(infoMessage);
      console.log(response?.data?.error);
      if (response?.data?.error) {
        setError("Email is already in use.");
        return;
      }
      onClose();
    } catch (error) {
      console.error("Error updating setting:", error);
    }
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {headerMessage}
                    </Dialog.Title>
                    <div className="mt-5">
                      <p className="text-sm text-gray-500">
                        <div className="relative">
                          <label
                            htmlFor="name"
                            className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                          >
                            {infoMessage}
                          </label>
                          <input
                            type={type}
                            name={type}
                            onChange={handleChangeData}
                            id="name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder={exampleText}
                          />
                        </div>
                        {error && (
                          <p className="mt-1 text-xs text-red-500">{error}</p>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={() => handleSubmit(infoMessage)}
                  >
                    Update
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
