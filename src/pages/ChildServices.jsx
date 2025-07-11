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
        <h1 className="text-4xl font-bold  mb-4">
          Child{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Services
          </span>
        </h1>
        <div className="flex gap-2 items-center ">
          <p>
            Comprehensive therapy services designed to help children reach their
            developmental milestones and achieve their full potential in a fun,
            supportive environment.
          </p>
        </div>
      </Header>

      <section className="bg-white py-20 px-4 sm:px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto pb-30">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Our Child Services
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Specialized therapies tailored for children's unique needs
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {childServices.map((item, index) => (
              <div
                key={index}
                className="bg-[#FEFCE8] rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {item.description}
                  </p>

                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-4">
                    {item.items.map((i, idx) => (
                      <li key={idx}>{i}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-4">
                  <Button
                    className="w-fit"
                    onClick={() =>
                      handleNavigate(
                        item.title.toLowerCase().replace(/\s+/g, "-")
                      )
                    }
                  >
                    Explore
                    <IoIosArrowRoundForward size={24} />
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
