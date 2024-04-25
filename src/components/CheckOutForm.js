import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import { useNavigate, useParams } from "react-router-dom";
import {
  buyCourse,
  checkOut,
  getCourseByUserID,
  getOneData,
} from "../redux/slice/courseSlice";

const list = [
  {
    id: 1,
    category: "FRONT END",
  },
  {
    id: 2,
    category: "BACK END",
  },
  {
    id: 3,
    category: "ACCOUNTING",
  },
  {
    id: 4,
    category: "ENGINEERING",
  },
  {
    id: 5,
    category: "Movie",
  },
];

export default function CheckOutForm() {
  const oneData = useSelector((state) => state?.courses?.oneData);
  const checkout = useSelector((state) => state?.courses?.checkout);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const getCategoryName = (categoryNumber) => {
    const category = list.find((item) => item.id === categoryNumber);
    return category ? category.category : "Unknown";
  };

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

  const handleBuyCourse = async (event) => {
    event.preventDefault();
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

  const getCheckOutData = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const param = {
        amount: oneData?.data?.coursePrice,
      };

      // console.log(param);

      const response = await dispatch(checkOut(param));
      console.log(response);

      return response;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <div className=" flex flex-col min-h-screen">
      <NavBar />
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>

        <form
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
          method="POST"
          onSubmit={getCheckOutData}
        >
          <div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Payment information
              </h2>
            </div>

            <div className="mt-5 border-t border-gray-200 pt-10">
              <div className=" grid grid-cols-4 gap-x-4 gap-y-6">
                <div className="col-span-4">
                  <label
                    htmlFor="card-number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card number
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      required
                      id="card-number"
                      name="card-number"
                      autoComplete="cc-number"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-4">
                  <label
                    htmlFor="name-on-card"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name on card
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      required
                      id="name-on-card"
                      name="name-on-card"
                      autoComplete="cc-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="expiration-date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiration date (MM/YY)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      required
                      name="expiration-date"
                      id="expiration-date"
                      autoComplete="cc-exp"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cvc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVC
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="cvc"
                      id="cvc"
                      required
                      autoComplete="csc"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <div className=" text-md px-4 py-6 sm:px-6">
                {/* {oneData?.data?.courseTitle} */}
                <li className="flex px-4 py-6 sm:px-6">
                  <div className="flex-shrink-0">
                    <img
                      src={oneData?.data?.courseImage}
                      className="w-20 rounded-md"
                    />
                  </div>
                  <div className="ml-6 flex flex-1 flex-col">
                    <div className="flex">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm">
                          <a className="font-medium text-gray-700 hover:text-gray-800">
                            {oneData?.data?.courseTitle}
                          </a>
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">
                          {/* {oneData?.data?.category} */}
                          Category: {getCategoryName(oneData?.data?.category)}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <div className=" text-sm text-justify">
                  {oneData?.data?.courseDescription}
                </div>
              </div>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {oneData?.data?.coursePrice}$
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">0.00$</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    {oneData?.data?.coursePrice}$
                  </dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 px-1 py-4 sm:px-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-2 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  {loading ? "Loading ..." : "Confirm buy"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
