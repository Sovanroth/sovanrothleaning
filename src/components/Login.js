import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../redux/slice/loginSlice";

export default function Login() {
  const user = useSelector((state) => state.logIn.user);

  function handleFormSubmit(event) {
    event.preventDefault();
    window.location.href = "/";
  }

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChangeEmail = (e) => {
    const newVal = { ...data, email: e.target.value };
    setData(newVal);
  };

  const handleChangePassword = (e) => {
    const newVal = { ...data, password: e.target.value };
    setData(newVal);
  };

  const handleLoginUser = async () => {
    setLoading(true);
    try {
      const params = {
        email: data?.email,
        password: data?.password,
      };
      // console.log("login", params);
      dispatch(loginUser(params));
      console.log(user)
      // dispatch(createUser(params));
    } catch (error) {
      console.log(true);
    }
    setLoading(false);
  };

  return (
    <>
    {JSON.stringify(user)}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="sovanroth.png" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-start leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={data?.email}
                  onChange={(e) => handleChangeEmail(e)}
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
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
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
          </form>
          <div >
            {/* <Link to="/"> */}
            <button
              onClick={handleLoginUser}
              // type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5"
            >
              Log in
            </button>
            {/* </Link> */}
          </div>
          <p className="mt-5 text-center text-sm text-gray-500">
            No account?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
