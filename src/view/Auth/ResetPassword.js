import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../redux/slice/loginSlice";

const ResetPassword = () => {
  const { token } = useParams();
  const [data, setData] = useState({
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangePassword = (e) => {
    const newVal = { ...data, password: e.target.value };
    setData(newVal);
  };

  const handleResetPassword = async () => {
    setLoading(true);

    try {
      const params = {
        token: token,
        newPassword: data?.password,
      };

      const response = await dispatch(resetPassword(params));
      // console.log(response?.data?.data?.message);
      if (response?.data?.data?.success === true) {
        navigate("/forgot-password/reset-successfully");
      } else {
        setErrorMessage(response?.data?.data?.message);
      }
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickResetPassword = async (event) => {
    event.preventDefault();
    handleResetPassword();
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-20 w-auto"
          src="/sovanroth.png"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <div className="text-center text-sm text-gray-500">
            Please enter your new password!
          </div>
          <form
            className="space-y-6 mt-5"
            method="POST"
            onSubmit={handleClickResetPassword}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  value={data?.password}
                  onChange={(e) => handleChangePassword(e)}
                  name="password"
                  type="password"
                  required
                  minLength="8"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {data.password.length > 0 && data.password.length < 8 && (
                  <div className="text-red-500 mt-2 text-sm">
                    Password must be at least 8 characters long.
                  </div>
                )}
                {errorMessage && (
                  <div className="text-red-500 mb-4">{errorMessage}</div>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
