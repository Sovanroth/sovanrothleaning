import { Fragment, useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { XCircle } from "lucide-react";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function Notification({ headerMessage, infoMessage }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end justify-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-end space-y-4 sm:items-end">
          <Transition
            show={show}
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="translate-x-full opacity-0 sm:translate-x-2"
            enterTo="translate-x-0 opacity-100 sm:translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0 opacity-100 sm:translate-x-0"
            leaveTo="translate-x-full opacity-0 sm:translate-x-2"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <XCircle
                      className="h-6 w-6 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">
                      {headerMessage}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{infoMessage}!</p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
