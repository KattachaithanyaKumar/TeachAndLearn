import React from "react";
import Section from "../../components/Section";
import CTA from "../../components/CTA";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import physicalImg from "../../assets/Occupational-Therapy-1-1.jpg";
import roomImg from "../../assets/room.jpg";
import facilityImg from "../../assets/facility.jpg";
import blob from "../../assets/blob2.png";

const sections = [
  {
    heading: "What is Physical Therapy?",
    text: `Physical therapy is a specialized branch of healthcare that focuses on the restoration of physical function, reduction of pain, and prevention of disability through the utilization of various techniques such as exercise and manual therapy. Our skilled physical therapists work closely with adult patients to develop personalized treatment plans that effectively address a diverse range of conditions, such as sports injuries, back pain, arthritis, stroke, and neurological disorders.`,
    image: physicalImg,
    alt: "Physical therapy session",
  },
  {
    heading: "Why Physical Therapy?",
    text: `Physical therapy has been demonstrated to effectively enhance mobility, strength, and flexibility while reducing pain and minimizing the need for medication or surgical intervention. Physical therapists also aid individuals in preventing future injuries or disabilities, as well as managing chronic conditions such as diabetes or heart disease. By designing tailored treatment plans, physical therapy can assist adults in attaining their objectives and sustaining an active and healthy lifestyle.`,
    image: roomImg,
    alt: "Physical therapy room",
  },
  {
    heading: "Importance of Individualized Physical Therapy",
    text: `Physical therapy helps adults maintain and improve their physical function, independence, and quality of life. By providing individualized treatment plans, physical therapists can help adults recover from injuries, manage chronic conditions, and prevent future health problems. Physical therapy can also help individuals reduce their risk of falls, improve balance and coordination, and manage pain without relying on medications or surgery.`,
    image: facilityImg,
    alt: "Physical therapy facility",
  },
  {
    heading: "Advantages of Physical Therapy",
    text: `Physical therapy can help individuals recover from injuries or surgeries more quickly, reducing the need for hospitalization or ongoing medical care. It can also help adults manage chronic conditions like arthritis or diabetes, reducing the risk of complications and improving overall health. Through physical therapy, individuals can also learn how to prevent injuries and maintain a healthy lifestyle, improving their overall quality of life.`,
    image: physicalImg,
    alt: "Physical therapy advantages",
  },
];

const Physical = () => {
  return (
    <div>
      <Navbar />
      <Header color={"#EDE9FE"}>
        <h1 className="text-4xl font-bold mb-4">
          Adult <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Physical Therapy</span>
        </h1>
        <div className="flex gap-2 items-center">
          <p>
            Restore function, reduce pain, and improve quality of life with expert physical therapy for adults.
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

export default Physical; 