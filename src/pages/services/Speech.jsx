import React from "react";

import img1 from "../../assets/speech.png";
import blob from "../../assets/blob3.png";
import ageGroupImage from "../../assets/speech-ages.png";
import disordersImage from "../../assets/Speach-Therapy-Disorder.jpg";

import Section from "../../components/Section";
import CTA from "../../components/CTA";
import Footer from "../../components/Footer";

import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import {
  FaComments,
  FaChild,
  FaChalkboardTeacher,
  FaMicrophone,
  FaAssistiveListeningSystems,
  FaHandsHelping,
  FaRobot,
  FaUserShield,
  FaBrain,
  FaSmile,
  FaUserFriends,
} from "react-icons/fa";

import { GiBabyBottle, GiSchoolBag } from "react-icons/gi";
import { FaCommentDots } from "react-icons/fa"; // <-- Use this instead of GiTalking

import { MdAccessibility, MdRecordVoiceOver } from "react-icons/md";

const ageGroups = [
  {
    icon: <GiBabyBottle className="text-pink-400 text-2xl" />,
    title: "Infants and Toddlers",
    description:
      "Early speech therapy addresses infant/toddler developmental delays, feeding issues, and communication disorders, with SLPs collaborating with parents for early skill support.",
  },
  {
    icon: <FaCommentDots className="text-yellow-500 text-2xl" />,
    title: "Preschool-Aged Children",
    description:
      "This age group gets speech therapy for sound disorders, language delays, articulation, stuttering, and early social skills for school readiness.",
  },

  {
    icon: <GiSchoolBag className="text-blue-500 text-2xl" />,
    title: "School-Aged Children",
    description:
      "Speech therapy for school-aged children improves language, articulation, social communication, literacy, and academic success, addressing challenges in learning and classroom participation.",
  },
];

const speechDisorders = [
  "Articulation Disorder",
  "Phonological Disorder",
  "Apraxia of Speech",
  "Dysarthria",
  "Stuttering (Fluency Disorder)",
  "Voice Disorder",
  "Cluttering",
  "Childhood Apraxia of Speech",
  "Dysprosody",
  "Mutism",
];

const therapyBenefits = [
  {
    icon: <FaComments className="text-red-500 text-2xl" />,
    title: "Improved Communication Skills",
    description:
      "Addresses sound errors, language delays, and disorders for clearer expression of thoughts and ideas.",
  },
  {
    icon: <FaChalkboardTeacher className="text-orange-500 text-2xl" />,
    title: "Enhanced Language Development",
    description: "Improves both verbal and non-verbal communication abilities.",
  },
  {
    icon: <FaSmile className="text-yellow-500 text-2xl" />,
    title: "Increased Confidence",
    description:
      "Boosts self-confidence in social, academic, and professional settings.",
  },
  {
    icon: <MdAccessibility className="text-green-500 text-2xl" />,
    title: "Better Swallowing and Feeding",
    description:
      "Helps with safe, efficient swallowing to prevent aspiration and support nutrition.",
  },
  {
    icon: <MdRecordVoiceOver className="text-blue-500 text-2xl" />,
    title: "Management of Voice Disorders",
    description:
      "Improves vocal quality, pitch, and loudness for comfortable speech.",
  },
  {
    icon: <FaCommentDots className="text-yellow-500 text-2xl" />,
    title: "Treatment for Fluency Disorders",
    description:
      "Supports individuals who stutter to improve fluency and confidence.",
  },
  {
    icon: <FaBrain className="text-purple-500 text-2xl" />,
    title: "Support for Cognitive-Communication Skills",
    description:
      "Enhances memory, attention, and problem-solving in individuals with cognitive impairments.",
  },
  {
    icon: <FaChild className="text-pink-500 text-2xl" />,
    title: "Early Intervention for Children",
    description:
      "Boosts early language development, aiding academic and social success.",
  },
  {
    icon: <FaRobot className="text-emerald-500 text-2xl" />,
    title: "Assistive Technology Implementation",
    description:
      "Empowers limited speech individuals with AAC devices for effective communication.",
  },
  {
    icon: <FaUserShield className="text-sky-500 text-2xl" />,
    title: "Individualized Treatment Plans",
    description:
      "Tailored strategies ensure focused interventions and progress tracking.",
  },
  {
    icon: <FaUserFriends className="text-violet-500 text-2xl" />,
    title: "Support for Families and Caregivers",
    description:
      "Guides families and caregivers to effectively support communication and swallowing needs.",
  },
];

const Speech = () => {
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
              Helping Communicate Effectively
            </h1>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              It is an essential intervention for children who struggle with
              communication. It can be used to treat various developmental
              disorders, such as autism, Down syndrome, and hearing impairment.
              Speech therapy is vital in helping children develop the necessary
              skills to participate fully in daily life, succeed academically,
              and socially. Our speech therapists provide targeted interventions
              to address a child’s individual needs and help them achieve their
              full potential.
            </p>
          </div>
        </div>
      </Section>

      <Section color={"#f9fafb"}>
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Why Speech Therapy Matters
            </h2>
            <p className="text-gray-600 mt-2 text-base sm:text-lg max-w-2xl mx-auto">
              Discover the many ways speech therapy supports communication,
              confidence, and quality of life.
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
              src={ageGroupImage}
              alt="Speech therapy by age group"
              className="w-full h-auto rounded-xl shadow-md object-cover"
            />
          </div>

          {/* Age Group Cards */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center lg:text-left">
              Client Age Groups
            </h2>
            <div className="space-y-6">
              {ageGroups.map((group, idx) => (
                <div
                  key={idx}
                  className="bg-[#f1f5f9] p-6 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <span className="flex gap-2 items-center">
                    <div className="mb-4">{group.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {group.title}
                    </h3>
                  </span>
                  <p className="text-gray-700 text-sm">{group.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-[#f9fafb] py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Top: Centered Heading and Paragraph */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Names of Speech Disorders
            </h2>
            <p className="text-gray-700 text-base max-w-3xl mx-auto">
              SLPs work with individuals who have difficulties producing speech
              sounds, such as articulation disorders (errors in pronunciation),
              phonological disorders (sound patterns affecting speech clarity),
              apraxia of speech (difficulty coordinating speech movements), and
              dysarthria (muscle weakness affecting speech). They also address
              fluency and voice-related conditions.
            </p>
          </div>

          {/* Bottom: Grid of [disorders | image | disorders] */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Left Disorders */}
            <div className="space-y-4">
              {speechDisorders.slice(0, 5).map((name, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-lg p-4 text-gray-800 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <FaMicrophone className="text-indigo-500" />
                    <span>{name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Center Image */}
            <div className="w-full">
              <img
                src={disordersImage}
                alt="Various types of speech disorders"
                className="w-full h-auto rounded-xl shadow-md object-cover"
              />
            </div>

            {/* Right Disorders */}
            <div className="space-y-4">
              {speechDisorders.slice(5).map((name, idx) => (
                <div
                  key={idx + 5}
                  className="bg-white border border-gray-200 rounded-lg p-4 text-gray-800 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <FaMicrophone className="text-indigo-500" />
                    <span>{name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <CTA />

      <Footer />
    </div>
  );
};

export default Speech;
