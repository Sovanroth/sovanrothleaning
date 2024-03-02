import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../src/redux/slice/signUpSlice";
import Notification from "./Notification";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.signUp.user);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    role: "",
    username: "",
    password: "",
  });

  const handleChangeUserName = (e) => {
    const newVal = { ...data, username: e.target.value };
    setData(newVal);
  };

  const handleChangEmail = (e) => {
    const newVal = { ...data, email: e.target.value };
    setData(newVal);
  };

  const handleChangePassword = (e) => {
    const newVal = { ...data, password: e.target.value };
    setData(newVal);
  };

  const handleCreateUser = async () => {
    setLoading(true);
    try {
      const params = {
        email: data?.email,
        role: "0",
        username: data?.username,
        password: data?.password,
      };

      const response = await dispatch(createUser(params));
      console.log(response.data.error);

      if (response.data.error) {
        setErrorMessage(response.data.message);
      } else {
        window.location.href = "/login";
      }
    } catch (error) {
      console.log(true);
    }
    setLoading(false);
  };

  const handleClickSignUp = async (event) => {
    event.preventDefault();
    handleCreateUser();
    setErrorMessage(null);
  };

  return (
    <>
      {errorMessage && (
        <Notification
          headerMessage="Sign Up Error"
          infoMessage={errorMessage}
        />
      )}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="sovanroth.png" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your Account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
          <form
            className="space-y-6"
            method="POST"
            onSubmit={handleClickSignUp}
          >
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-start leading-6 text-gray-900"
              >
                Username
              </label>
              <div>
                <input
                  onClick={handleChangeUserName}
                  value={data?.username}
                  onChange={(e) => handleChangeUserName(e)}
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-start leading-6 text-gray-900"
              >
                Email address
              </label>
              <div>
                <input
                  onClick={handleChangEmail}
                  value={data?.email}
                  onChange={(e) => handleChangEmail(e)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div>
                <input
                  onClick={handleChangePassword}
                  value={data?.password}
                  onChange={(e) => handleChangePassword(e)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="mt-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>
          <p className=" text-center text-sm text-gray-500">
            Have an account?{" "}
            <Link
              to="../login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
