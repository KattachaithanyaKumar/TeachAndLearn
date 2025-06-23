import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Rating = ({ value }) => (
  <div
    className="flex gap-1 text-yellow-500 mt-2"
    aria-label={`Rating: ${value} out of 5`}
  >
    {[...Array(5)].map((_, i) => (
      <FaStar key={i} color={i < value ? "#facc15" : "#e5e7eb"} />
    ))}
  </div>
);

// Responsive slide widths
const getResponsiveSlideVW = () => {
  const width = window.innerWidth;
  if (width < 640) return 90; // mobile
  if (width < 1024) return 80; // tablet
  return 70; // desktop
};

const Carousel = ({ data, autoScroll = true, interval = 3000 }) => {
  const total = data.length;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(true);
  const [slideVW, setSlideVW] = useState(getResponsiveSlideVW());

  const extendedData = [data[data.length - 1], ...data, data[0]];
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setSlideVW(getResponsiveSlideVW());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!autoScroll) return;
    const id = setInterval(goToNext, interval);
    return () => clearInterval(id);
  }, [currentIndex, autoScroll]);

  useEffect(() => {
    const track = containerRef.current;
    const handleEnd = () => {
      setTransitioning(false);
      if (currentIndex === 0) setCurrentIndex(total);
      else if (currentIndex === total + 1) setCurrentIndex(1);
    };
    track.addEventListener("transitionend", handleEnd);
    return () => track.removeEventListener("transitionend", handleEnd);
  }, [currentIndex, total]);

  const goToNext = () => {
    setTransitioning(true);
    setCurrentIndex((i) => i + 1);
  };
  const goToPrev = () => {
    setTransitioning(true);
    setCurrentIndex((i) => i - 1);
  };

  const GAP_REM = 1.5;
  const SIDE_OFFSET_VW = (100 - slideVW) / 2;
  const GAP_VW = (GAP_REM * 16) / (window.innerWidth / 100);
  const translate = `translateX(calc(-${currentIndex * slideVW}vw - ${
    currentIndex * GAP_VW
  }vw + ${SIDE_OFFSET_VW}vw))`;

  return (
    <div className="relative w-screen overflow-hidden py-10 px-2 sm:px-6">
      {/* Fading masks */}
      <div className="absolute left-0 top-0 w-24 sm:w-32 h-full z-20 pointer-events-none bg-gradient-to-r from-[#ecfcca] to-transparent" />
      <div className="absolute right-0 top-0 w-24 sm:w-32 h-full z-20 pointer-events-none bg-gradient-to-l from-[#ecfcca] to-transparent" />

      {/* Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 bg-white rounded-full shadow p-2"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 bg-white rounded-full shadow p-2"
      >
        <FaArrowRight />
      </button>

      {/* Track + Slides */}
      <div
        ref={containerRef}
        className="flex items-stretch space-x-4 sm:space-x-6"
        style={{
          transform: translate,
          transition: transitioning ? "transform 0.5s ease-in-out" : "none",
        }}
      >
        {extendedData.map((item, idx) => (
          <div
            key={idx}
            className="flex-shrink-0"
            style={{ width: `${slideVW}vw` }}
          >
            <div className="relative h-full">
              <div
                className="bg-white shadow-md p-4 sm:p-6 h-full min-h-40 flex flex-col justify-between 
                rounded-tl-xl rounded-tr-3xl rounded-bl-3xl rounded-br-xl border border-gray-200"
              >
                <p className="text-gray-700 italic mb-4 text-sm sm:text-base">
                  “{item.review}”
                </p>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    {item.author}
                  </h3>
                  <Rating value={item.rating} />
                </div>
              </div>

              {/* Tail */}
              <div className="absolute -bottom-2 left-6 sm:left-10 w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
