import { Fragment, useState } from "react";
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import NavBar from "./NavBar";
import { FaTrash } from "react-icons/fa";
import {TbCategoryFilled} from "react-icons/tb"


export default function EditCourse() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 max-w-7xl mx-auto p-4">
        <div className="p-4">
          <div className=" text-start">
            <p className=" text-xl font-bold">Course Setup</p>
            <p className=" text-xs mt-2">Complete all fields "(6/6)"</p>
          </div>
          <div className="mt-10">
            df
          </div>
        </div>
        <div className=" p-4">
          <div className="flex justify-end">
            <div className="grid grid-cols-2 max-w-fit">
              <button
                type="button"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Unpublish
              </button>
              <button className="ml-2 max-w-fit">
                <FaTrash size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
