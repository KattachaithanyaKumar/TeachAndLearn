import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../assets/logo-full.png";
import { navItems } from "../CONSTANTS";
import Button from "./Button";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-24 px-6 md:px-12 flex items-center justify-between z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md backdrop-blur-lg"
          : "bg-transparent text-white"
      }`}
    >
      {/* Logo */}
      <img src={logo} alt="logo" className="w-[160px] md:w-[200px]" />

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-4 items-center">
        <div className="flex items-center">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 text-gray-700 ${
                scrolled
                  ? " hover:bg-red-100 hover:text-red-600"
                  : "hover:text-orange-500"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Button variant="primary">Parent Login</Button>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`text-3xl ${
            scrolled ? "text-red-600" : "text-white"
          } transition-all duration-300`}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-24 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-6 z-50 md:hidden">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 font-medium text-gray-700 hover:text-red-600"
            >
              {item.label}
            </Link>
          ))}
          <Button variant="primary">Parent Login</Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
