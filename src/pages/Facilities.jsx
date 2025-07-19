import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Section from "../components/Section";
import Wave from "../components/Wave";
import facilityImg from "../assets/facility.jpg";
import roomImg from "../assets/room.jpg";
import occupationalImg from "../assets/occupational.jpg";
import whyUsImg from "../assets/why-us.jpg";

const FACILITIES = [
  {
    title: "Therapy Rooms",
    img: roomImg,
    description:
      "Our therapy rooms are purpose-built to create an optimal environment for delivering therapy services that cater to the unique needs of each child. Our highly trained therapists leverage these resources to deliver a wide range of services, including behavioral therapy, speech therapy, physical therapy, and occupational therapy, all tailored to meet the unique needs of each child. In addition, we offer private therapy rooms for families who seek a more personalized approach to care.",
    bg: "#FFF7E6",
  },
  {
    title: "Play Areas",
    img: facilityImg,
    description:
      "We recognize the importance of physical activity in promoting children’s growth and development. That’s why we have created both indoor and outdoor play areas that are safe, secure, and designed to encourage children’s natural curiosity and love for play. Our indoor play area is also equipped with specialized equipment and materials that support occupational and physical therapies, providing a safe and stimulating space for children to develop their motor skills and build their strength. Together, our play areas represent our commitment to creating an inclusive, nurturing environment where children can thrive.",
    bg: "#E0F2FE",
  },
  {
    title: "Parent Lounge",
    img: occupationalImg,
    description:
      "Our parent lounge is a comfortable and private space where parents can relax and wait for their child during therapy sessions. We provide refreshments and reading materials to make your wait more enjoyable.",
    bg: "#F3F4F6",
  },
];

const Facilities = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="pt-24">
        <header className="text-center mb-12 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-orange-600">Our Facilities</h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            We provide a nurturing, safe, and professional environment designed to support every child's and family's needs. Explore our thoughtfully designed spaces below.
          </p>
        </header>
        {FACILITIES.map((facility, idx) => (
          <div key={facility.title} className="relative">
            <Section color={facility.bg}>
              <div
                className={`flex flex-col md:flex-row items-center gap-10 w-full max-w-5xl mx-auto ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                style={idx === FACILITIES.length - 1 ? {} : { paddingBottom: "70px" }}
              >
                <div className="md:w-1/2 w-full flex justify-center">
                  <img
                    src={facility.img}
                    alt={facility.title}
                    className="rounded-2xl shadow-lg object-cover w-full max-w-md h-64 md:h-80"
                  />
                </div>
                <div className="md:w-1/2 w-full">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">{facility.title}</h2>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">{facility.description}</p>
                </div>
              </div>
            </Section>
            {idx < FACILITIES.length - 1 && (
              <Wave
                color={FACILITIES[idx + 1].bg}
                flip={true}
              />
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
  
};

export default Facilities;

