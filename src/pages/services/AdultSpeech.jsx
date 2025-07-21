import React from "react";
import Section from "../../components/Section";
import CTA from "../../components/CTA";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import speechImg from "../../assets/speech.png";
import disorderImg from "../../assets/Speach-Therapy-Disorder.jpg";
import teacherImg from "../../assets/teacher-and-student.JPG";
import blob from "../../assets/blob3.png";

const sections = [
  {
    heading: "What is Speech Therapy?",
    text: `Speech therapy is a form of treatment that aims to improve a person’s ability to communicate effectively. Our speech therapists work with adults to identify and treat any issues that may be affecting their ability to communicate, including articulation disorders, fluency disorders, voice disorders, and language disorders.`,
    image: speechImg,
    alt: "Speech therapy session",
  },
  {
    heading: "Why Speech Therapy?",
    text: `By working with a speech therapist, adults can improve their communication skills and feel more confident in their ability to express themselves effectively. The ability to communicate effectively is crucial for personal and professional success. Poor communication skills can lead to misunderstandings, social isolation, and even mental health issues like anxiety and depression. Speech therapy can help adults overcome these challenges and improve their quality of life by enhancing communication skills, improving confidence and self-esteem, strengthening interpersonal relationships, facilitating better educational and employment opportunities, and promoting overall well-being.`,
    image: disorderImg,
    alt: "Speech therapy disorders",
  },
  {
    heading: "Importance of Speech Therapy",
    text: `The ability to communicate effectively is crucial for personal and professional success. Poor communication skills can lead to misunderstandings, social isolation, and even mental health issues like anxiety and depression. Speech therapy can help adults overcome these challenges and improve their quality of life.`,
    image: teacherImg,
    alt: "Speech therapist and adult",
  },
  {
    heading: "Advantages of Speech Therapy",
    text: `There are many advantages to working with a speech therapist, including personalized treatment plans tailored to individual needs, access to evidence-based therapies and techniques, ongoing support and guidance throughout the therapy process, and improved communication skills and quality of life.`,
    image: speechImg,
    alt: "Speech therapy advantages",
  },
];

const AdultSpeech = () => {
  return (
    <div>
      <Navbar />
      <Header color={"#EDE9FE"}>
        <h1 className="text-4xl font-bold mb-4">
          Adult <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Speech Therapy</span>
        </h1>
        <div className="flex gap-2 items-center">
          <p>
            Specialized speech therapy for adults, enhancing communication, confidence, and quality of life.
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

export default AdultSpeech; 