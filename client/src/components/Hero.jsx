import React from "react";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Link } from "react-router-dom";

const Hero = () => {

  const gradient = 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5))';
  const imageUrl = 'hero-bg.jpg';

  return (
    <div
      className="px-4 py-16  sm:max-w-full md:max-w-full lg:max-w-full md:px-24 lg:px-8 lg:py-20"
      style={{
        backgroundImage:`${gradient}, url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
        <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
          <Link href="/" className="mb-6 sm:mx-auto">
            <div className="flex items-center text-black justify-center w-12 h-12 rounded-full bg-indigo-50">
              <AccountTreeIcon />
            </div>
          </Link>
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <h2 className="max-w-lg  font-sans text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl md:mx-auto">
              <span className="relative inline-block">
                <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                >
                  <defs>
                    <pattern
                      id="e77df901-b9d7-4b9b-822e-16b2d410795b"
                      x="0"
                      y="0"
                      width=".135"
                      height=".30"
                    >
                      <circle cx="1" cy="1" r=".7" />
                    </pattern>
                  </defs>
                  <rect
                    fill="url(#e77df901-b9d7-4b9b-822e-16b2d410795b)"
                    width="52"
                    height="24"
                  />
                </svg>
                <span className="relative">Make</span>
              </span>{" "}
              Your Own Story.
            </h2>
           
          </div>
          <div>
            <Link
              to="/register"
              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded shadow-md bg-white focus:shadow-outline focus:outline-none"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
