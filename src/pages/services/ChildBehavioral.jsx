import React from "react";

import img1 from "../../assets/teacher-and-student.JPG";
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
  FaUsers,
  FaBrain,
  FaSmile,
  FaRegClock,
  FaChartLine,
  FaCheckCircle,
  FaShieldAlt,
  FaBalanceScale,
  FaHeart,
} from "react-icons/fa";

const therapyBenefits = [
  {
    icon: <FaCheckCircle className="text-green-500 text-2xl" />,
    title: "Develop Healthy Coping Mechanisms",
    description:
      "Helps children learn to manage stress and emotions in a healthy way.",
  },
  {
    icon: <FaUsers className="text-blue-500 text-2xl" />,
    title: "Improve Social and Communication Skills",
    description:
      "Enhances the ability to interact effectively with others and build relationships.",
  },
  {
    icon: <FaBrain className="text-purple-500 text-2xl" />,
    title: "Develop Positive Thought Patterns",
    description:
      "Encourages optimistic thinking and a positive outlook on life.",
  },
  {
    icon: <FaSmile className="text-yellow-500 text-2xl" />,
    title: "Address a Wide Range of Behavioral Concerns",
    description:
      "Effective for anxiety, depression, anger management, and disruptive behavior.",
  },
  {
    icon: <FaShieldAlt className="text-red-500 text-2xl" />,
    title: "Safe and Supportive Environment",
    description:
      "A secure space for children to explore emotions and develop new skills.",
  },
  {
    icon: <FaHeart className="text-pink-500 text-2xl" />,
    title: "Develop Healthy Habits and Behaviors",
    description:
      "Lays the foundation for a lifetime of positive habits and well-being.",
  },
];

const ChildBehavioral = () => {
  return (
    <div>
      <Navbar />
      <Header color={"#E0F2FE"}>
        <h1 className="text-4xl font-bold mb-4 text-center">
          Child{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Behavioral Therapy
          </span>
        </h1>
        <div className="flex gap-2 items-center justify-center">
          <p className="max-w-2xl text-lg sm:text-xl text-center">
            Evidence-based interventions to address behavioral challenges and promote positive behaviors.
          </p>
        </div>
      </Header>
      <Section>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Image */}
          <div className="flex-shrink-0">
            <img
              src={img1}
              alt="Behavioral Therapy Session"
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
              What is Behavioral Therapy?
            </h1>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              Behavioral therapy is a form of psychotherapy that focuses on
              modifying problematic behaviors and thoughts to improve a child’s
              functioning and quality of life. It is often used to treat
              behavioral disorders such as ADHD, oppositional defiant disorder,
              and conduct disorder. Our behavioral therapists work with
              children and their families to develop personalized treatment
              plans that address the child’s specific needs and goals.
            </p>
          </div>
        </div>
      </Section>

      <Section color={"#f9fafb"}>
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Advantages of Behavioral Therapy
            </h2>
            <p className="text-gray-600 mt-2 text-base sm:text-lg max-w-2xl mx-auto">
              The positive effects of behavioral therapy on children's emotional
              and behavioral well-being are numerous.
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
              Importance of Early Intervention
            </h2>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              Early intervention in behavioral therapy is essential in
              preventing more serious behavioral issues from developing later
              in life. Our behavioral therapists work with children as early as
              possible to address any behavioral concerns and provide targeted

              interventions. By identifying and addressing problematic
              behaviors early on, we can help children develop healthy coping
              mechanisms, social skills, and emotional regulation techniques to
              prevent more significant issues in the future.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-[#f9fafb] py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Text */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center lg:text-left">
              Why Behavioral Therapy?
            </h2>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              At our child development center, we understand the importance of
              conducting a thorough behavioral assessment to identify the
              child’s unique needs and challenges. Our behavioral therapists
              use a variety of tools and techniques, such as interviews,
              observations, and standardized assessments, to gain a
              comprehensive understanding of the child’s behavior and
              functioning. This assessment is used to develop an individualized
              treatment plan that addresses the child’s specific needs and
              goals.
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

export default ChildBehavioral;
