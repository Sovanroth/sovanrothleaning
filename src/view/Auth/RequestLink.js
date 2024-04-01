import React from "react";
import { Link } from "react-router-dom";

const RequestLink = () => {
  return (
    <>
      <main className="h-full">
        <img
          src="https://img.freepik.com/free-photo/employee-putting-sticky-notes-laptop-screen-as-work-reminder-company-office-manager-using-adhesive-post-it-paper-display-remember-business-schedule-presentation-close-up_482257-33914.jpg?t=st=1711949344~exp=1711952944~hmac=ebb5bd49acc3ebb557b8e48caa7130371d57c6db95d0986b1ec4b43297e42907&w=2000"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
          <p className="text-base font-semibold leading-8 text-white">2xx</p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Thank you for using our platform!
          </h1>
          <p className="mt-4 text-base text-white/70 sm:mt-6">
            You've sent the reset link to your email; please check it out!
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
