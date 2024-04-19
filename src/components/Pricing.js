import { useSelector } from "react-redux";
import { CheckIcon } from "@heroicons/react/20/solid";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  buyCourse,
  getCourseByUserID,
  getOneCourseByUser,
  getOneData,
} from "../redux/slice/courseSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Pricing() {
  const oneData = useSelector((state) => state?.courses?.oneData);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const initData = async () => {
    setLoading(true);
    let response = {};
    try {
      response = await dispatch(getOneData(id));
    } catch (error) {
      response = error;
    }
    setLoading(false);
    console.log(response);
    return response;
  };

  const handleBuyCourse = async () => {
    setLoading(true);

    try {
      await dispatch(buyCourse(oneData?.data?.id));
      await dispatch(getCourseByUserID());
      navigate("/");
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      await dispatch(getCourseByUserID());
      setLoading(false);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"></h2>
            <p className="mt-6 text-lg leading-8 text-gray-600"></p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                {oneData?.data?.courseTitle}
              </h3>
              <p className="mt-6 text-base leading-7 text-gray-600">
                {oneData?.data?.courseDescription}
              </p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                  Objective of this Course
                </h4>
                <div className="h-px flex-auto bg-gray-100" />
              </div>
              <ul
                role="list"
                className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
              >
                {oneData?.data?.videos.slice(0, 4).map((feature) => (
                  <li key={feature.id} className="flex gap-x-3">
                    <CheckIcon
                      className="h-6 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    {feature.video_title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-gray-600">
                    Pay once, own it forever
                  </p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">
                      {oneData?.data?.coursePrice}
                    </span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                      USD
                    </span>
                  </p>
                  <button
                    onClick={handleBuyCourse}
                    className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {/* {loading ? "Loading ..." : `Enroll for ${oneCourseByUser?.data?.coursePrice}`} */}
                    {/* Get access */}
                    {loading ? "Loading ..." : "Get access"}
                  </button>
                  <p className="mt-6 text-xs leading-5 text-gray-600">
                    Invoices and receipts available for easy company
                    reimbursement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
