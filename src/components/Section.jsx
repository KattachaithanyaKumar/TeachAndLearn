import React from "react";

const Section = ({ children, color }) => {
  return (
    <section
      style={{ backgroundColor: color }}
      className="relative px-6 py-20 flex justify-center items-center overflow-hidden"
    >
      {children}
    </section>
  );
};

export default Section;
