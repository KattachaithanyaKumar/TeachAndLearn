import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FiPhone } from "react-icons/fi";
import { FaRegCircleCheck } from "react-icons/fa6";

import { aboutUs, services, statistics } from "../CONSTANTS";
import Button from "../components/Button";
import Navbar from "../components/Navbar";

import child from "../assets/child-hero.png";
import about from "../assets/teacher-and-student.JPG";
import mask from "../assets/mask.png";
import dots from "../assets/dots.png";
import blob from "../assets/blob.png";
import plus from "../assets/plus.png";
import circles from "../assets/circles.svg";

const Home = () => {
  return (
    <div>
      <Navbar />
      {/* Section with child image and text */}
      <section
        className="relative z-10 bg-amber-100 overflow-hidden pt-24"
        id="hero"
      >
        <img src={blob} alt="blob" className="absolute left-0 md:left-14" />
        <img
          src={dots}
          alt="dots"
          className="absolute top-[40%] left-[75%] rotate-45 hidden md:block"
        />
        <div className="flex flex-col md:flex-row items-center justify-center w-full px-4 md:px-12 py-16 gap-8 relative z-10">
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
          <div className="w-full md:w-[40%] max-w-md relative z-20 -mb-[80px]">
            <img
              src={child}
              alt="Child smiling with a stack of books"
              className="w-full md:block hidden scale-125"
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
              fill="#E0F2FE"
              d="M0,100L34.3,90C68.6,80,137,40,206,40C274.3,40,343,80,411,100C480,120,549,130,617,150C685.7,170,754,180,823,160C891.4,140,960,80,1029,50C1097.1,20,1166,40,1234,50C1302.9,60,1371,60,1406,60L1440,60L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
            />
          </svg>
        </div>
      </section>

      {/* STATISTICS */}
      <section
        className="relative bg-[#E0F2FE] overflow-hidden"
        id="statistics"
      >
        <div className="flex justify-center items-center pb-20 relative z-10">
          <div className="w-[80%] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {statistics.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-4"
                >
                  <div
                    className={`flex justify-center items-center rounded-full w-20 h-20 mb-4 ${item.bgColor}`}
                  >
                    <Icon className={`text-4xl ${item.iconColor}`} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {item.number}
                  </h2>
                  <p className="text-sm text-gray-600">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wave at bottom */}
        <div className="absolute bottom-0 left-0 w-full z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 180"
            className="w-full h-[80px]"
            preserveAspectRatio="none"
          >
            <path
              fill="#ecfcca"
              d="M0,100L34.3,90C68.6,80,137,40,206,40C274.3,40,343,80,411,100C480,120,549,130,617,150C685.7,170,754,180,823,160C891.4,140,960,80,1029,50C1097.1,20,1166,40,1234,50C1302.9,60,1371,60,1406,60L1440,60L1440,180L1405.7,180C1371.4,180,1303,180,1234,180C1165.7,180,1097,180,1029,180C960,180,891,180,823,180C754.3,180,686,180,617,180C548.6,180,480,180,411,180C342.9,180,274,180,206,180C137.1,180,69,180,34,180L0,180Z"
            />
          </svg>
        </div>
      </section>

      {/* ABOUT US */}
      <section
        id="about-us"
        className="relative bg-lime-100 px-6 py-20 flex justify-center items-center overflow-hidden"
      >
        <img src={plus} alt="" className="absolute left-[10%]" />
        <div className="flex flex-col md:flex-row gap-16 w-full max-w-7xl items-center">
          {/* Image with Mask */}
          <div className="flex-shrink-0">
            <img
              src={about}
              alt="teacher and student in a study session"
              className="w-[300px] md:w-[480px] h-auto object-cover"
              style={{
                WebkitMaskImage: `url(${mask})`,
                maskImage: `url(${mask})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "cover",
                maskSize: "cover",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
          </div>

          {/* Text Content */}
          <div className="max-w-xl text-center md:text-left z-10">
            <p className="text-orange-500 font-semibold text-sm md:text-base uppercase tracking-wide mb-2">
              About Us
            </p>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              {aboutUs.title}
            </h1>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              {aboutUs.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {aboutUs.items.map((item, index) => (
                <div
                  key={index}
                  className="border border-amber-300 bg-amber-50 rounded-lg flex items-center gap-3 px-4 py-3 shadow-sm"
                >
                  <FaRegCircleCheck className="text-green-600 text-lg" />
                  <p className="text-gray-800 text-sm md:text-base">{item}</p>
                </div>
              ))}
            </div>

            <Button>Know More</Button>
          </div>
        </div>

        {/* Wave at bottom */}
        <div className="absolute bottom-0 left-0 w-full z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 180"
            className="w-full h-[80px]"
            preserveAspectRatio="none"
          >
            <path
              fill="#fef3c6"
              d="M0,100L34.3,90C68.6,80,137,40,206,40C274.3,40,343,80,411,100C480,120,549,130,617,150C685.7,170,754,180,823,160C891.4,140,960,80,1029,50C1097.1,20,1166,40,1234,50C1302.9,60,1371,60,1406,60L1440,60L1440,180L1405.7,180C1371.4,180,1303,180,1234,180C1165.7,180,1097,180,1029,180C960,180,891,180,823,180C754.3,180,686,180,617,180C548.6,180,480,180,411,180C342.9,180,274,180,206,180C137.1,180,69,180,34,180L0,180Z"
            />
          </svg>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="bg-amber-100 relative flex items-center justify-center py-20 px-4 overflow-hidden"
      >
        <img src={circles} alt="" className="absolute scale-200" />
        <div className="max-w-6xl w-full z-10">
          <p className="text-orange-500 font-semibold text-sm md:text-base uppercase tracking-wide mb-2 text-center">
            Our Services
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-10 text-center">
            What Service We Offer
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-20">
            {services.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
                >
                  {Icon && (
                    <div className="bg-yellow-50 p-4 rounded-full mb-4 shadow-sm">
                      <Icon className="text-5xl text-yellow-500" />
                    </div>
                  )}
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {item.name}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <a
                    href="#"
                    className="text-orange-500 font-semibold text-sm hover:underline transition-all duration-200"
                  >
                    Read More →
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wave at bottom */}
        <div className="absolute bottom-0 left-0 w-full z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 180"
            className="w-full h-[80px]"
            preserveAspectRatio="none"
          >
            <path
              fill="#fff"
              d="M0,100L34.3,90C68.6,80,137,40,206,40C274.3,40,343,80,411,100C480,120,549,130,617,150C685.7,170,754,180,823,160C891.4,140,960,80,1029,50C1097.1,20,1166,40,1234,50C1302.9,60,1371,60,1406,60L1440,60L1440,180L1405.7,180C1371.4,180,1303,180,1234,180C1165.7,180,1097,180,1029,180C960,180,891,180,823,180C754.3,180,686,180,617,180C548.6,180,480,180,411,180C342.9,180,274,180,206,180C137.1,180,69,180,34,180L0,180Z"
            />
          </svg>
        </div>
      </section>
    </div>
  );
};

export default Home;
