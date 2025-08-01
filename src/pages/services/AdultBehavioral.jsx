import React from "react";
import Section from "../../components/Section";
import CTA from "../../components/CTA";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import roomImg from "../../assets/room.jpg";
import facilityImg from "../../assets/facility.jpg";
import teacherImg from "../../assets/teacher-and-student.JPG";
import blob from "../../assets/blob2.png";

const sections = [
  {
    heading: "What is Behavioral Therapy?",
    text: `Behavioral therapy is a form of treatment that aims to help individuals change unwanted behaviors and develop more positive, adaptive behaviors. Our behavioral therapists work with adults to identify and address behaviors that may be interfering with their daily life, such as anxiety, depression, anger, addiction, and phobias.`,
    image: roomImg,
    alt: "Behavioral therapy room",
  },
  {
    heading: "Why Behavioral Therapy?",
    text: `Behavioral therapy can be highly effective for adults who are struggling with a range of issues. By working with a behavioral therapist, adults can learn how to manage their emotions, develop coping skills, and build a more positive outlook on life. Through behavioral therapy, adults can achieve a greater sense of control over their thoughts, feelings, and behaviors, leading to a better quality of life.`,
    image: facilityImg,
    alt: "Therapy facility",
  },
  {
    heading: "Importance of Early Intervention in Behavioral Therapy",
    text: `Behavioral therapy is a highly effective treatment option for adults struggling with mental health issues, improving relationships, developing coping skills, increasing self-awareness, and encouraging personal growth. By providing individuals with the tools they need to manage their emotions and behaviors, behavioral therapy can help adults lead healthier, more fulfilling lives, and reduce the risk of negative coping behaviors like substance abuse.`,
    image: teacherImg,
    alt: "Therapist and patient",
  },
  {
    heading: "Advantages of Behavioral Therapy",
    text: `There are many advantages to working with a behavioral therapist, including personalized treatment plans tailored to individual needs, access to evidence-based therapies and techniques, ongoing support and guidance throughout the therapy process, and improved mental health and well-being.`,
    image: facilityImg,
    alt: "Behavioral therapy advantages",
  },
];

const AdultBehavioral = () => {
  return (
    <div>
      <Navbar />
      <Header color={"#EDE9FE"}>
        <h1 className="text-4xl font-bold mb-4">
          Adult <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Behavioral Therapy</span>
        </h1>
        <div className="flex gap-2 items-center">
          <p>
            Evidence-based behavioral therapy for adults, supporting emotional well-being and positive life changes.
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

      <Footer />
    </div>
  );
};

export default AdultBehavioral; 