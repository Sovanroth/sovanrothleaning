import React, { useState } from "react";

export default function Banner() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 px-6 pb-6 z-20">
          {" "}
          {/* Added z-20 class here */}
          <div className="pointer-events-auto ml-auto max-w-xl rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-900/10">
            <p className="text-sm leading-6 text-gray-900 text-justify">
              All of the data on this website is just for testing! If you are
              required to delete your video, you can contact my email{" "}
              <a
                href="mailto:sovanroth016@gmail.com"
                className="font-semibold text-indigo-600"
              >
                here
              </a>
              !
            </p>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
