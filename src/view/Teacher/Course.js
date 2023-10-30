import React from "react";
import { Link } from "react-router-dom";
import TeacherNavBar from "../../components/TeacherNavBar";
import Footer from "../../components/Footer";

const data = [
  {
    title: "NodeJS",
    price: "10",
    status: "publish",
  },
  {
    title: "Advence NodeJS",
    price: "100",
    status: "unpublish",
  },
  {
    title: "NodeJS",
    price: "10",
    status: "publish",
  },
  {
    title: "Advence NodeJS",
    price: "100",
    status: "unpublish",
  },
  {
    title: "NodeJS",
    price: "10",
    status: "publish",
  },
  {
    title: "Advence NodeJS",
    price: "100",
    status: "unpublish",
  },
  {
    title: "NodeJS",
    price: "10",
    status: "publish",
  },
  {
    title: "Advence NodeJS",
    price: "100",
    status: "unpublish",
  },
  {
    title: "NodeJS",
    price: "10",
    status: "publish",
  },
  {
    title: "Advence NodeJS",
    price: "100",
    status: "unpublish",
  },
];
const stats = [
  {
    name: "All Revenue",
    value: "$405,091.00",
  },
  {
    name: "All Sale",
    value: "100",
  },
  {
    name: "This Month Revenue",
    value: "$213434",
  },
  {
    name: "This Month Sale",
    value: "40",
  },
];

const Courses = () => {
  return (
    <div className="mx-auto min-h-screen ">
      <TeacherNavBar />
      <div className="App max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 mx-auto">
              <div className="flex justify-between items-center mb-4">
                <div></div>
                <Link to="/teacher-mode/create">
                  <button
                    to="/teachermode-courses/create"
                    className="block rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add courses
                  </button>
                </Link>
              </div>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {data.map((person) => (
                      <tr key={person.title}>
                        <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900">
                          {person.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.price}$
                        </td>
                        <td
                          className={`whitespace-nowrap px-3 py-4 text-sm font-bold ${
                            person.status === "publish"
                              ? "text-green"
                              : "text-red"
                          }`}
                        >
                          {person.status === "publish"
                            ? "Publish"
                            : "Unpublish"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Courses;
