import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { aboutUs as fallbackAboutUs, allIcons } from "../CONSTANTS";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { TbTargetArrow } from "react-icons/tb";

import about from "../assets/teacher-and-student.JPG";
import mask from "../assets/mask.png";
import facility from "../assets/facility.jpg";
import mask2 from "../assets/mask4.png";
import {
  getAboutSectionFromHome,
  getFacilities,
  getImageUrlFromRef,
  getStatistics,
  urlForSanityImage,
} from "../network/api_service";
import Wave from "../components/Wave";
import CTA from "../components/CTA";

const gradientSectionHeadingCls =
  "text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-[0_4px_14px_rgba(234,88,12,0.35)]";
const gradientSectionHeadingSpanCls =
  "bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent";

const AboutHighlightCard = ({ icon, title, children }) => (
  <div className="h-full flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 sm:p-8 text-left">
    <div className="flex flex-row items-start gap-4 mb-4">
      <div
        className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-100 text-sky-600 text-2xl"
        aria-hidden
      >
        {icon}
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
        {title}
      </h2>
    </div>
    <p className="text-gray-700 text-base sm:text-lg leading-relaxed flex-1">
      {children}
    </p>
  </div>
);

const About = () => {
  const [statistics, setStatistics] = useState([]);
  const [aboutSection, setAboutSection] = useState(null);
  const [aboutLoading, setAboutLoading] = useState(true);
  const [facilitiesWithImages, setFacilitiesWithImages] = useState([]);
  const [facilitiesLoading, setFacilitiesLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [statsData, aboutData] = await Promise.all([
          getStatistics(),
          getAboutSectionFromHome(),
        ]);
        if (cancelled) return;
        setStatistics(statsData);
        if (aboutData) {
          setAboutSection(aboutData);
        }
      } catch (error) {
        if (!cancelled) console.error("Error fetching About page data:", error);
      } finally {
        if (!cancelled) setAboutLoading(false);
      }

      try {
        const facilitiesData = await getFacilities();
        const withUrls = (facilitiesData ?? []).map((f) => {
          if (f.image?.asset?._ref) {
            try {
              const imageUrl = getImageUrlFromRef(f.image.asset);
              return { ...f, imageUrl };
            } catch (e) {
              console.error("Error resolving facility image:", f.title, e);
              return { ...f, imageUrl: null };
            }
          }
          return { ...f, imageUrl: null };
        });
        if (!cancelled) setFacilitiesWithImages(withUrls);
      } catch (error) {
        if (!cancelled) console.error("Error fetching facilities:", error);
      } finally {
        if (!cancelled) setFacilitiesLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const heroAbout = aboutSection
    ? {
        ...fallbackAboutUs,
        ...aboutSection,
        items:
          Array.isArray(aboutSection.items) && aboutSection.items.length > 0
            ? aboutSection.items
            : fallbackAboutUs.items,
        title: aboutSection.title || fallbackAboutUs.title,
        description: aboutSection.description || fallbackAboutUs.description,
      }
    : fallbackAboutUs;
  const heroItems = heroAbout.items ?? [];

  const heroImgField = heroAbout.aboutPageHeroImage;
  const heroImageSrc =
    heroImgField?.assetUrl ||
    urlForSanityImage(heroImgField) ||
    (heroImgField?.asset && getImageUrlFromRef(heroImgField.asset)) ||
    about;
  const heroImageAlt =
    heroImgField?.alt || "teacher and student in a study session";

  return (
    <div>
      <Navbar />

      <section className="relative bg-white px-6 pt-24 sm:pt-28 md:pt-32 pb-20 flex justify-center items-center overflow-hidden">
        <div className="flex flex-col md:flex-row gap-16 w-full max-w-7xl items-center pb-40">
          {/* Image */}
          <div className="flex-shrink-0">
            <img
              src={heroImageSrc}
              alt={heroImageAlt}
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
          <div className="w-full max-w-2xl">
            <p className={`${gradientSectionHeadingCls} mb-2`}>
              <span className={gradientSectionHeadingSpanCls}>
                {heroAbout.aboutPageEyebrow}
              </span>
            </p>
            {aboutLoading ? (
              <p className="text-gray-500 text-base mb-6">Loading…</p>
            ) : (
              <>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                  {heroAbout.title}
                </h1>

                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                  {heroAbout.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {heroItems.map((item, index) => (
                    <div
                      key={item._id ?? index}
                      className="border border-amber-300 bg-amber-50 rounded-lg px-4 py-4 shadow-sm flex flex-col gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <FaRegCircleCheck className="text-green-600 text-lg" />
                        <p className="text-gray-800 text-sm md:text-base font-semibold">
                          {item.title}
                        </p>
                      </div>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <Wave color={"#E0F2FE"} />
      </section>

      <section className="relative flex items-center justify-center py-16 px-4 sm:px-6 md:px-12 overflow-hidden bg-[#E0F2FE]">
        <div className="flex flex-col text-center items-center pb-20">
          {/* Header Content */}
          <div className="max-w-3xl">
            <p className={`${gradientSectionHeadingCls} mb-2`}>
              <span className={gradientSectionHeadingSpanCls}>
                {heroAbout.promiseEyebrow}
              </span>
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              {heroAbout.promiseHeading}
            </h1>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line">
              {heroAbout.promiseBody}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full max-w-7xl mt-10 md:mt-12">
            <AboutHighlightCard icon={<IoEyeOutline />} title={heroAbout.visionTitle}>
              {heroAbout.visionBody}
            </AboutHighlightCard>

            <AboutHighlightCard
              icon={<TbTargetArrow />}
              title={heroAbout.missionTitle}
            >
              {heroAbout.missionBody}
            </AboutHighlightCard>
          </div>
        </div>

        <Wave color={"#ecfcca"} />
      </section>

      <section className="relative flex items-center justify-center py-16 px-4 sm:px-6 md:px-12 overflow-hidden bg-lime-100">
        <div className="flex flex-col max-w-7xl w-full pb-40 gap-16 md:gap-20">
          <h2
            className={`${gradientSectionHeadingCls} text-center max-w-3xl mx-auto mb-2`}
          >
            <span className={gradientSectionHeadingSpanCls}>Facilities</span>
          </h2>

          {facilitiesLoading ? (
            <p className="text-gray-600 text-center">Loading…</p>
          ) : facilitiesWithImages.length === 0 ? (
            <p className="text-gray-600 text-center">
              Facility details will appear here when available.
            </p>
          ) : (
            facilitiesWithImages.map((f, idx) => (
              <div
                key={f._id ?? f.title ?? idx}
                className={`flex flex-col-reverse md:flex-row items-center gap-12 ${
                  idx % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1 w-full min-w-0">
                  <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                    {f.title}
                  </h3>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line">
                    {f.description}
                  </p>
                </div>
                <div className="flex-shrink-0 flex justify-center w-full md:w-auto">
                  <img
                    src={f.imageUrl || facility}
                    alt={f.title || "Facility"}
                    className="w-[320px] sm:w-[400px] md:w-[500px] h-auto object-cover max-w-full"
                    style={{
                      WebkitMaskImage: `url(${mask2})`,
                      maskImage: `url(${mask2})`,
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        <Wave color={"#fff"} />
      </section>

      <section className="relative bg-[#fff] overflow-hidden" id="statistics">
        <div className="flex justify-center items-center pb-40 relative z-10">
          <div className="w-[80%] grid grid-cols-2 md:grid-cols-4 gap-6 text-center ">
            {statistics.map((item, index) => {
              const Icon = allIcons[item.icon];
              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-4"
                >
                  <div
                    className={`flex justify-center items-center rounded-full w-20 h-20 mb-4 ${item.bgColor}`}
                  >
                    <Icon className={`text-4xl ${item.iconColor}`} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {item.number}
                  </h2>
                  <p className="text-sm text-gray-600">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* <div className="mb-40">
          <CTA />
          </div> */}
        <Wave color={"#FEF3C6"} />
      </section>

      <Footer color={"#FEF3C6"} />
    </div>
  );
};

export default About;
