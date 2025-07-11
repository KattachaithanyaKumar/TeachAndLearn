import React from "react";
import Button from "./Button";

const CTA = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-100 via-sky-100 to-emerald-100 m-10 p-10 rounded-2xl text-center shadow-md">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-teal-800">
        Nurturing Every Child's Potential
      </h1>
      <p className="text-gray-700 text-base md:text-lg mb-6 max-w-2xl mx-auto">
        Every child has unique strengths and abilities. Our dedicated team is
        here to support your child's growth with personalized care and proven
        programs that help them thrive.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <Button>Book an Assessment</Button>
        <Button>Explore Our School Readiness Program</Button>
      </div>
    </div>
  );
};

export default CTA;
