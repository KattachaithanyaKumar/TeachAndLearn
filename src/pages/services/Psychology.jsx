import React from "react";
import Section from "../../components/Section";
import CTA from "../../components/CTA";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import facilityImg from "../../assets/facility.jpg";
import roomImg from "../../assets/room.jpg";
import teacherImg from "../../assets/teacher-and-student.JPG";
import blob from "../../assets/blob3.png";

const sections = [
  {
    heading: "What is Psychiatry?",
    text: `Our psychiatrists specialize in diagnosing, treating, and preventing mental illnesses and disorders in adults. They are medical doctors who have undergone extensive training to understand the complexities of the human mind and behavior, and how these interact with physical health. We work with adult patients to develop personalized treatment plans that address a wide range of mental health conditions, including anxiety, depression, bipolar disorder, schizophrenia, and substance use disorders.`,
    image: facilityImg,
    alt: "Psychiatry consultation facility",
  },
  {
    heading: "Why Psychiatry?",
    text: `Mental health conditions can significantly impact an individual’s overall well-being and quality of life. Our psychiatrists are trained to provide effective treatments for mental health conditions and help individuals manage their symptoms, improve their mental health, and lead fulfilling lives. Seeking psychiatric care can also help identify and address underlying mental health conditions that may be contributing to physical health problems.`,
    image: roomImg,
    alt: "Therapy room",
  },
  {
    heading: "Importance of Psychiatry",
    text: `Psychiatric care is crucial in promoting mental health and well-being for adults. Our psychiatrists work with patients to develop individualized treatment plans that address their unique needs, including medication management, therapy, and lifestyle changes. With proper treatment, individuals can improve their mental health, better manage their symptoms, and improve their overall quality of life.`,
    image: teacherImg,
    alt: "Therapist and patient",
  },
  {
    heading: "Advantages of Psychiatry",
    text: `Our team provides compassionate care and personalized treatment plans tailored to the unique needs of each patient. With our expertise in treating mental health conditions, patients can benefit from improved mental health, reduced symptoms, and a better quality of life. In addition, seeking psychiatric care can help individuals identify and address underlying mental health conditions that may be contributing to physical health problems.`,
    image: facilityImg,
    alt: "Psychiatry advantages",
  },
];

const Psychology = () => {
  return (
    <div>
      <Navbar />
      <Header color={"#EDE9FE"}>
        <h1 className="text-4xl font-bold mb-4">
          Adult <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Psychiatry & Psychology</span>
        </h1>
        <div className="flex gap-2 items-center">
          <p>
            Comprehensive psychiatric and psychological care for adults, focusing on mental health, well-being, and personal growth.
          </p>
        </div>
      </Header>

      {sections.map((section, idx) => (
        <Section key={idx} color={idx % 2 === 1 ? "#f9fafb" : undefined}>
          <div className={`max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
            {/* Image */}
            <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
              <img
                src={section.image}
                alt={section.alt}
                className="w-80 h-80 md:w-96 md:h-96 shadow-2xl object-cover"
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
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-orange-600 mb-4">
                {section.heading}
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {section.text}
              </p>
            </div>
          </div>
        </Section>
      ))}

      <CTA />
      <Footer />
    </div>
  );
};

export default Psychology; 