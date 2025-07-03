import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Wave from "../components/Wave";
import { childServices } from "../CONSTANTS";

const ChildServices = () => {
  return (
    <div>
      <Navbar />
      <section className="bg-[#E0F2FE] py-44 relative overflow-hidden">
        <div className="flex justify-center items-center flex-col pb-20">
          <h1 className="text-4xl font-bold  mb-4">
            Child{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <div className="flex gap-2 items-center ">
            <p>
              Comprehensive therapy services designed to help children reach
              their developmental milestones and achieve their full potential in
              a fun, supportive environment.
            </p>
          </div>
        </div>

        <Wave color={"#fff"} />
      </section>

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
                className="bg-[#fefce8] rounded-xl shadow-lg p-6 flex flex-col gap-4"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h2>
                  <p className="text-gray-700 text-sm">{item.description}</p>
                </div>

                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {item.items.map((i, idx) => (
                    <li key={idx}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <Wave color={"#E0F2FE"} />
      </section>

      <Footer color={"#E0F2FE"} />
    </div>
  );
};

export default ChildServices;
