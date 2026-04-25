import React from "react";

const Section = ({ children, color, className = "" }) => {
  return (
    <section
      style={{ backgroundColor: color }}
      className={`relative px-6 py-20 flex justify-center items-center overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;
