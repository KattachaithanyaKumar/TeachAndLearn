import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Wave from "../components/Wave";
import { allIcons } from "../CONSTANTS";
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
  fallbackAdultLanding,
  fallbackAdultServiceItems,
} from "../utils/serviceListingFallbacks";

const AdultServices = () => {
  const navigate = useNavigate();
  const [landing, setLanding] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [l, rows] = await Promise.all([
          getServiceLandingWithFallback("adult"),
          getServiceItemsWithFallback("adult"),
        ]);
        if (!cancelled) {
          setLanding(l);
          setItems(rows);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setLanding({ _id: null, ...fallbackAdultLanding() });
          setItems(fallbackAdultServiceItems());
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
    navigate(`/adult-services/${pathSegment}`);
  };

  const heroIntro =
    landing?.heroIntro ??
    "Specialized therapy services for adults, focusing on mental, physical, and emotional well-being to help individuals lead fulfilling lives.";
  const sectionTitle = landing?.sectionTitle ?? "Our Adult Services";
  const sectionSubtitle =
    landing?.sectionSubtitle ??
    "Comprehensive therapies tailored for adults' unique needs";

  return (
    <div>
      <Navbar />
      <Header color={"#EDE9FE"}>
        <h1 className="text-4xl font-bold mb-4 text-center">
          Adult{" "}
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
              {items.map((item) => {
                const IconCmp =
                  item.iconKey && allIcons[item.iconKey]
                    ? allIcons[item.iconKey]
                    : null;
                return (
                  <div
                    key={item._id}
                    className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col justify-between border border-indigo-200 hover:translate-y-[-5px]"
                  >
                    <div>
                      {IconCmp ? (
                        <div className="flex justify-center mb-3 text-indigo-600">
                          <IconCmp className="text-4xl" />
                        </div>
                      ) : null}
                      <h2 className="text-2xl font-semibold text-indigo-900 mb-3 text-center">
                        {item.title}
                      </h2>
                      <p className="text-gray-700 text-base mb-6 leading-relaxed text-center">
                        {item.description}
                      </p>

                      <ul className="list-disc list-inside text-base text-gray-800 space-y-2 mb-6 ml-2">
                        {(item.items ?? []).map((i, idx) => (
                          <li key={idx} className="pl-2">
                            {i}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-5 flex justify-center">
                      <Button
                        className="w-fit text-base hover:scale-105 transition-transform bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-purple-600 hover:to-indigo-600"
                        onClick={() => handleNavigate(item.pathSegment)}
                      >
                        Explore
                        <IoIosArrowRoundForward size={28} />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <Wave color={"#EDE9FE"} />
      </section>

      <Footer color={"#EDE9FE"} />
    </div>
  );
};

export default AdultServices;
