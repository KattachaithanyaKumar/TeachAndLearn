import React from "react";

const Wave = ({ color = "#ffffff", className = "", flip = false, height = 100 }) => {
  return (
    <svg
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      className={`block w-full ${flip ? "rotate-180" : ""} ${className}`}
      style={{ height }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        d="M0,64L60,80C120,96,240,128,360,128C480,128,600,96,720,74.7C840,53,960,43,1080,58.7C1200,75,1320,117,1380,138.7L1440,160L1440,0L0,0Z"
      />
    </svg>
  );
};

export default Wave;
