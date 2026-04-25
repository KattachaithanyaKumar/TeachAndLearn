import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import logoMark from "../assets/bg logo .png";
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
    <>
      <div
        className={`fixed top-0 left-0 w-full gap-3 px-6 md:px-12 flex items-center justify-between z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md backdrop-blur-lg" : "bg-transparent text-white"
        } ${scrolled ? "h-16" : "h-24"}`}
      >
        {/* Logo — links home */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 sm:gap-3"
          onClick={() => setMenuOpen(false)}
          aria-label="Teach And Learn — Home"
        >
          <img
            src={logoMark}
            alt=""
            width={44}
            height={44}
            className={`shrink-0 object-contain transition-all duration-300 ${
              scrolled
                ? "h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10"
                : "h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11"
            }`}
          />
          <span
            className={`font-bold tracking-tight transition-all duration-300 ${
              scrolled ? "text-sm sm:text-base lg:text-lg" : "text-base sm:text-lg lg:text-xl"
            } ${
              scrolled
                ? "bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent opacity-100"
                : "bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent opacity-70"
            }`}
          >
            Teach And Learn
          </span>
        </Link>

        {/* Desktop Nav — lg+; nav scrolls horizontally if tight so Parent Login never clips */}
        <div className="hidden min-w-0 flex-1 items-center justify-end gap-2 xl:gap-4 lg:flex">
          <nav className="flex min-w-0 max-w-full flex-1 flex-nowrap items-center justify-end gap-x-1 overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden xl:gap-x-0">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`shrink-0 whitespace-nowrap px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 text-gray-700 xl:px-4 xl:text-base ${
                  scrolled ? " hover:bg-red-100 hover:text-red-600" : "hover:text-orange-500"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile / tablet menu toggle */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
            className={`text-2xl transition-all duration-300 sm:text-3xl ${
              scrolled ? "text-red-600" : "text-gray-900"
            }`}
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile drawer + backdrop (dismiss on backdrop tap) */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          className={`absolute right-0 top-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-24 px-6 flex items-center justify-between border-b border-gray-100">
            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
              aria-label="Teach And Learn — Home"
            >
              <img
                src={logoMark}
                alt=""
                width={40}
                height={40}
                className="h-9 w-9 shrink-0 object-contain"
              />
              <span className="font-bold tracking-tight text-base bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Teach And Learn
              </span>
            </Link>
            <button
              type="button"
              className="text-2xl text-gray-800"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <HiX />
            </button>
          </div>

          <nav className="flex h-[calc(100dvh-6rem)] flex-col gap-2 overflow-y-auto px-6 py-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-medium text-gray-800 hover:bg-red-50 hover:text-red-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
