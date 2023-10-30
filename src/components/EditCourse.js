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
import { FaTrash, FaThList, FaEdit } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { MdOutlineModeEdit } from "react-icons/md";

export default function EditCourse() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 max-w-7xl mx-auto pt-4">
        <div className="pl-8">
          <div className=" text-start">
            <p className=" text-xl font-bold">Course Setup</p>
            <p className=" text-xs mt-2">Complete all fields "(6/6)"</p>
          </div>
          <div className="mt-10 flex">
            <TbCategoryFilled size={35} color="#2b638e" />
            <div className="pt-1.5">Customize Your Course</div>
          </div>

          {/* Course Title */}
          <div class="mt-6 border bg-slate-100 rounded-md p-4">
            <div class="font-medium text-sm flex items-center justify-between">
              Course Title
              <button className=" flex">
                <MdOutlineModeEdit size={14} className=" mt-0.5" />
                <p className="ml-1 text-sm">Edit Title</p>
              </button>
            </div>
            <p className=" text-sm pt-5">Node JS Teaching</p>
          </div>

          {/* Course Description */}
          <div class="mt-6 border bg-slate-100 rounded-md p-4">
            <div class="font-medium text-sm flex items-center justify-between">
              Course Description
              <button className=" flex">
                <MdOutlineModeEdit size={14} className=" mt-0.5" />
                <p className="ml-1 text-sm">Edit Description</p>
              </button>
            </div>
            <p className=" text-sm pt-5">Course Description Node JS</p>
          </div>

          {/* Course Image */}
          <div class="mt-6 border bg-slate-100 rounded-md p-4">
            <div class="font-medium text-sm flex items-center justify-between">
              Course Image
              <button className=" flex">
                <MdOutlineModeEdit size={14} className=" mt-0.5" />
                <p className="ml-1 text-sm">Edit Image</p>
              </button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=3570&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="p-2 mt-2 rounded-3xl"
            />
          </div>
        </div>
        <div className=" pt-4">
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
          <div className=" mt-12 flex">
            <FaThList size={30} color="#2b638e" />
            <div className="pt-1 pl-1">Customize Your Course</div>
          </div>
        </div>
      </div>
    </>
  );
}
