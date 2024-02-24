import { useSelector } from "react-redux";
import { CheckIcon } from "@heroicons/react/20/solid";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { buyCourse } from "../redux/slice/courseSlice";
import { useNavigate } from "react-router-dom";

const includedFeatures = [
  "ស្វែងយល់ពីអ្វីជា Unix",
  "រុករក និងគ្រប់គ្រងឯកសារ និង Directory ដោយប្រើពាក្យបញ្ជា UNIX",
  "រៀបចំទិន្នន័យដោយប្រើពាក្យបញ្ជា UNIX",
  "បង្កើត និងកែសម្រួលឯកសារអត្ថបទដោយប្រើពាក្យបញ្ជា UNIX",
];

export default function Pricing() {
  const oneData = useSelector((state) => state?.courses?.oneData);
  const [data, SetData] = useState(oneData);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(data?.data?.id);

  const handleBuyCourse = async () => {
    setLoading(true);

    try {
      dispatch(buyCourse(data?.data?.id));
      navigate('/')
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <>
      <NavBar />
      {/* {JSON.stringify(oneData)} */}
      <div className="bg-white py-10 sm:py10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {/* {oneData?.course?.courseTitle} */}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {/* នៅក្នុងវគ្គសិក្សានេះ សិស្សនឹងរៀនពីរបៀបប្រើប្រាស់ពាក្យបញ្ជា UNIX
              ប្រកបដោយប្រសិទ្ធភាពសម្រាប់ការគ្រប់គ្រងឯកសារ រៀបចំទិន្នន័យ បង្កើត
              និងកែសម្រួលឯកសារអត្ថបទ និងអនុវត្តការងាររដ្ឋបាលប្រព័ន្ធ (System
              Administration) ។ */}
              {/* {oneData?.course?.courseDescription} */}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                {data?.data?.courseTitle}
              </h3>
              <p className="mt-6 text-base leading-7 text-gray-600">
                {/* នៅក្នុងវគ្គសិក្សានេះ សិស្សនឹងរៀនពីរបៀបប្រើប្រាស់ពាក្យបញ្ជា UNIX
                ប្រកបដោយប្រសិទ្ធភាពសម្រាប់ការគ្រប់គ្រងឯកសារ រៀបចំទិន្នន័យ បង្កើត
                និងកែសម្រួលឯកសារអត្ថបទ និងអនុវត្តការងាររដ្ឋបាលប្រព័ន្ធ (System
                Administration) ។ */}
                {data?.data?.courseDescription}
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
                {includedFeatures.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className="h-6 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    {feature}
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
                      {data?.data?.coursePrice}
                    </span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                      USD
                    </span>
                  </p>
                  <button
                    onClick={handleBuyCourse}
                    className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get access
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
