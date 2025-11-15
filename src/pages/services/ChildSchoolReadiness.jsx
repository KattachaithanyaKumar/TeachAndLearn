import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Section from "../../components/Section";
import CTA from "../../components/CTA";
import img1 from "../../assets/teacher-and-student.JPG";
import img2 from "../../assets/why-us.jpg";
import blob from "../../assets/blob.png";
import {
  FaChild,
  FaUsers,
  FaPaintBrush,
  FaPuzzlePiece,
  FaSchool,
  FaHandsHelping,
  FaBook,
  FaComments,
  FaPenFancy,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserFriends,
} from "react-icons/fa";

const keyComponents = [
  {
    icon: <FaChild className="text-indigo-500 text-2xl" />,
    title: "Group Readiness Skills",
    description:
      "Developing skills to participate effectively in group settings.",
  },
  {
    icon: <FaBook className="text-yellow-500 text-2xl" />,
    title: "Early Academics",
    description: "Engaging in foundational academic concepts.",
  },
  {
    icon: <FaUsers className="text-blue-500 text-2xl" />,
    title: "Social Skills",
    description: "Enhancing interaction and communication with peers.",
  },
  {
    icon: <FaPenFancy className="text-green-500 text-2xl" />,
    title: "Fine Motor Skills",
    description: "Improving hand and finger coordination for tasks like writing.",
  },
  {
    icon: <FaComments className="text-pink-500 text-2xl" />,
    title: "Language and Communication",
    description: "Developing verbal and non-verbal communication abilities.",
  },
];

const howWeDoIt = [
  {
    icon: <FaChalkboardTeacher className="text-indigo-500 text-2xl" />,
    title: "Individual Educational Plan (IEP)",
    description: "A customized plan is created for each child to address their unique strengths and challenges."
  },
  {
    icon: <FaUserFriends className="text-yellow-500 text-2xl" />,
    title: "Collaborative Approach",
    description: "Our team of specialists, including teachers, occupational therapists, and speech therapists, work together on the IEP."
  },
  {
    icon: <FaHandsHelping className="text-green-500 text-2xl" />,
    title: "Harnessing Strengths",
    description: "The personalized plan is designed to build on each child's strengths to help them achieve their goals."
  }
]

const goals = [
  {
    icon: <FaUserGraduate className="text-indigo-500 text-2xl" />,
    text: "Provide students with the skills to succeed in mainstream educational settings."
  },
  {
    icon: <FaSchool className="text-pink-500 text-2xl" />,
    text: "Promote a seamless transition to mainstream education."
  },
  {
    icon: <FaPuzzlePiece className="text-green-500 text-2xl" />,
    text: "Offer adaptable and flexible full-time and part-time programs."
  }
]

const ChildSchoolReadiness = () => {
  return (
    <div>
      <Navbar />
      <Header color={"#E0F2FE"}>
        <h1 className="text-4xl font-bold mb-4 text-center">
          School Readiness{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Program
          </span>
        </h1>
        <div className="flex gap-2 items-center justify-center">
          <p className="max-w-2xl text-lg sm:text-xl text-center">
            A customized intervention program to help children with unique
            learning and behavioral challenges transition into mainstream
            schooling.
          </p>
        </div>
      </Header>

      <Section>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <img
              src={img1}
              alt="teacher and student"
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
          <div className="max-w-xl text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What is the School Readiness Program?
            </h1>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              The School Readiness Program is a customized intervention program
              designed to aid children with distinctive learning and behavioral
              challenges in transitioning into mainstream schooling. To
              optimize each child’s potential, we have a team of highly
              motivated and qualified educators, speech therapists, and
              occupational therapists who conduct group sessions as part of our
              comprehensive program.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Who Is It For?
            </h2>
            <p className="text-gray-600 text-base max-w-3xl mx-auto">
              The SRP is designed for children who need extra support to develop
              various skills for a smooth transition to school.
            </p>
          </div>
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
        <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
          <div className="flex-shrink-0">
            <img
              src={img2}
              alt="Why us"
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
          <div className="max-w-xl text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              How Are We Different?
            </h1>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              Our SRP features a personalized and dynamic multidisciplinary
              approach with low student-to-teacher ratios and integrated speech
              therapy. We boast a highly trained staff and on-site access to a
              range of specialists, including speech and language therapists,
              occupational therapists, psychological and educational
              therapists, and specialist teachers.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              How Do We Do It?
            </h2>
            <p className="text-gray-600 text-base max-w-3xl mx-auto">
              We devise a customized individual educational plan (IEP) for each child.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {howWeDoIt.map((item, idx) => (
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

      <Section className="bg-[#f9fafb] py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Would Be Next for Your Child?
            </h2>
            <p className="text-gray-600 text-base max-w-3xl mx-auto">
              The primary objective of the SRP is to provide students with the requisite skills to successfully participate in mainstream educational settings.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 space-y-6">
              {goals.map((goal, idx) => (
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
            <div className="w-full lg:w-1/2">
              <img
                src={img1}
                alt="Goals"
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

export default ChildSchoolReadiness;