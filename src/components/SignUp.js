import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Notification from "./Notification";
import { Eye, EyeOff } from "lucide-react";
import { createUser } from "../../src/redux/slice/signUpSlice";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.signUp.user);
  const [errorMessage, setErrorMessage] = useState(null);
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

      if (response.data.error) {
        setErrorMessage(response.data.message);
      } else {
        window.location.href = "/login";
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleClickSignUp = async (event) => {
    event.preventDefault();
    handleCreateUser();
    setErrorMessage(null);
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          <img className="mx-auto h-10 w-auto" src="sovanroth.png" alt="Logo" />
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
                  value={data?.username}
                  onChange={handleChangeUserName}
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
                  value={data?.email}
                  onChange={handleChangEmail}
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
              <div className="relative">
                <input
                  value={data?.password}
                  onChange={handleChangePassword}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" size={8} />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" size={8} />
                  )}
                </button>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="mt-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Loading..." : "Sign up"}
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
