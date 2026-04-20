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

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-24 gap-3 px-6 md:px-12 flex items-center justify-between z-50 transition-all duration-300 ${scrolled
        ? "bg-white shadow-md backdrop-blur-lg"
        : "bg-transparent text-white"
        }`}
    >
      {/* Logo — links home */}
      <Link
        to="/"
        className="flex shrink-0 items-center"
        onClick={() => setMenuOpen(false)}
        aria-label="Teach and Learn — Home"
      >
        <img
          src={logo}
          alt=""
          className="h-8 w-auto max-w-[min(160px,42vw)] sm:h-9 sm:max-w-[180px] lg:h-11 lg:max-w-[200px]"
        />
      </Link>

      {/* Desktop Nav — lg+; nav scrolls horizontally if tight so Parent Login never clips */}
      <div className="hidden min-w-0 flex-1 items-center justify-end gap-2 xl:gap-4 lg:flex">
        <nav className="flex min-w-0 max-w-full flex-1 flex-nowrap items-center justify-end gap-x-1 overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden xl:gap-x-0">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`shrink-0 whitespace-nowrap px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 text-gray-700 xl:px-4 xl:text-base ${scrolled
                ? " hover:bg-red-100 hover:text-red-600"
                : "hover:text-orange-500"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button
          variant="primary"
          className="shrink-0 whitespace-nowrap"
          onClick={() => window.open("https://www.silverriver.schoolbridge.in", "_blank")}
        >
          Parent Login
        </Button>
      </div>

      {/* Mobile / tablet menu toggle */}
      <div className="flex items-center lg:hidden">
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
          className={`text-2xl transition-all duration-300 sm:text-3xl ${scrolled ? "text-red-600" : "text-gray-900"
            }`}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div
          id="mobile-nav-menu"
          className="absolute left-0 top-16 flex max-h-[calc(100dvh-4rem)] w-full flex-col items-center gap-3 overflow-y-auto bg-white py-5 shadow-md sm:top-20 sm:max-h-[calc(100dvh-5rem)] lg:hidden"
        >
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
          <Button variant="primary" onClick={() => window.open("https://www.silverriver.schoolbridge.in", "_blank")}>Parent Login</Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
