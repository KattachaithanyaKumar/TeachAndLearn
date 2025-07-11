import React from "react";
import Wave from "./Wave";
import { Link } from "react-router-dom";

const Header = ({ color, children }) => {
  return (
    <section
      style={{ backgroundColor: color }}
      className={`py-44 relative overflow-hidden`}
    >
      <div className="flex justify-center items-center flex-col pb-20">
        {children}
      </div>

      <Wave color={"#fff"} />
    </section>
  );
};

export default Header;
