import React, { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FiPhone } from "react-icons/fi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";

import { allIcons} from "../CONSTANTS";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import SkeletonLoader from "../components/SkeletonLoader";
import child from "../assets/child-hero.png";
import about from "../assets/teacher-and-student.JPG";
import mask from "../assets/mask.png";
import dots from "../assets/dots.png";
import blob from "../assets/blob.png";
import plus from "../assets/plus.png";
import circles from "../assets/circles.svg";
import whyUsImg from "../assets/why-us.jpg";
import mask2 from "../assets/mask2.png";
import room from "../assets/room.jpg";
import mask3 from "../assets/mask3.png";
import star from "../assets/star.png";
import line from "../assets/line.png";
import blob2 from "../assets/blob2.png";
import sphere from "../assets/sphere.png";
import capsule from "../assets/capsule.png";
import zigzag from "../assets/zigzag.png";
import circleHalf from "../assets/circle-half.png";

import Carousel from "../components/Carousel";

import { getServices, getStatistics, getWhyUs, getTestimonials, getPhilosophy,getAboutUs } from "../network/api_service";
import Footer from "../components/Footer";

const Home = () => {
  // State for data
  const [services, setServices] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [whyUs, setWhyUs] = useState([]);
  const [aboutUs, setAboutUs] = useState({});

  // Loading states
  const [servicesLoading, setServicesLoading] = useState(true);
  const [statisticsLoading, setStatisticsLoading] = useState(true);
  const [whyUsLoading, setWhyUsLoading] = useState(true);
  const [ourPhilosophy, setOurPhilosophy] = useState([]);
  const [philosophyLoading, setPhilosophyLoading] = useState(true);
  const [aboutUsLoading, setAboutUsLoading] = useState(true);
  // Testimonials
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);

  // Error states
  const [servicesError, setServicesError] = useState(null);
  const [statisticsError, setStatisticsError] = useState(null);
  const [whyUsError, setWhyUsError] = useState(null);
  const [aboutUsError, setAboutUsError] = useState(null);
  const [philosophyError, setPhilosophyError] = useState(null);
  const [testimonialsError, setTestimonialsError] = useState(null);

  const fetchAboutUs = async () => {
    try {
      setAboutUsLoading(true);
      const aboutUsData = await getAboutUs();
      setAboutUs(aboutUsData[0]);
      console.log("Fetched About Us:", aboutUsData);
    } catch (error) {
      console.error("Error fetching about us:", error);
      setAboutUsError("Failed to load about us data");
    } finally {
      setAboutUsLoading(false);
    }
  }

  const fetchServices = async () => {
    try {
      setServicesLoading(true);
      setServicesError(null);
      const servicesData = await getServices();
      setServices(servicesData);
      console.log("Fetched Services:", servicesData);
      // Debug: Check if all icons exist
      servicesData.forEach(service => {
        if (!allIcons[service.icon]) {
          console.warn(`Icon "${service.icon}" not found for service: ${service.name}`);
        }
      });
    } catch (error) {
      console.error("Error fetching services:", error);
      setServicesError("Failed to load services");
    } finally {
      setServicesLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      setStatisticsLoading(true);
      setStatisticsError(null);
      const statsData = await getStatistics();
      setStatistics(statsData);
      console.log("Fetched Statistics:", statsData);
      // Debug: Check if all icons exist
      statsData.forEach(stat => {
        if (!allIcons[stat.icon]) {
          console.warn(`Icon "${stat.icon}" not found for statistic: ${stat.label}`);
        }
      });
    } catch (error) {
      console.error("Error fetching statistics:", error);
      setStatisticsError("Failed to load statistics");
    } finally {
      setStatisticsLoading(false);
    }
  };

  const fetchWhyUs = async () => {
    try {
      setWhyUsLoading(true);
      setWhyUsError(null);
      const whyUsData = await getWhyUs();
      setWhyUs(whyUsData);
      console.log("Fetched Why Us:", whyUsData);
      // Debug: Check if all icons exist
      if (whyUsData[0]?.approaches) {
        whyUsData[0].approaches.forEach(approach => {
          if (!allIcons[approach.icon]) {
            console.warn(`Icon "${approach.icon}" not found for approach: ${approach.label}`);
          }
        });
      }
    } catch (error) {
      console.error("Error fetching why us:", error);
      setWhyUsError("Failed to load why us data");
    } finally {
      setWhyUsLoading(false);
    }
  };

  const fetchPhilosophy = async () => {
    try {
      setPhilosophyLoading(true);
      const philosophyData = await getPhilosophy();
      setOurPhilosophy(philosophyData[0]);
      console.log("Fetched Philosophy:", philosophyData);
    } catch (error) {
      console.error("Error fetching philosophy:", error);
      setPhilosophyError("Failed to load philosophy data");
    } finally {
      setPhilosophyLoading(false);
    }
  }

  const fetchTestimonials = async () => {
    try {
      setTestimonialsLoading(true);
      const testimonialsData = await getTestimonials();
      setTestimonials(testimonialsData);
      console.log("Fetched Testimonials:", testimonialsData);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setTestimonialsError("Failed to load testimonials");
    } finally {
      setTestimonialsLoading(false);
    }
  }
  useEffect(() => {
    // Fetch services data from the API
    fetchAboutUs();
    fetchServices();
    fetchStatistics();
    fetchWhyUs();
    fetchPhilosophy();
    fetchTestimonials();
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" }); // or 'auto'
    }
  };

  return (
    <div>
      <Navbar />
      {/* Section with child image and text */}
      <section
        className="relative z-10 bg-amber-100 overflow-hidden pt-24"
        id="hero"
      >
        <img src={blob} alt="blob" className="absolute left-0 md:left-14" />
        <img
          src={dots}
          alt="dots"
          className="absolute top-[40%] left-[75%] rotate-45 hidden md:block"
        />
        <div className="flex flex-col md:flex-row items-center justify-center w-full px-4 md:px-12 py-16 gap-8 relative z-10">
          {/* Left Content */}
          <div className="w-full md:w-1/2 flex flex-col gap-2">
            <p className="text-sm sm:text-base md:text-lg text-orange-500">
              Welcome to Teach & Learn
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug md:leading-tight">
              Empowering Children and Adults to{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Reach Their Full Potential
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-700">
              Comprehensive therapy services designed to support growth,
              learning, and development in a caring, professional environment.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
              <Button>
                <span className="flex items-center gap-1">
                  Know More <IoIosArrowRoundForward size={24} />
                </span>
              </Button>
              <Button
                variant="secondary"
                className="flex gap-3"
                onClick={() => scrollToId("book")}
              >
                Book Appointment
                <FiPhone size={16} />
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-[40%] max-w-md relative z-20 -mb-[80px]">
            <img
              src={child}
              alt="Child smiling with a stack of books"
              className="w-full md:block hidden scale-125"
            />
          </div>
        </div>

        {/* Wave at Bottom */}
        <div className="absolute bottom-0 left-0 w-full z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 180"
            className="w-full h-[80px] rotate-180"
            preserveAspectRatio="none"
          >
            <path
              fill="#E0F2FE"
              d="M0,100L34.3,90C68.6,80,137,40,206,40C274.3,40,343,80,411,100C480,120,549,130,617,150C685.7,170,754,180,823,160C891.4,140,960,80,1029,50C1097.1,20,1166,40,1234,50C1302.9,60,1371,60,1406,60L1440,60L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
            />
          </svg>
        </div>
      </section>

      {/* STATISTICS */}
      <section
        className="relative bg-[#E0F2FE] overflow-hidden"
        id="statistics"
      >
        <div className="flex justify-center items-center pb-20 relative z-10">
          {statisticsLoading ? (
            <div className="w-[80%] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {Array.from({ length: 4 }, (_, index) => (
                <SkeletonLoader key={index} type="stat" count={1} />
              ))}
            </div>
          ) : statisticsError ? (
            <ErrorMessage message={statisticsError} onRetry={fetchStatistics} />
          ) : (
            <div className="w-[80%] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {statistics.map((item, index) => {
                const Icon = allIcons[item.icon];
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-4"
                  >
                    <div
                      className={`flex justify-center items-center rounded-full w-20 h-20 mb-4 ${item.bgColor || 'bg-orange-100'}`}
                    >
                      {Icon ? (
                        <Icon className={`text-4xl ${item.iconColor || 'text-orange-500'}`} />
                      ) : (
                        <div className="text-2xl font-bold text-orange-500">?</div>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {item.number}
                    </h2>
                    <p className="text-sm text-gray-600">{item.label}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Wave at bottom */}
        <div className="absolute bottom-0 left-0 w-full z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 180"
            className="w-full h-[80px]"
            preserveAspectRatio="none"
          >
            <path
              fill="#ecfcca"
              d="M0,100L34.3,90C68.6,80,137,40,206,40C274.3,40,343,80,411,100C480,120,549,130,617,150C685.7,170,754,180,823,160C891.4,140,960,80,1029,50C1097.1,20,1166,40,1234,50C1302.9,60,1371,60,1406,60L1440,60L1440,180L1405.7,180C1371.4,180,1303,180,1234,180C1165.7,180,1097,180,1029,180C960,180,891,180,823,180C754.3,180,686,180,617,180C548.6,180,480,180,411,180C342.9,180,274,180,206,180C137.1,180,69,180,34,180L0,180Z"
            />
          </svg>
        </div>
      </section>

      {/* ABOUT US */}
      <section
        id="about-us"
        className="relative bg-lime-100 px-6 py-20 flex justify-center items-center overflow-hidden"
      >
        <img src={plus} alt="" className="absolute left-[10%]" />
        <div className="flex flex-col md:flex-row gap-16 w-full max-w-7xl items-center">
          {aboutUsLoading ? (
            <SkeletonLoader type="aboutus" count={1} />
          ) : aboutUsError ? (
            <div className="w-full text-center py-20">
              <ErrorMessage 
                message={aboutUsError} 
                onRetry={fetchAboutUs} 
                className="w-full max-w-md mx-auto" 
              />
            </div>
          ) : aboutUs && aboutUs.title ? (
            <>
              {/* Image with Mask */}
              <div className="flex-shrink-0">
                <img
                  src={about}
                  alt="teacher and student in a study session"
                  className="w-[300px] md:w-[480px] h-auto object-cover"
                  style={{
                    WebkitMaskImage: `url(${mask})`,
                    maskImage: `url(${mask})`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskSize: "cover",
                    maskSize: "cover",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                  }}
                />
              </div>

              {/* Text Content */}
              <div className="max-w-xl text-center md:text-left z-10">
                <p className="text-orange-500 font-semibold text-sm md:text-base uppercase tracking-wide mb-2">
                  About Us
                </p>

                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                  {aboutUs.title}
                </h1>

                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                  {aboutUs.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {aboutUs.items?.map((item, index) => (
                    <div
                      key={index}
                      className="border border-amber-300 bg-amber-50 rounded-lg flex items-center gap-3 px-4 py-3 shadow-sm"
                    >
                      <FaRegCircleCheck className="text-green-600 text-lg" />
                      <p className="text-gray-800 text-sm md:text-base">
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>

                <Button>Know More</Button>
              </div>
            </>
          ) : (
            <div className="w-full text-center py-20">
              <p className="text-gray-600">No content available</p>
            </div>
          )}
        </div>

        {/* Wave at bottom */}
        <div className="absolute bottom-0 left-0 w-full z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 180"
            className="w-full h-[80px]"
            preserveAspectRatio="none"
          >
            <path
              fill="#fef3c6"
              d="M0,100L34.3,90C68.6,80,137,40,206,40C274.3,40,343,80,411,100C480,120,549,130,617,150C685.7,170,754,180,823,160C891.4,140,960,80,1029,50C1097.1,20,1166,40,1234,50C1302.9,60,1371,60,1406,60L1440,60L1440,180L1405.7,180C1371.4,180,1303,180,1234,180C1165.7,180,1097,180,1029,180C960,180,891,180,823,180C754.3,180,686,180,617,180C548.6,180,480,180,411,180C342.9,180,274,180,206,180C137.1,180,69,180,34,180L0,180Z"
            />
          </svg>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="bg-amber-100 relative flex items-center justify-center py-20 px-4 overflow-hidden"
      >
        <img src={circles} alt="" className="absolute scale-200" />
        <div className="max-w-6xl w-full z-10">
          <p className="text-orange-500 font-semibold text-sm md:text-base uppercase tracking-wide mb-2 text-center">
            Our Services
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-10 text-center">
            What Service We Offer
          </h1>

          {servicesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-20">
              {Array.from({ length: 6 }, (_, index) => (
                <SkeletonLoader key={index} type="card" count={1} />
              ))}
            </div>
          ) : servicesError ? (
            <ErrorMessage message={servicesError} onRetry={fetchServices} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-20">
              {services.map((item, index) => {
                const Icon = allIcons[item.icon];
                return (
                  <div
                    key={index}
                    className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
                  >
                    <div className="bg-yellow-50 p-4 rounded-full mb-4 shadow-sm">
                      {Icon ? (
                        <Icon className="text-5xl text-yellow-500" />
                      ) : (
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-500 text-xl font-bold">
                          ?
                        </div>
                      )}
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      {item.name}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <a
                      href="#"
                      className="text-orange-500 font-semibold text-sm hover:underline transition-all duration-200"
                    >
                      Read More →
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Wave at bottom */}
        <div className="absolute bottom-0 left-0 w-full z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 180"
            className="w-full h-[80px]"
            preserveAspectRatio="none"
          >
            <path
              fill="#fff"
              d="M0,100L34.3,90C68.6,80,137,40,206,40C274.3,40,343,80,411,100C480,120,549,130,617,150C685.7,170,754,180,823,160C891.4,140,960,80,1029,50C1097.1,20,1166,40,1234,50C1302.9,60,1371,60,1406,60L1440,60L1440,180L1405.7,180C1371.4,180,1303,180,1234,180C1165.7,180,1097,180,1029,180C960,180,891,180,823,180C754.3,180,686,180,617,180C548.6,180,480,180,411,180C342.9,180,274,180,206,180C137.1,180,69,180,34,180L0,180Z"
            />
          </svg>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section
        id="why-us"
        className="relative flex items-center justify-center py-20 px-4 overflow-hidden"
      >
        <img src={dots} alt="" className="absolute right-40 -z-10" />
        <div className="flex flex-col md:flex-row gap-16 w-full max-w-7xl items-center pb-20">
          {whyUsLoading ? (
            <div className="flex flex-col md:flex-row gap-16 w-full max-w-7xl items-center pb-20">
              <div className="flex flex-col justify-center max-w-xl">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-32 mb-4"></div>
                  <div className="h-12 bg-gray-300 rounded w-full mb-6"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-8"></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }, (_, index) => (
                      <SkeletonLoader key={index} type="approach" count={1} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-[380px] md:w-[700px] h-96 bg-gray-300 rounded-lg animate-pulse"></div>
            </div>
          ) : whyUsError ? (
            <ErrorMessage message={whyUsError} onRetry={fetchWhyUs} className="w-full" />
          ) : whyUs.length > 0 ? (
            <>
              {/* Text Content */}
              <div className="flex flex-col justify-center max-w-xl text-center md:text-left">
                <p className="text-orange-500 font-semibold text-sm md:text-base uppercase tracking-wide mb-2">
                  Why Choose Us
                </p>

                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  {whyUs[0].heading}
                </h1>

                <p className="text-gray-700 mb-8 whitespace-pre-line">
                  {whyUs[0].description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 ">
                  {whyUs[0].approaches?.map((item, index) => {
                    const Icon = allIcons[item.icon];
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-xl"
                      >
                        {Icon ? (
                          <Icon className="text-3xl text-orange-500 flex-shrink-0" />
                        ) : (
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-sm font-bold flex-shrink-0">
                            ?
                          </div>
                        )}
                        <p className="text-gray-800 text-base font-medium">
                          {item.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                className="w-[380px] md:w-[700px] h-auto"
                style={{
                  WebkitMaskImage: `url(${mask2})`,
                  maskImage: `url(${mask2})`,
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              >
                <img
                  src={whyUsImg}
                  alt="teacher and student in a study session"
                  className="w-full h-auto object-cover"
                />
              </div>
            </>
          ) : (
            <div className="text-center py-8 w-full">
              <p className="text-gray-600">No content available</p>
            </div>
          )}
        </div>

        {/* Wave at Bottom */}
        <div className="absolute bottom-0 left-0 w-full z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 180"
            className="w-full h-[80px] rotate-180"
            preserveAspectRatio="none"
          >
            <path
              fill="#E0F2FE"
              d="M0,100L34.3,90C68.6,80,137,40,206,40C274.3,40,343,80,411,100C480,120,549,130,617,150C685.7,170,754,180,823,160C891.4,140,960,80,1029,50C1097.1,20,1166,40,1234,50C1302.9,60,1371,60,1406,60L1440,60L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
            />
          </svg>
        </div>
      </section>

      {/* OUR PHILOSOPHY */}
      <section
        id="our-philosophy"
        aria-label="Our Philosophy Section"
        className="relative flex items-center justify-center py-10 px-4 sm:px-6 md:px-12 overflow-hidden bg-[#E0F2FE]"
      >
        {/* Decorative elements */}
        <img
          src={star}
          alt=""
          aria-hidden="true"
          className="absolute left-40 top-10"
        />
        <img
          src={line}
          alt=""
          aria-hidden="true"
          className="absolute right-40 bottom-40 -rotate-45"
        />

        {/* Content container */}
        <div className="flex flex-col md:flex-row gap-16 w-full max-w-7xl items-center z-10">
          {philosophyLoading ? (
            <>
              {/* Image Skeleton */}
              <div className="w-full max-w-[380px] md:max-w-[450px] mb-20">
                <div className="w-full h-96 bg-gray-300 rounded-lg animate-pulse"></div>
              </div>

              {/* Text Skeleton */}
              <div className="flex flex-col justify-center max-w-xl text-center md:text-left gap-2">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-32 mb-4"></div>
                  <div className="h-12 bg-gray-300 rounded w-full mb-6"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-8"></div>
                </div>
              </div>
            </>
          ) : philosophyError ? (
            <div className="w-full text-center py-20">
              <ErrorMessage 
                message={philosophyError} 
                onRetry={fetchPhilosophy}
                className="w-full max-w-md mx-auto" 
              />
            </div>
          ) : ourPhilosophy && ourPhilosophy.heading ? (
            <>
              {/* Image with mask */}
              <div
                className="w-full max-w-[380px] md:max-w-[450px] mb-20"
                style={{
                  backgroundColor: "#fefefe",
                  WebkitMaskImage: `url(${mask3})`,
                  maskImage: `url(${mask3})`,
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              >
                <img
                  src={room}
                  alt="Teacher and student in a study session"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Text Block */}
              <div className="flex flex-col justify-center max-w-xl text-center md:text-left gap-2">
                <p className="text-orange-500 font-semibold text-sm md:text-base uppercase tracking-wide mb-2">
                  Our Philosophy
                </p>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  {ourPhilosophy.heading}
                </h1>
                <p className="text-gray-700 mb-8 whitespace-pre-line">
                  {ourPhilosophy.description}
                </p>
              </div>
            </>
          ) : (
            <div className="w-full text-center py-20">
              <p className="text-gray-600">No content available</p>
            </div>
          )}
        </div>

        {/* Wave at bottom */}
        <div className="absolute bottom-0 left-0 w-full z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 180"
            className="w-full h-[80px]"
            preserveAspectRatio="none"
          >
            <path
              fill="#ecfcca"
              d="M0,100L34.3,90C68.6,80,137,40,206,40C274.3,40,343,80,411,100C480,120,549,130,617,150C685.7,170,754,180,823,160C891.4,140,960,80,1029,50C1097.1,20,1166,40,1234,50C1302.9,60,1371,60,1406,60L1440,60L1440,180L1405.7,180C1371.4,180,1303,180,1234,180C1165.7,180,1097,180,1029,180C960,180,891,180,823,180C754.3,180,686,180,617,180C548.6,180,480,180,411,180C342.9,180,274,180,206,180C137.1,180,69,180,34,180L0,180Z"
            />
          </svg>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        id="testimonials"
        aria-label="Testimonials from parents"
        className="relative overflow-hidden bg-lime-100"
      >
        <img src={sphere} alt="" className="absolute left-10" />
        <img src={capsule} alt="" className="absolute right-10" />
        <div className="w-screen z-10 flex flex-col items-center justify-center py-16 px-4 sm:px-6 md:px-12 mb-10">
          <div className="text-center">
            <p className="text-orange-500 font-semibold text-sm md:text-base uppercase tracking-wide mb-2">
              Testimonials
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-10">
              What Parents Say
            </h2>
          </div>

          {testimonialsLoading ? (
            <div className="w-full max-w-6xl mx-auto">
              <div className="flex gap-6 overflow-hidden justify-center">
                <SkeletonLoader type="testimonial" count={3} />
              </div>
            </div>
          ) : testimonialsError ? (
            <div className="w-full max-w-md mx-auto">
              <ErrorMessage 
                message={testimonialsError} 
                onRetry={fetchTestimonials}
                className="py-8"
              />
            </div>
          ) : testimonials.length > 0 ? (
            <Carousel data={testimonials} />
          ) : (
            <div className="w-full text-center py-12">
              <p className="text-gray-600">No testimonials available at the moment.</p>
            </div>
          )}
        </div>

        {/* Wave at Bottom */}
        <div className="absolute bottom-0 left-0 w-full z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 180"
            className="w-full h-[80px] rotate-180"
            preserveAspectRatio="none"
          >
            <path
              fill="#fef3c6"
              d="M0,100L34.3,90C68.6,80,137,40,206,40C274.3,40,343,80,411,100C480,120,549,130,617,150C685.7,170,754,180,823,160C891.4,140,960,80,1029,50C1097.1,20,1166,40,1234,50C1302.9,60,1371,60,1406,60L1440,60L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
            />
          </svg>
        </div>
      </section>

      {/* BOOK APPOINTMENT */}
      <section
        id="book"
        className="bg-amber-100 relative overflow-hidden py-16 px-4 md:px-12"
      >
        <img src={zigzag} alt="" className="absolute" />
        <img src={circleHalf} alt="" className="absolute right-10 bottom-20" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {/* Left */}
          <div className="relative flex justify-center items-center">
            {/* Blob background */}
            <img
              src={blob2}
              alt="decorative blob"
              className="w-full h-full scale-90 object-cover opacity-30 absolute top-0 left-0 z-0"
            />

            <div className="relative w-full max-w-md p-8 flex flex-col gap-10 z-10">
              {/* Location */}
              <div className="flex gap-4 items-start">
                <IoLocationOutline className="text-orange-600 w-8 h-8 mt-1 shrink-0" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Hafeezpet Branch
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Satvika Residency, Vinayaka Nagar, Hafeezpet, Hyderabad,
                    Telangana 50004.
                  </p>
                </div>
              </div>

              {/* Timing */}
              <div className="flex gap-4 items-start">
                <IoMdTime className="text-orange-600 w-8 h-8 mt-1 shrink-0" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Opening Hours
                  </h2>
                  <p className="text-gray-600 text-sm">
                    09:00 a.m. – 8:00 p.m.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <form className="bg-white shadow-lg rounded-xl p-8 space-y-5">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Quick Appointment
            </h1>

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <select className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option value="">{servicesLoading ? "Loading services..." : "Select Service"}</option>
              {!servicesLoading && services.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-lg p-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
            <Button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-200"
            >
              <p className="text-center w-full">Book Appointment</p>
            </Button>
          </form>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 180"
            className="w-full h-[80px]"
            preserveAspectRatio="none"
          >
            <path
              fill="#E0F2FE"
              d="M0,100L34.3,90C68.6,80,137,40,206,40C274.3,40,343,80,411,100C480,120,549,130,617,150C685.7,170,754,180,823,160C891.4,140,960,80,1029,50C1097.1,20,1166,40,1234,50C1302.9,60,1371,60,1406,60L1440,60L1440,180L1405.7,180C1371.4,180,1303,180,1234,180C1165.7,180,1097,180,1029,180C960,180,891,180,823,180C754.3,180,686,180,617,180C548.6,180,480,180,411,180C342.9,180,274,180,206,180C137.1,180,69,180,34,180L0,180Z"
            />
          </svg>
        </div>
      </section>

      <Footer color="#E0F2FE" />
    </div>
  );
};

export default Home;
