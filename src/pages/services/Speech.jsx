import React from "react";

import img1 from "../../assets/speech.png";
import blob from "../../assets/blob3.png";
import ageGroupImage from "../../assets/speech-ages.png";
import disordersImage from "../../assets/Speach-Therapy-Disorder.jpg";

import Section from "../../components/Section";
import CTA from "../../components/CTA";
import Footer from "../../components/Footer";

const ageGroups = [
  {
    title: "Infants and Toddlers",
    description:
      "Early speech therapy addresses infant/toddler developmental delays, feeding issues, and communication disorders, with SLPs collaborating with parents for early skill support.",
  },
  {
    title: "Preschool-Aged Children",
    description:
      "This age group gets speech therapy for sound disorders, language delays, articulation, stuttering, and early social skills for school readiness.",
  },
  {
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

const Speech = () => {
  return (
    <div>
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
            {[
              {
                title: "Improved Communication Skills",
                description:
                  "Addresses sound errors, language delays, and disorders for clearer expression of thoughts and ideas.",
              },
              {
                title: "Enhanced Language Development",
                description:
                  "Improves both verbal and non-verbal communication abilities.",
              },
              {
                title: "Increased Confidence",
                description:
                  "Boosts self-confidence in social, academic, and professional settings.",
              },
              {
                title: "Better Swallowing and Feeding",
                description:
                  "Helps with safe, efficient swallowing to prevent aspiration and support nutrition.",
              },
              {
                title: "Management of Voice Disorders",
                description:
                  "Improves vocal quality, pitch, and loudness for comfortable speech.",
              },
              {
                title: "Treatment for Fluency Disorders",
                description:
                  "Supports individuals who stutter to improve fluency and confidence.",
              },
              {
                title: "Support for Cognitive-Communication Skills",
                description:
                  "Enhances memory, attention, and problem-solving in individuals with cognitive impairments.",
              },
              {
                title: "Early Intervention for Children",
                description:
                  "Boosts early language development, aiding academic and social success.",
              },
              {
                title: "Assistive Technology Implementation",
                description:
                  "Empowers limited speech individuals with AAC devices for effective communication.",
              },
              {
                title: "Individualized Treatment Plans",
                description:
                  "Tailored strategies ensure focused interventions and progress tracking.",
              },
              {
                title: "Support for Families and Caregivers",
                description:
                  "Guides families and caregivers to effectively support communication and swallowing needs.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
              >
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
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {group.title}
                  </h3>
                  <p className="text-gray-700 text-sm">{group.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-[#f9fafb] py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Text + Disorders List */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center lg:text-left">
              Names of Speech Disorders
            </h2>
            <p className="text-gray-700 text-base mb-6">
              SLPs work with individuals who have difficulties producing speech
              sounds, such as articulation disorders (errors in pronunciation),
              phonological disorders (sound patterns affecting speech clarity),
              apraxia of speech (difficulty coordinating speech movements), and
              dysarthria (muscle weakness affecting speech). They also address
              fluency and voice-related conditions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {speechDisorders.map((name, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-lg p-4 text-gray-800 shadow-sm hover:shadow-md transition"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="flex-shrink-0 w-full lg:w-1/2">
            <img
              src={disordersImage}
              alt="Various types of speech disorders"
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

export default Speech;
