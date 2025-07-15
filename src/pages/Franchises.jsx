import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFileSignature, FaBuilding } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Section from "../components/Section";
import teacherImg from "../assets/teacher-and-student.JPG";

const contactInfo = [
  {
    icon: <FaPhoneAlt className="text-2xl text-white" />,
    label: "Call Us 7/24",
    value: "+208-555-0112",
    highlight: true,
  },
  {
    icon: <FaEnvelope className="text-2xl text-white" />,
    label: "Make a Quote",
    value: "Infotech@example.com",
    highlight: true,
  }
];

const requirements = [
  "Must have access to a carpet area of at least 3000 sq ft",
  "₹ 15 lakhs Investment*",
  "Ready to be a part of Teach and Learn Family? Complete the form now",
];

const steps = [
  {
    icon: <FaPhoneAlt className="text-xl text-white" />,
    title: "Contact Our Team",
    description: "Submit required forms via email or phone to begin the franchise process",
  },
  {
    icon: <FaMapMarkerAlt className="text-xl text-white" />,
    title: "Finalize Location",
    description: "Work together to select a location that meets specific requirements",
  },
  {
    icon: <FaFileSignature className="text-xl text-white" />,
    title: "Sign Agreement",
    description: "Once the location is selected, sign an agreement outlining partnership terms and responsibilities",
  },
  {
    icon: <FaBuilding className="text-xl text-white" />,
    title: "Open Your Franchise",
    description: "Prepare for franchise opening with final program review and assistance with marketing and advertising",
  },
];

const Franchises = () => {
  return (
    <div>
      <Navbar />
           {/* Decorative animated background blobs */}
           <div
          className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl z-0 animated-blob-1"
          style={{
            background: 'linear-gradient(135deg, #fdba74 0%, #f87171 100%)',
            opacity: 0.6,
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-3xl z-0 animated-blob-2"
          style={{
            background: 'linear-gradient(135deg, #fca5a5 0%, #fbbf24 100%)',
            opacity: 0.6,
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-3xl z-0 animated-blob-3"
          style={{
            background: 'linear-gradient(135deg, #fca5a5 0%, #fbbf24 100%)',
            opacity: 0.6,
          }}
        />
      {/* Intro Section */}
      <Section
        className="relative px-4 sm:px-8 md:px-12 lg:px-20 py-0 overflow-hidden"
      >
        <div className="relative z-10 max-w-4xl mx-auto text-center py-16 sm:py-20 md:py-24 flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-red-500 via-orange-400 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
            Welcome to Our Franchise Opportunities!
          </h1>
          <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-5 leading-relaxed max-w-2xl mx-auto">
            We are committed to providing a <span className="font-semibold text-orange-600">safe, nurturing, and inclusive environment</span> where every child can thrive. Our team of experienced and qualified educators use <span className="font-semibold text-orange-600">research-backed teaching methods</span> to support children’s physical, social, emotional, and cognitive development. We also offer a range of specialized therapy services for children and adults, including <span className="font-semibold text-orange-600">physical therapy, behavioral therapy, and occupational therapy</span>.
          </p>
          <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Our <span className="font-semibold text-orange-600">School Readiness Program</span> prepares children for academic success and provides them with the foundational skills they need to succeed in school and beyond. At <span className="font-semibold text-orange-600">Teach and Learn</span>, we prioritize quality education and strong franchise support, making us the ideal partner for individuals looking to build a successful and rewarding business in early childhood education.
          </p>
        </div>
      </Section>

      {/* Steps Section */}
      <Section>
        <div className="max-w-7xl mx-auto py-8 px-2">
          <div className="flex flex-col md:flex-row items-stretch justify-between w-full gap-x-0 gap-y-8">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                {/* Step */}
                <div className="flex-1 flex flex-col items-center text-center px-2 py-4 md:py-0 md:px-6 min-w-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-xl mb-4 bg-gradient-to-br from-red-500 to-orange-500 mx-auto">
                    {step.icon}
                  </div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">Step {idx + 1}</div>
                  <div className="text-base md:text-lg font-bold mb-1 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    {step.title}
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 max-w-xs mx-auto">
                    {step.description}
                  </div>
                </div>
                {/* Dashed line between steps (desktop only) */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center h-0 relative w-0">
                    <div className="border-t-2 border-dashed border-orange-300 w-32 md:w-40 lg:w-56 xl:w-72" style={{ marginTop: '-32px' }} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Section>

      <div className="max-w-6xl mx-auto py-12 flex flex-row flex-wrap gap-8 items-stretch">

        {/* Left Card: Contact Info, Requirements, Image */}
        <div className="flex-1 flex flex-col bg-gradient-to-br from-orange-400 to-orange-300 rounded-2xl shadow-xl overflow-hidden min-w-[320px]">
          <div className="p-8 flex flex-col gap-6 flex-grow">
            {contactInfo.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 border-b border-orange-200 pb-6 mb-2 last:border-b-0 last:pb-0 last:mb-0">
                <div className="bg-orange-500 rounded-full p-3 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <div className="text-white text-sm font-medium opacity-80">{item.label}</div>
                  <div className={`text-lg font-bold ${item.highlight ? "text-white" : "text-orange-900"}`}>{item.value}</div>
                </div>
              </div>
            ))}
            <div className="mt-6">
              <h2 className="text-lg font-bold mb-2 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Franchise Requirements</h2>
              <ul className="list-disc list-inside text-white/90 text-base space-y-1 pl-2">
                {requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full h-48 md:h-56 bg-white flex items-end justify-center overflow-hidden">
            <img src={teacherImg} alt="Franchise support" className="object-cover w-full h-full rounded-b-2xl" />
          </div>
        </div>

        {/* Right Card: Heading, Subheading, Form */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Ready To Get Started?</h1>
          <p className="text-gray-500 mb-8">Contact us today to learn more about our services and how we can support you or your loved one’s growth and development.</p>
          <form
            className="space-y-6"
            onSubmit={e => {
              e.preventDefault();
              const form = e.target;
              const data = {
                name: form.name.value,
                email: form.email.value,
                mobile: form.mobile.value,
                location: form.location.value,
                comments: form.comments.value,
              };
              alert(`Thank you for your interest!\n\n${Object.entries(data).map(([k,v]) => `${k.charAt(0).toUpperCase() + k.slice(1)}: ${v}`).join("\n")}`);
              form.reset();
            }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Your Name*</label>
                <input type="text" id="name" name="name" required placeholder="Your Name" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 outline-none" />
              </div>
              <div className="flex-1">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Your Email*</label>
                <input type="email" id="email" name="email" required placeholder="Your Email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 outline-none" />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="mobile" className="block text-gray-700 font-medium mb-1">Mobile*</label>
                <input type="tel" id="mobile" name="mobile" required pattern="[0-9]{10,}" placeholder="Mobile Number" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 outline-none" />
              </div>
              <div className="flex-1">
                <label htmlFor="location" className="block text-gray-700 font-medium mb-1">Preferred Location*</label>
                <input type="text" id="location" name="location" required placeholder="Preferred Location" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 outline-none" />
              </div>
            </div>
            <div>
              <label htmlFor="comments" className="block text-gray-700 font-medium mb-1">Write Message*</label>
              <textarea id="comments" name="comments" rows={4} required placeholder="Write Message" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 outline-none resize-none"></textarea>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-3 rounded-xl transition text-lg flex items-center justify-center gap-2">Send Message <span aria-hidden>→</span></button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Franchises;
