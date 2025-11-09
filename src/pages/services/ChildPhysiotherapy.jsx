import React from "react";

import img1 from "../../assets/occupational.jpg";
import blob from "../../assets/blob.png";
import earlyInterventionImage from "../../assets/why-us.jpg";
import assessmentImage from "../../assets/facility.jpg";

import Section from "../../components/Section";
import CTA from "../../components/CTA";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";

import {
  FaChild,
  FaHeart,
  FaShieldAlt,
  FaSmile,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";

const therapyBenefits = [
  {
    icon: <FaCheckCircle className="text-green-500 text-2xl" />,
    title: "Recover from Injuries or Illnesses",
    description:
      "Helps children regain their physical abilities after an injury or illness.",
  },
  {
    icon: <FaUsers className="text-blue-500 text-2xl" />,
    title: "Improve Range of Motion and Flexibility",
    description:
      "Increases flexibility and the ability to move joints through their full range.",
  },
  {
    icon: <FaChild className="text-purple-500 text-2xl" />,
    title: "Build Strength and Endurance",
    description:
      "Develops muscle strength and stamina for daily activities.",
  },
  {
    icon: <FaSmile className="text-yellow-500 text-2xl" />,
    title: "Reach Full Potential",
    description:
      "Assists children with developmental delays or disabilities to achieve their best.",
  },
  {
    icon: <FaShieldAlt className="text-red-500 text-2xl" />,
    title: "Improve Quality of Life",
    description:
      "Enhances overall well-being and the ability to participate in life's activities.",
  },
  {
    icon: <FaHeart className="text-pink-500 text-2xl" />,
    title: "Gain Confidence and Independence",
    description:
      "Boosts self-esteem and independence through physical achievements.",
  },
];

const ChildPhysiotherapy = () => {
  return (
    <div>
      <Navbar />
      <Header color={"#E0F2FE"}>
        <h1 className="text-4xl font-bold mb-4 text-center">
          Child{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Physiotherapy
          </span>
        </h1>
        <div className="flex gap-2 items-center justify-center">
          <p className="max-w-2xl text-lg sm:text-xl text-center">
            Helping children improve their physical function and mobility.
          </p>
        </div>
      </Header>
      <Section>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Image */}
          <div className="flex-shrink-0">
            <img
              src={img1}
              alt="Physiotherapy Session"
              className="w-[280px] md:w-[400px] lg:w-[480px] h-auto object-cover"
              style={{
                WebkitMaskImage: `url(${blob})`,
                maskImage: `url(${blob})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "cover",
                maskSize: "cover",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
          </div>

          {/* Text */}
          <div className="max-w-xl text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What is Physical Therapy?
            </h1>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              It is a type of therapy that focuses on helping children improve their physical function and mobility. It involves the use of exercise, manual therapy, and other techniques to help children develop strength, flexibility, balance, and coordination. Our physical therapists work with children to identify physical limitations and develop individualized treatment plans to improve their function and overall well-being.
            </p>
          </div>
        </div>
      </Section>

      <Section color={"#f9fafb"}>
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Advantages of Physical Therapy
            </h2>
            <p className="text-gray-600 mt-2 text-base sm:text-lg max-w-2xl mx-auto">
              Helping Children Build Confidence and Independence Through Physical Therapy.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {therapyBenefits.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
              >
                <span className="flex gap-2 items-center">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                </span>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Image */}
          <div className="flex-shrink-0 w-full lg:w-1/2">
            <img
              src={earlyInterventionImage}
              alt="Early intervention"
              className="w-full h-auto rounded-xl shadow-md object-cover"
            />
          </div>

          {/* Text */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center lg:text-left">
              Why Early Intervention in Physical Therapy Matters?
            </h2>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              Early intervention in physical therapy is critical in helping children achieve their physical goals. Our physical therapists work with children as early as possible to identify physical limitations and develop treatment plans to address them. By intervening early, we can help children develop the skills they need to reach their full physical potential and improve their overall health and well-being.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-[#f9fafb] py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Text */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center lg:text-left">
              Importance of Physical Therapy
            </h2>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              It is important for children for a variety of reasons. It can help them recover from injuries or illnesses, improve their range of motion and flexibility, and build strength and endurance. It can also help children with developmental delays or disabilities to reach their full potential and improve their quality of life.
            </p>
          </div>
          {/* Image */}
          <div className="flex-shrink-0 w-full lg:w-1/2">
            <img
              src={assessmentImage}
              alt="Behavioral assessment"
              className="w-full h-auto rounded-xl shadow-md object-cover"
            />
          </div>
        </div>
      </Section>

      <CTA />

      <Footer />
    </div>
  );
};

export default ChildPhysiotherapy;
