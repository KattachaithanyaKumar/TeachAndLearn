import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Section from "../components/Section";
import Button from "../components/Button";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";

import teacherImg from "../assets/teacher-and-student.JPG";

const contactDetails = [
  {
    icon: <FaPhoneAlt className="text-2xl text-white" />,
    label: "Hafeezpet CDC",
    value: "+91 98541 12555",
    highlight: true,
  },
  {
    icon: <FaPhoneAlt className="text-2xl text-white" />,
    label: "Kondapur CDC",
    value: "+91 98451 13555",
    highlight: true,
  },
  {
    icon: <FaEnvelope className="text-2xl text-white" />,
    label: "Email",
    value: "teachandlearnedu@gmail.com",
    highlight: false,
  },
  {
    icon: <IoMdTime className="text-2xl text-white" />,
    label: "Working Hours",
    value: "10:00 a.m. – 7:00 p.m.",
    highlight: false,
  },
];

const mainOffice = {
  title: "Main Office",
  address: "Satvika Residency, Vinayaka Nagar, Hafeezpet, Hyderabad, Telangana 500049",
};

const branch = {
  title: "Our Branch",
  address: "Sai Sigma 2, Madhava Hills Road No. 1, Opp. Arbor International School, Kondapur, Hyderabad, Telangana 500084",
};

const Contact = () => {
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
<Section className="bg-gray-50 py-20 px-6 sm:px-10 md:px-20">
  <div className="max-w-4xl mx-auto text-center">
    {/* Animated Gradient Heading */}
    <h1 className="text-5xl font-bold mb-10">
      <span className="inline-block bg-gradient-to-r from-red-600 via-orange-400 to-yellow-400 
        bg-clip-text text-transparent animate-gradient-x">
        Get in Touch
      </span>
    </h1>

    <p className="text-lg text-gray-600 mb-14 leading-relaxed">
      Have a question or need assistance? We’re here to help. Reach out using the details below and a team member will respond promptly.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {contactDetails.map((detail, index) => (
        <div
          key={index}
          className="rounded-2xl shadow-lg bg-white overflow-hidden border border-gray-200 cursor-pointer transition-transform duration-200 transform hover:-translate-y-2 hover:scale-105"
        >
          <div className="flex flex-row items-center justify-center gap-3 px-6 py-4 text-white font-semibold text-lg 
            bg-gradient-to-r from-red-600 via-orange-400 to-yellow-400 
            animate-gradient-x cursor-pointer"
          >
            <span className="flex justify-center">{detail.icon}</span>
            <span className="text-center">{detail.label}</span>
          </div>

          <div className="px-6 py-5 text-gray-800 text-base sm:text-lg break-words font-bold cursor-pointer">
            {detail.value}
          </div>
        </div>
      ))}
    </div>
  </div>
</Section>


      <div className="max-w-6xl mx-auto py-12 flex flex-row flex-wrap gap-8 items-stretch">
        {/* Left Card: Addresses, Image */}
        <div className="flex-1 flex flex-col bg-gradient-to-br from-orange-400 to-orange-300 rounded-2xl shadow-xl overflow-hidden min-w-[320px]
        bg-gradient-to-r from-red-600 via-orange-400 to-yellow-400 
            animate-gradient-x cursor-pointer">
          <div className="p-8 flex flex-col gap-6 flex-grow">
            <div className="mt-6">
              <h2 className="text-white font-bold">{mainOffice.title}</h2>
              <div className="flex items-start gap-3 mb-4">
                <FaMapMarkerAlt className="text-xl text-white mt-1" />
                <span className="text-white/90 text-base font-bold">{mainOffice.address}</span>
              </div>
              <h2 className="text-white font-bold">{branch.title}</h2>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-xl text-white mt-1" />
                <span className="text-white/90 text-base font-bold">{branch.address}</span>
              </div>
            </div>
          </div>
          <div className="w-full h-48 md:h-56 bg-white flex items-end justify-center overflow-hidden">
            <img src={teacherImg} alt="Contact support" className="object-cover w-full h-full rounded-b-2xl" />
          </div>
        </div>
        {/* Right Card: Contact Form */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Send Us a Message</h2>
          <p className="text-gray-500 mb-8">Fill out the form below and our team will get in touch with you soon.</p>
          <form
            className="space-y-6"
            onSubmit={e => {
              e.preventDefault();
              const form = e.target;
              const data = {
                name: form.name.value,
                contact: form.contact.value,
                email: form.email.value,
                message: form.message.value,
              };
              alert(`Thank you for reaching out!\n\n${Object.entries(data).map(([k,v]) => `${k.charAt(0).toUpperCase() + k.slice(1)}: ${v}`).join("\n")}`);
              form.reset();
            }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Full Name*</label>
                <input type="text" id="name" name="name" required placeholder="Full Name" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 outline-none" />
              </div>
              <div className="flex-1">
                <label htmlFor="contact" className="block text-gray-700 font-medium mb-1">Contact Number*</label>
                <input type="tel" id="contact" name="contact" required pattern="[0-9]{10,}" placeholder="Contact Number" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 outline-none" />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email*</label>
                <input type="email" id="email" name="email" required placeholder="Email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 outline-none" />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Message*</label>
              <textarea id="message" name="message" rows={4} required placeholder="Write your message" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 outline-none resize-none"></textarea>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-3 rounded-xl text-lg flex items-center justify-center gap-2 transition-none hover:transition-none"
              style={{ transition: "none" }}
            >
              Send Message <span aria-hidden>→</span>
            </Button>
          </form>
        </div>
      </div>
      {/* Floating WhatsApp Button */}
      <a
        href="https://api.whatsapp.com/send/?phone=919854112555&text&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300 ease-in-out flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-6 h-6" />
      </a>

      <Footer />
    </div>
  );
};

export default Contact;
