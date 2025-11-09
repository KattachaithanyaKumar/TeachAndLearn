import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Wave from "../components/Wave";
import { childServices } from "../CONSTANTS";
import CTA from "../components/CTA";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import Header from "../components/Header";

const ChildServices = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(`/child-services/${path}`);
  };

  return (
    <div>
      <Navbar />
      <Header color={"#E0F2FE"}>
        <h1 className="text-4xl font-bold mb-4 text-center">
          Child{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Services
          </span>
        </h1>
        <div className="flex gap-2 items-center justify-center">
          <p className="max-w-2xl text-lg sm:text-xl text-center">
            Comprehensive therapy services designed to help children reach their
            developmental milestones and achieve their full potential in a fun,
            supportive environment.
          </p>
        </div>
      </Header>

      <section className="bg-white py-24 px-4 sm:px-8 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto pb-30">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Our Child Services
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
              Specialized therapies tailored for children's unique needs
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {childServices.map((item, index) => (
              <div
                key={index}
                className="bg-[#FEFCE8] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col justify-between hover:translate-y-[-5px]"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 text-base mb-6 leading-relaxed text-center">
                    {item.description}
                  </p>

                  <ul className="list-disc list-inside text-base text-gray-700 space-y-2 mb-6 ml-2">
                    {item.items.map((i, idx) => (
                      <li key={idx} className="pl-2">{i}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-5 flex justify-center">
                  <Button
                    className="w-fit text-base hover:scale-105 transition-transform"
                    onClick={() =>
                      handleNavigate(item.path)
                    }
                  >
                    Explore
                    <IoIosArrowRoundForward size={28} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-40">
          <CTA />
        </div>

        <Wave color={"#E0F2FE"} />
      </section>

      <Footer color={"#E0F2FE"} />
    </div>
  );
};

export default ChildServices;
