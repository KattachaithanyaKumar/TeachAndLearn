import React, { useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import bubble from "../assets/bubble.svg";

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

const Carousel = ({ data, autoScroll = false, interval = 3000 }) => {
  const scrollRef = useRef(null);
  const itemRef = useRef(null);
  const scrollInterval = useRef(null);

  // Duplicate items at start and end for infinite effect
  const extendedData = [
    ...data.slice(-4), // last 4
    ...data,
    ...data.slice(0, 4), // first 4
  ];

  const scrollByItems = (count) => {
    const container = scrollRef.current;
    const itemWidth = itemRef.current?.offsetWidth || 0;
    container.scrollBy({ left: count * itemWidth, behavior: "smooth" });
  };

  const handleNext = () => scrollByItems(1);
  const handlePrev = () => scrollByItems(-1);

  // Auto-scroll
  useEffect(() => {
    if (!autoScroll) return;

    scrollInterval.current = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(scrollInterval.current);
  }, [autoScroll, interval, handleNext]);

  // Handle infinite looping
  const handleScroll = () => {
    const container = scrollRef.current;
    const itemWidth = itemRef.current?.offsetWidth || 0;
    const totalItems = extendedData.length;
    const visibleCount = 4;
    const totalScrollableWidth = itemWidth * totalItems;

    if (container.scrollLeft <= itemWidth * 3) {
      // Jump to actual content end
      container.scrollLeft = itemWidth * (data.length + 3);
    } else if (
      container.scrollLeft >=
      totalScrollableWidth - itemWidth * visibleCount
    ) {
      // Jump to actual content start
      container.scrollLeft = itemWidth * 4;
    }
  };

  // Set initial scroll to skip cloned items at start
  useEffect(() => {
    const container = scrollRef.current;
    const itemWidth = itemRef.current?.offsetWidth || 0;
    container.scrollLeft = itemWidth * 4;
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Controls */}
      <button
        onClick={handlePrev}
        className="absolute z-20 left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={handleNext}
        className="absolute z-20 right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
      >
        <FaArrowRight />
      </button>

      {/* Carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto scroll-smooth no-scrollbar"
      >
        {extendedData.map((item, index) => (
          <div
            key={index}
            ref={index === 4 ? itemRef : null} // ref for real first item
            className="relative w-full sm:w-1/2 md:w-1/4 flex-shrink-0 px-4"
          >
            <div className="bg-white shadow-lg rounded-xl p-6 w-full h-full flex items-center justify-center flex-col text-center">
              <p className="text-black text-base leading-relaxed mb-3">{item.review}</p>
              <Rating value={item.rating} />
              <p className="text-sm font-semibold text-gray-700 mt-3">{item.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
