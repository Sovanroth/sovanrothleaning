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

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];
const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Test() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <NavBar />
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
