import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Wave from "../components/Wave";
import { adultServices, allIcons } from "../CONSTANTS";
import CTA from "../components/CTA";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import Header from "../components/Header";

const AdultServices = () => {
  const navigate = useNavigate();

  const handleNavigate = (title) => {
    let path = "";
    switch (title) {
      case "Psychology":
        path = "psychology";
        break;
      case "Speech Therapy":
        path = "speech-therapy";
        break;
      case "Physical Therapy":
        path = "physical-therapy";
        break;
      case "Behavioral Therapy":
        path = "behavioral-therapy";
        break;
      default:
        path = title.toLowerCase().replace(/\s+/g, "-");
    }
    navigate(`/adult-services/${path}`);
  };

  return (
    <div>
      <Navbar />
      <Header color={"#EDE9FE"}>
        <h1 className="text-4xl font-bold  mb-4">
          Adult{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Services
          </span>
        </h1>
        <div className="flex gap-2 items-center ">
          <p>
            Specialized therapy services for adults, focusing on mental, physical, and emotional well-being to help individuals lead fulfilling lives.
          </p>
        </div>
      </Header>

      <section className=" py-20 px-4 sm:px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto pb-30">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 ">
              Our Adult Services
            </h1>
            <p className="text-gray-700 text-base sm:text-lg">
              Comprehensive therapies tailored for adults' unique needs
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {adultServices.map((item, index) => {
              const Icon = allIcons[item.icon?.displayName || item.icon?.name] || item.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between border border-indigo-200"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-indigo-900 mb-2">
                      {item.title}
                    </h2>
                    <p className="text-gray-700 text-sm mb-4">
                      {item.description}
                    </p>

                    <ul className="list-disc list-inside text-sm text-gray-800 space-y-1 mb-4">
                      {item.items.map((i, idx) => (
                        <li key={idx}>{i}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-4">
                    <Button
                      className="w-fit bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-purple-600 hover:to-indigo-600"
                      onClick={() => handleNavigate(item.title)}
                    >
                      Explore
                      <IoIosArrowRoundForward size={24} />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mb-40">
          <CTA />
        </div>

        <Wave color={"#EDE9FE"} />
      </section>

      <Footer color={"#EDE9FE"} />
    </div>
  );
};

export default AdultServices;
