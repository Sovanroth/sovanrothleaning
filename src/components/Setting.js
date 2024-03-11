import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCourseByUserID } from "../redux/slice/courseSlice";
import { isEmpty } from "@firebase/util";

export default function Setting() {
  const data = useSelector((state) => state?.courses?.getCourseByUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const initData = async () => {
    setLoading(true);
    let response = {};
    try {
      const response = await dispatch(getCourseByUserID());
    } catch (error) {
      console.log(error);
      response = error;
    }
    setLoading(false);
    return response;
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <>
      <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8">
        <main className="px-4 py-0 sm:px-6 lg:flex-auto lg:px-0 lg:py-10">
          <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                {data?.data?.profile === null ? (
                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6 self-center">
                      Profile Picture
                    </dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <img
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        height="75px"
                        width="75px"
                        className="rounded-full"
                      />
                      <button
                        type="button"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Update
                      </button>
                    </dd>
                  </div>
                ) : (
                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6 self-center">
                      Profile Picture
                    </dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <img
                        src={data?.data?.profile?.profileImage}
                        height="75px"
                        width="75px"
                        className="rounded-full"
                      />
                      <button
                        type="button"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Update
                      </button>
                    </dd>
                  </div>
                )}

                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                    Full name
                  </dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">{data?.data?.username}</div>
                    <button
                      type="button"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Update
                    </button>
                  </dd>
                </div>
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                    Email address
                  </dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">{data?.data?.email}</div>
                    <button
                      type="button"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Update
                    </button>
                  </dd>
                </div>

                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                    Password
                  </dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">****************</div>
                    <button
                      type="button"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Update
                    </button>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
