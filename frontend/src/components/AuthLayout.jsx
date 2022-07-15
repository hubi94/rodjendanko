import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <>
      <section className="h-screen">
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="grid grid-cols-1 divide-y-2 divide-violet-200 md:w-8/12 lg:w-6/12 mb-14 md:mb-0">
              {children}
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone image"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthLayout;
