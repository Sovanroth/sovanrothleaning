import React from "react";
import { Link } from "react-router-dom";

const RequestLink = () => {
  return (
    <>
      <main className="h-full">
        <img
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
          <p className="text-base font-semibold leading-8 text-white">2xx</p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Thank you for using our platform!
          </h1>
          <p className="mt-4 text-base text-white/70 sm:mt-6">
            We've sent the reset link to your email; please check it out!
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href="https://gmail.com/"
              className="text-sm font-semibold leading-7 text-white"
            >
              <span aria-hidden="true">&larr;</span> Open gmail
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default RequestLink;
