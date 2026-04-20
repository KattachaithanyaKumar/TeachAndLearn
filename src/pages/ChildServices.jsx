import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Wave from "../components/Wave";
import CTA from "../components/CTA";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import Header from "../components/Header";
import {
  getServiceLandingWithFallback,
  getServiceItemsWithFallback,
} from "../network/serviceListing";
import {
  fallbackChildLanding,
  fallbackChildServiceItems,
} from "../utils/serviceListingFallbacks";

const ChildServices = () => {
  const navigate = useNavigate();
  const [landing, setLanding] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [l, rows] = await Promise.all([
          getServiceLandingWithFallback("child"),
          getServiceItemsWithFallback("child"),
        ]);
        if (!cancelled) {
          setLanding(l);
          setItems(rows);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setLanding({ _id: null, ...fallbackChildLanding() });
          setItems(fallbackChildServiceItems());
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleNavigate = (pathSegment) => {
    navigate(`/child-services/${pathSegment}`);
  };

  const heroIntro =
    landing?.heroIntro ??
    "Comprehensive therapy services designed to help children reach their developmental milestones and achieve their full potential in a fun, supportive environment.";
  const sectionTitle = landing?.sectionTitle ?? "Our Child Services";
  const sectionSubtitle =
    landing?.sectionSubtitle ??
    "Specialized therapies tailored for children's unique needs";

  return (
    <div>
      <Navbar />
      <Header color={"#E0F2FE"}>
        <h1 className="text-4xl font-bold mb-4 text-center">
          Child{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Services
          </span>
        </h1>
        <div className="flex gap-2 items-center justify-center">
          <p className="max-w-2xl text-lg sm:text-xl text-center">{heroIntro}</p>
        </div>
      </Header>

      <section className="bg-white py-24 px-4 sm:px-8 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto pb-30">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{sectionTitle}</h1>
            <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
              {sectionSubtitle}
            </p>
          </div>

          {loading ? (
            <p className="text-center text-gray-500 py-12">Loading…</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
              <div
                key={item._id}
                className="bg-[#FEFCE8] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col justify-between hover:translate-y-[-5px]"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 text-base mb-6 leading-relaxed text-center">
                    {item.description}
                  </p>

                  <ul className="list-disc list-inside text-base text-gray-700 space-y-2 mb-6 ml-2">
                    {(item.items ?? []).map((i, idx) => (
                      <li key={idx} className="pl-2">
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-5 flex justify-center">
                  <Button
                    className="w-fit text-base hover:scale-105 transition-transform"
                    onClick={() => handleNavigate(item.pathSegment)}
                  >
                    Explore
                    <IoIosArrowRoundForward size={28} />
                  </Button>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
        <div className="mb-40">
          <CTA />
        </div>

        <Wave color={"#E0F2FE"} />
      </section>

      <Footer color={"#E0F2FE"} />
    </div>
  );
};

export default ChildServices;
