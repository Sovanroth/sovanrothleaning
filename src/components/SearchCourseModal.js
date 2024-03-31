import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchCourse } from "../redux/slice/courseSlice";
import { Link } from "react-router-dom";

export default function SearchCourseModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const searchCourse = useSelector((state) => state?.courses?.searchCourse);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const initSearchData = async (param) => {
    setLoading(true);

    try {
      const response = await dispatch(getSearchCourse(param));
      return response;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchQuery(inputValue);
    initSearchData(inputValue);
  };

  const handleInputFocus = () => {
    setIsSearchClicked(true);
  };

  const handleInputBlur = () => {
    setIsSearchClicked(false);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-y-auto z-50"
        onClose={onClose}
      >
        <div className="flex min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 backdrop-filter backdrop-blur-sm bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="w-full max-w-sm mx-auto mt-20">
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white backdrop-blur-md text-left shadow-xl transition-all">
                <div>
                  <div>
                    <Dialog.Title className="flex items-center">
                      <input
                        type="text"
                        className="flex-grow rounded-md border-0 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-0"
                        placeholder="Find anything..."
                        value={searchQuery}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                      />
                    </Dialog.Title>
                    {searchQuery && (
                      <div>
                        <ul className="divide-y divide-gray-200">
                          {searchCourse?.data?.length > 0 &&
                            searchCourse?.data.map((item) => (
                              <Link
                                to={`/search-course/${item?.id}`}
                                className="py-2 px-4 cursor-pointer hover:bg-gray-100 flex"
                              >
                                <ul className="flex items-center">
                                  <li className="flex items-center">
                                    <img
                                      src={item.courseImage}
                                      alt={item.courseTitle}
                                      className="h-8 w-auto mr-2"
                                    />
                                    <div className="text-sm">
                                      {item.courseTitle}
                                    </div>
                                  </li>
                                </ul>
                              </Link>
                            ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
