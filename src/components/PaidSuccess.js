import { Helmet } from "react-helmet";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { buyCourse, excecutePaymentData } from "../redux/slice/courseSlice";
import { useEffect, useState } from "react";

export default function PaidSuccess() {
  const dispatch = useDispatch();

  const currentURL = window.location.href;
  const urlParams = new URLSearchParams(currentURL.split("?")[1]);
  let token = urlParams.get("token");
  let userId = urlParams.get("UserId");
  let courseId = urlParams.get("CourseID");

  if (!token) {
    console.error("Token parameter is missing or null.");
  }

  if (!userId) {
    console.error("UserId parameter is missing or null.");
  }

  if (!courseId) {
    console.error("CourseID parameter is missing or null.");
  }

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const hanldeExcecuteData = async () => {
    setLoading(true);
    try {
      const param = {
        orderID: token,
      };
      console.log(param);
      const response = await dispatch(excecutePaymentData(param));
      console.log(courseId);
      await dispatch(buyCourse(courseId));
      return response;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hanldeExcecuteData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Suku | Paid</title>
      </Helmet>
      <main className="h-full">
        <img
          src="https://images.unsplash.com/photo-1508938255445-041651dfe0c3?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
          <p className="text-base font-semibold leading-8 text-white">2xx</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Paid Successfully!
          </h1>
          <p className="mt-4 text-base text-white/70 sm:mt-6">
            You've paid for the course; thank you for using our platform!
          </p>
          <div className="mt-10 flex justify-center">
            <Link to="/" className="text-sm font-semibold leading-7 text-white">
              <span aria-hidden="true">&larr;</span>
              {loading ? " Loading ..." : " Back to home"}
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
