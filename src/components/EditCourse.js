import { Fragment, useState } from "react";
import { FaTrash, FaThList, FaEdit } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import Footer from "./Footer";
import {
  ChevronLeft,
  CircleDollarSign,
  Edit2,
  Eye,
  File,
  PlusCircle,
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const finalSpaceCharacters = [
  {
    id: "gary",
    name: "Gary Goodspeed",
    thumb: "/images/gary.png",
  },
  {
    id: "cato",
    name: "Little Cato",
    thumb: "/images/cato.png",
  },
  {
    id: "kvn",
    name: "KVN",
    thumb: "/images/kvn.png",
  },
  {
    id: "mooncake",
    name: "Mooncake",
    thumb: "/images/mooncake.png",
  },
  {
    id: "quinn",
    name: "Quinn Ergon",
    thumb: "/images/quinn.png",
  },
];

export default function EditCourse() {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 max-w-7xl mx-auto pt-4">
        <div className="pl-8">
          <div className=" text-start">
            <div className=" flex">
              <button>
                <ChevronLeft size={30} />
              </button>
              <p className=" text-xl font-bold">Course Setup</p>
            </div>
            <p className=" text-xs mt-2">Complete all fields "(6/6)"</p>
          </div>
          <div className="mt-10 flex">
            <TbCategoryFilled color="#CCCCCC" size={35} />
            <div className="pt-1.5">Customize Your Course</div>
          </div>

          {/* Course Title */}
          <div class="mt-6 border bg-slate-100 rounded-md p-4">
            <div class="font-medium text-sm flex items-center justify-between">
              Course Title
              <button className=" flex">
                <Edit2 size={14} className=" mt-0.5" />
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
                <Edit2 size={14} className=" mt-0.5" />
                <p className="ml-1 text-sm">Edit Description</p>
              </button>
            </div>
            <p className=" text-sm pt-5">Course Description Node JS</p>
          </div>

          {/* Course Category */}
          <div class="mt-6 border bg-slate-100 rounded-md p-4">
            <div class="font-medium text-sm flex items-center justify-between">
              Course Description
            </div>
            <div className=" mt-5">
              <select
                id="location"
                name="location"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue="Canada"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>

          {/* Course Image */}
          <div class="mt-6 border bg-slate-100 rounded-md p-4">
            <div class="font-medium text-sm flex items-center justify-between">
              Course Image
              <button className=" flex">
                <Edit2 size={14} className=" mt-0.5" />
                <p className="ml-1 text-sm">Edit Image</p>
              </button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=3570&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="p-2 mt-2 rounded-3xl"
            />
          </div>

          {/* Course Setting  */}
          <div className="mt-10 flex">
            <Eye color="#CCCCCC" className=" rounded-2xl " size={35} />
            <div className="mt-1.5 ml-1 ">Customize Your Course</div>
          </div>

          {/* Access Setting */}
          <div class="mt-6 border bg-slate-100 rounded-md p-4">
            <div class="font-medium text-sm flex items-center justify-between">
              Access Setting
              <button className=" flex">
                <Edit2 size={14} className=" mt-0.5" />
                <p className="ml-1 text-sm">Edit Access Setting</p>
              </button>
            </div>
            <p className=" text-sm pt-5">This Chapter is free for preview.</p>
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
            <FaThList color="#CCCCCC" size={30} />
            <div className="pt-1 pl-1.5">Course Chapters</div>
          </div>

          <div class="mt-6 border bg-slate-100 rounded-md p-4">
            <div class="font-medium text-sm flex items-center justify-between">
              Course Chapters
              <button className=" flex">
                <PlusCircle size={14} className=" mt-0.5" />
                <p className="ml-1 text-sm">Add Chapter</p>
              </button>
            </div>

            <p className=" text-sm pt-5">
              Drap and Drop to reorder the chapters
            </p>
          </div>

          {/* Course Setting  */}
          <div className="mt-10 flex">
            <CircleDollarSign color="#CCCCCC" size={35} />
            <div className="mt-1.5 ml-1 ">Customize Your Course</div>
          </div>

          {/* Course Price */}
          <div class="mt-6 border bg-slate-100 rounded-md p-4">
            <div class="font-medium text-sm flex items-center justify-between">
              Course Price Setting
              <button className=" flex">
                <Edit2 size={14} className=" mt-0.5" />
                <p className="ml-1 text-sm">Edit Price</p>
              </button>
            </div>
            <p className=" text-sm pt-5">10$</p>
          </div>

          {/* Resource and Attatch */}
          <div className="mt-10 flex">
            {/* <AiFillFile size={35} /> */}
            <File color="#CCCCCC" size={35} />
            <div className="mt-1.5 "> Resource and Attatchments Setting</div>
          </div>

          {/* Resource */}
          <div class="mt-6 border bg-slate-100 rounded-md p-4">
            <div class="font-medium text-sm flex items-center justify-between">
              Resource and Attatchments
              <button className=" flex">
                <PlusCircle size={14} className=" mt-0.5" />
                <p className="ml-1 text-sm">Add Resource</p>
              </button>
            </div>
            <p className=" text-sm pt-5 italic">No Attatchments</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
