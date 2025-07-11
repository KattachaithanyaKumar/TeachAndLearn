import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { aboutUs, allIcons } from "../CONSTANTS";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { TbTargetArrow } from "react-icons/tb";

import about from "../assets/teacher-and-student.JPG";
import mask from "../assets/mask.png";
import facility from "../assets/facility.jpg";
import mask2 from "../assets/mask4.png";
import { getStatistics } from "../network/api_service";
import Wave from "../components/Wave";
import CTA from "../components/CTA";
import Header from "../components/Header";

const CloudShape = ({ icon, title, children }) => {
  return (
    <div className="relative w-full h-auto">
      {/* Square-rounded shape for small screens */}
      <div className="sm:hidden w-full h-auto">
        <div className="w-full bg-white rounded-3xl shadow-md border border-gray-300 p-6 text-center flex flex-col items-center justify-center text-gray-800">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-blue-500 text-3xl">{icon}</span>
            <h2 className="text-lg font-bold">{title}</h2>
          </div>
          <p className="text-sm leading-relaxed">{children}</p>
        </div>
      </div>

      {/* Cloud shape for medium and above */}
      <svg
        viewBox="0 0 900 500"
        preserveAspectRatio="xMidYMin meet"
        className="hidden sm:block w-full h-[480px] sm:h-[520px] md:h-[560px]"
      >
        <path
          d="
            M280,400
            C180,420 130,330 180,270
            C80,250 120,150 230,180
            C250,100 380,80 460,150
            C550,80 700,120 680,220
            C760,240 780,320 720,360
            C700,420 550,440 460,400
            C420,440 320,440 280,400
            Z"
          fill="#ffffff"
          stroke="#d1d5db"
          strokeWidth="2"
          filter="drop-shadow(0 6px 12px rgba(0,0,0,0.1))"
        />
        <foreignObject x="160" y="140" width="580" height="240">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            className="w-full h-full flex flex-col justify-center items-center text-center text-gray-800 px-6"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-blue-500 text-3xl sm:text-4xl">{icon}</span>
              <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
            </div>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-[90%]">
              {children}
            </p>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

const About = () => {
  const [statistics, setStatistics] = useState([]);

  const fetchStatistics = async () => {
    try {
      const statsData = await getStatistics();
      setStatistics(statsData);
      console.log("Fetched Statistics:", statsData);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  useEffect(() => {
    // Fetch services data from the API
    fetchStatistics();
  }, []);

  return (
    <div>
      <Navbar />
      <Header color={"#FEF3C6"}>
        <h1 className="text-4xl font-bold  mb-4">
          About{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Teach & Learn
          </span>
        </h1>
        <div className="flex gap-2 items-center ">
          <Link to="/" className="hover:underline ">
            Home
          </Link>
          <span>/</span>
          <span>About</span>
        </div>
      </Header>

      <section className="relative bg-white px-6 py-20 flex justify-center items-center overflow-hidden">
        <div className="flex flex-col md:flex-row gap-16 w-full max-w-7xl items-center pb-40">
          {/* Image */}
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
          <div className="w-full max-w-2xl">
            <p className="text-sm sm:text-base md:text-lg text-orange-500 font-semibold mb-2">
              About us
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              {aboutUs.title}
            </h1>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              {aboutUs.description}
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {aboutUs.items.map((item, index) => (
                <div
                  key={index}
                  className="border border-amber-300 bg-amber-50 rounded-lg px-4 py-4 shadow-sm flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2">
                    <FaRegCircleCheck className="text-green-600 text-lg" />
                    <p className="text-gray-800 text-sm md:text-base font-semibold">
                      {item.title}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Wave color={"#E0F2FE"} />
      </section>

      <section className="relative flex items-center justify-center py-16 px-4 sm:px-6 md:px-12 overflow-hidden bg-[#E0F2FE]">
        <div className="flex flex-col text-center items-center pb-20">
          {/* Header Content */}
          <div className="max-w-3xl">
            <p className="text-sm sm:text-base md:text-lg text-orange-500 font-semibold mb-2">
              Our Promise
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Providing Exceptional Care & Support Every Step of the Way
            </h1>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              Our promise to you is to provide exceptional care and support
              every step of the way. We are committed to helping individuals
              reach their full potential and achieve success in all areas of
              their lives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-2">
            <CloudShape icon={<IoEyeOutline />} title="Our Vision">
              A world in which children with special needs recognize their
              abilities.
            </CloudShape>

            <CloudShape icon={<TbTargetArrow />} title="Our Mission">
              To nurture children with special needs in a safe, inclusive and
              supportive environment, which will enable them to function with
              dignity at their highest potential.
            </CloudShape>
          </div>
        </div>

        <Wave color={"#ecfcca"} />
      </section>

      <section className="relative flex items-center justify-center py-16 px-4 sm:px-6 md:px-12 overflow-hidden bg-lime-100">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 max-w-7xl w-full pb-40">
          {/* Left content (you can add text or leave empty) */}
          <div className="flex-1">
            <p className="text-sm sm:text-base md:text-lg text-orange-500 font-semibold mb-2">
              Facilities
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Therapy Rooms
            </h1>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              Our therapy rooms are purpose-built to create an optimal
              environment for delivering therapy services that cater to the
              unique needs of each child. Our highly trained therapists leverage
              these resources to deliver a wide range of services, including
              behavioral therapy, speech therapy, physical therapy, and
              occupational therapy, all tailored to meet the unique needs of
              each child. In addition, we offer private therapy rooms for
              families who seek a more personalized approach to care.
            </p>
          </div>

          {/* Right: Image */}
          <div className="flex-shrink-0">
            <img
              src={facility}
              alt="teacher and student in a study session"
              className="w-[320px] sm:w-[400px] md:w-[500px] h-auto object-cover"
              style={{
                WebkitMaskImage: `url(${mask2})`,
                maskImage: `url(${mask2})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
          </div>
        </div>

        <Wave color={"#fff"} />
      </section>

      <section className="relative bg-[#fff] overflow-hidden" id="statistics">
        <div className="flex justify-center items-center pb-40 relative z-10">
          <div className="w-[80%] grid grid-cols-2 md:grid-cols-4 gap-6 text-center ">
            {statistics.map((item, index) => {
              const Icon = allIcons[item.icon];
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

        {/* <div className="mb-40">
          <CTA />
          </div> */}
        <Wave color={"#FEF3C6"} />
      </section>

      <Footer color={"#FEF3C6"} />
    </div>
  );
};

export default About;
