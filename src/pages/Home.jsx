import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FiPhone } from "react-icons/fi";

import Navbar from "../components/Navbar";
import child from "../assets/child-hero.png";
import Button from "../components/Button";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="">
        {/* Section with child image and text */}
        <section className="relative z-10 bg-amber-100 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-center w-full px-4 md:px-12 py-8 gap-8 relative z-10">
            {/* Left Content */}
            <div className="w-full md:w-1/2 flex flex-col gap-2">
              <p className="text-sm sm:text-base md:text-lg text-orange-500">
                Welcome to Teach & Learn
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug md:leading-tight">
                Empowering Children and Adults to{" "}
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  Reach Their Full Potential
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-700">
                Comprehensive therapy services designed to support growth,
                learning, and development in a caring, professional environment.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
                <Button>
                  <span className="flex items-center gap-1">
                    Know More <IoIosArrowRoundForward size={24} />
                  </span>
                </Button>
                <Button variant="secondary" className="flex gap-3">
                  Book Appointment
                  <FiPhone size={16} />
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full md:w-[30%] max-w-sm relative z-20 -mb-6">
              <img
                src={child}
                alt="Child smiling with a stack of books"
                className="w-full md:block hidden"
              />
            </div>
          </div>

          {/* Wave at Bottom */}
          <div className="absolute bottom-0 left-0 w-full z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 180"
              className="w-full h-[80px] rotate-180"
              preserveAspectRatio="none"
            >
              <path
                fill="#fff"
                d="M0,100L34.3,90C68.6,80,137,40,206,40C274.3,40,343,80,411,100C480,120,549,130,617,150C685.7,170,754,180,823,160C891.4,140,960,80,1029,50C1097.1,20,1166,40,1234,50C1302.9,60,1371,60,1406,60L1440,60L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
              />
            </svg>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
