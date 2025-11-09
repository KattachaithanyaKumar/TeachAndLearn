import React from "react";

import img1 from "../../assets/occupational.jpg";
import img2 from "../../assets/Occupational-Therapy-1-1.jpg";
import blob from "../../assets/blob3.png";
import Section from "../../components/Section";

import {
  FaChild,
  FaBrain,
  FaHandsWash,
  FaPenFancy,
  FaWalking,
  FaPuzzlePiece,
  FaSchool,
  FaSmileBeam,
  FaRunning,
  FaTools,
  FaHandsHelping,
  FaHeart,
} from "react-icons/fa";
import CTA from "../../components/CTA";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";

const keyComponents = [
  {
    icon: <FaChild className="text-indigo-500 text-2xl" />,
    title: "Developmental Milestones",
    description:
      "Evaluating fine motor skills, hand-eye coordination, sensory processing, and self-care abilities to identify delays or challenges.",
  },
  {
    icon: <FaBrain className="text-yellow-500 text-2xl" />,
    title: "Sensory Processing",
    description:
      "Helping children regulate emotional and behavioral responses to sensory stimuli like touch, sound, and movement.",
  },
  {
    icon: <FaPenFancy className="text-blue-500 text-2xl" />,
    title: "Fine Motor Skills",
    description:
      "Developing precise hand and finger movements for tasks like writing, drawing, and using tools or utensils.",
  },
  {
    icon: <FaWalking className="text-green-500 text-2xl" />,
    title: "Gross Motor Skills",
    description:
      "Building coordination, strength, and balance for activities such as walking, running, jumping, and playing.",
  },
  {
    icon: <FaPuzzlePiece className="text-pink-500 text-2xl" />,
    title: "Play Skills",
    description:
      "Using play-based learning to boost social interaction, imagination, and cognitive problem-solving.",
  },
  {
    icon: <FaHandsWash className="text-red-400 text-2xl" />,
    title: "Self-Care Skills",
    description:
      "Helping children gain independence in daily tasks like dressing, eating, grooming, and toileting.",
  },
  {
    icon: <FaSchool className="text-purple-500 text-2xl" />,
    title: "School Readiness",
    description:
      "Improving focus, attention, organization, and handwriting to prepare children for academic success.",
  },
];

const Occupational = () => {
  return (
    <div>
      <Navbar />
      <Header color={"#E0F2FE"}>
        <h1 className="text-4xl font-bold mb-4 text-center">
          Child{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Speech Therapy
          </span>
        </h1>
        <div className="flex gap-2 items-center justify-center">
          <p className="max-w-2xl text-lg sm:text-xl text-center">
            Comprehensive speech and language therapy to help children communicate effectively.
          </p>
        </div>
      </Header>
      <Section>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Image */}
          <div className="flex-shrink-0">
            <img
              src={img1}
              alt="teacher and student in a study session"
              className="w-[280px] md:w-[400px] lg:w-[480px] h-auto object-cover"
              style={{
                WebkitMaskImage: `url(${blob})`,
                maskImage: `url(${blob})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
          </div>

          {/* Text */}
          <div className="max-w-xl text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Assessing a Child's Functional Abilities and Needs
            </h1>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              It is a form of therapy that helps children develop the skills
              they need to perform activities of daily living, such as
              self-care, play, and school-related tasks. Our occupational
              therapists work with children to improve their fine motor skills,
              gross motor skills, visual perception, sensory integration,
              attention, and executive functioning. By addressing a child’s
              unique needs, our occupational therapy program helps children
              build the necessary skills to function effectively and achieve
              greater independence.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Key Components of Pediatric Occupational Therapy
            </h2>
            <p className="text-gray-600 text-base max-w-3xl mx-auto">
              Occupational therapy supports children in mastering essential
              skills needed for independence, learning, and healthy development.
            </p>
          </div>

          {/* Grid of Components */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyComponents.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#f9fafb] p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Techniques and Interventions
            </h2>
            <p className="text-gray-600 text-base max-w-3xl mx-auto">
              Occupational therapists use evidence-based approaches to support
              children's sensory, motor, and functional development.
            </p>
          </div>

          {/* Grid: Image + Content */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Image */}
            <div className="w-full lg:w-1/2">
              <img
                src={img1}
                alt="Occupational therapy techniques"
                className="w-full h-auto rounded-xl shadow-md object-cover"
              />
            </div>

            {/* Techniques */}
            <div className="w-full lg:w-1/2 space-y-6">
              {[
                {
                  icon: <FaPuzzlePiece className="text-indigo-500 text-2xl" />,
                  title: "Sensory Integration Therapy",
                  description:
                    "Using activities to address sensory processing challenges, helping children respond appropriately to sensory stimuli.",
                },
                {
                  icon: <FaSmileBeam className="text-yellow-500 text-2xl" />,
                  title: "Therapeutic Play",
                  description:
                    "Engaging children in purposeful and enjoyable activities to develop skills and address specific challenges.",
                },
                {
                  icon: <FaRunning className="text-green-500 text-2xl" />,
                  title: "Fine and Gross Motor Activities",
                  description:
                    "Implementing exercises and games to improve coordination, strength, and balance.",
                },
                {
                  icon: <FaTools className="text-blue-500 text-2xl" />,
                  title: "Adaptive Equipment and Strategies",
                  description:
                    "Recommending and teaching the use of adaptive tools or techniques to aid children in completing tasks independently.",
                },
                {
                  icon: <FaHandsHelping className="text-pink-500 text-2xl" />,
                  title: "Parent and Caregiver Education",
                  description:
                    "Educating parents and caregivers about techniques and activities to support their child's development at home.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#f9fafb] p-5 rounded-lg shadow hover:shadow-md transition"
                >
                  <div className="flex items-start gap-4">
                    <div>{item.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-[#f9fafb] py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Goals of Pediatric Occupational Therapy
            </h2>
            <p className="text-gray-600 text-base max-w-3xl mx-auto">
              Pediatric occupational therapists collaborate with parents,
              teachers, and other healthcare professionals to create
              individualized treatment plans that support independence,
              learning, and overall well-being.
            </p>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Goals */}
            <div className="w-full lg:w-1/2 space-y-6">
              {[
                {
                  icon: <FaChild className="text-indigo-500 text-2xl" />,
                  text: "Enhance a child's independence in daily activities.",
                },
                {
                  icon: <FaHandsHelping className="text-pink-500 text-2xl" />,
                  text: "Improve social interactions and play skills.",
                },
                {
                  icon: <FaSchool className="text-green-500 text-2xl" />,
                  text: "Facilitate successful participation in school-related tasks.",
                },
                {
                  icon: <FaHeart className="text-red-500 text-2xl" />,
                  text: "Support overall development and quality of life.",
                },
              ].map((goal, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-lg shadow hover:shadow-md transition"
                >
                  <div className="flex items-start gap-4">
                    <div>{goal.icon}</div>
                    <p className="text-gray-700 text-sm">{goal.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="w-full lg:w-1/2">
              <img
                src={img2}
                alt="Occupational therapy goals"
                className="w-full h-auto rounded-xl shadow-md object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      <CTA />

      <Footer />
    </div>
  );
};

export default Occupational;
