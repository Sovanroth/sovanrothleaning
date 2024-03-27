import React from "react";
import { Link } from "react-router-dom";

const NotAllow = () => {
  return (
    <>
      <main className="h-full">
        <img
          src="https://images.unsplash.com/photo-1580256079206-46a04a632758?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
          <p className="text-base font-semibold leading-8 text-white">405</p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Page not allow
          </h1>
          <p className="mt-4 text-base text-white/70 sm:mt-6">
            Sorry, but you must access this page through desktop mode!
          </p>
          <div className="mt-10 flex justify-center">
            <Link to="/" className="text-sm font-semibold leading-7 text-white">
              <span aria-hidden="true">&larr;</span> Back to home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotAllow;
