import React from "react";
import logo from "../assets/logo.png";
import { services } from "../CONSTANTS";

const Footer = ({ color }) => {
  return (
    <footer style={{ backgroundColor: color }} className="pt-16 px-4 md:px-12">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo and Description */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <img src={logo} alt="Logo" className="h-12 w-12 object-contain" />
            <div>
              <h1 className="text-xl font-semibold">Teach & Learn</h1>
              <p className="text-sm text-gray-600">Therapy Center</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm">
            Empowering children and adults to reach their full potential through
            comprehensive therapy services.
          </p>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Services</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            {services.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Contact</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>+91 9876543210</li>
            <li>info@teachandlearn.com</li>
            <li>Hyderabad, India</li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Hours</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Mon - Fri: 9:00 AM - 6:00 PM <br />
            Sat: 9:00 AM - 2:00 PM <br />
            Sun: Closed
          </p>
        </div>
      </div>

      {/* Credits */}
      <div className="mt-12 text-center text-xs text-gray-500">
        {/* © {new Date().getFullYear()} Teach & Learn Therapy Center. All rights
        reserved. <br /> */}
        Asset credits: Illustrations by{" "}
        <a
          href="https://pikkovia.com"
          className="underline hover:text-blue-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pikkovia
        </a>
        , Icons from{" "}
        <a
          href="https://www.flaticon.com/"
          className="underline hover:text-blue-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          Flaticon
        </a>
        .
      </div>
    </footer>
  );
};

export default Footer;
