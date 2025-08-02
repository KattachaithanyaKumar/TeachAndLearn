import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Section from "../components/Section";
import Wave from "../components/Wave";
import { getFacilities, getImageUrlFromRef } from "../network/api_service";
import { useApiStates } from "../hooks/useApiStates";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import facilityImg from "../assets/facility.jpg";
import roomImg from "../assets/room.jpg";
import occupationalImg from "../assets/occupational.jpg";
import whyUsImg from "../assets/why-us.jpg";

const Facilities = () => {
    const { states, setLoading, setError, setData } = useApiStates({
        facilities: { loading: false, error: null, data: null }
    });

    const [facilities, setFacilities] = React.useState([]);
    const [facilitiesWithImages, setFacilitiesWithImages] = React.useState([]);

    useEffect(() => {
        const fetchFacilitiesData = async () => {
            setLoading('facilities', true);
            try {
                const facilitiesData = await getFacilities();
                setFacilities(facilitiesData);
                console.log('Fetched facilities:', facilitiesData);
                
                // Process facilities with images
                const facilitiesWithImageUrls = facilitiesData.map((facility) => {
                    if (facility.image?.asset?._ref) {
                        try {
                            const imageUrl = getImageUrlFromRef(facility.image.asset);
                            return { ...facility, imageUrl };
                        } catch (error) {
                            console.error('Error fetching image for facility:', facility.title, error);
                            return { ...facility, imageUrl: null };
                        }
                    }
                    return { ...facility, imageUrl: null };
                });
                
                setFacilitiesWithImages(facilitiesWithImageUrls);
                setLoading('facilities', false);
            } catch (error) {
                console.error('Error fetching facilities:', error);
                setError('facilities', error.message);
            }
        };

        fetchFacilitiesData();
    }, [setLoading, setError, setData]);


    // Show loading spinner while fetching data
    if (states.facilities?.loading) {
        return (
            <div className="bg-white min-h-screen">
                <Navbar />
                <div className="pt-24 flex justify-center items-center min-h-[50vh]">
                    <LoadingSpinner />
                </div>
                <Footer />
            </div>
        );
    }

    // Show error message if there's an error (but still show fallback data)
    const showError = states.facilities?.error && !states.facilities?.data;
    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <div className="pt-24">
                <header
                    className="w-full flex flex-col items-center justify-center text-center mb-0 px-4 py-16 relative"
                    style={{ backgroundColor: "#fff", paddingBottom: "220px" }}
                >
                    <h1 className="text-4xl font-bold  mb-4">
                        Our{" "}
                        <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                            Facilities
                        </span>
                    </h1>
                    <div className="flex gap-2 items-center ">
                        <p>
                            We provide a nurturing, safe, and professional environment designed to support every child's and family's needs. Explore our thoughtfully designed spaces below.
                        </p>
                    </div>
                    <div className="absolute left-0 right-0 bottom-0">
                        <Wave color="#FFF7E6" />
                    </div>
                </header>
                
                {/* Show error message if API failed but we have fallback data */}
                {showError && (
                    <div className="max-w-4xl mx-auto px-4 mb-8">
                        <ErrorMessage 
                            message="Unable to load facilities from server. Showing default content." 
                            onRetry={() => window.location.reload()}
                        />
                    </div>
                )}
                
                {facilitiesWithImages.map((facility, idx) => (
                    <div key={facility.title} className="relative">

                        <Section color={facility.bg}>
                            <div
                                className={`flex flex-col md:flex-row items-center gap-10 w-full max-w-5xl mx-auto ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                                style={idx === facilitiesWithImages.length - 1 ? {} : { paddingBottom: "70px" }}
                            >
                                <div className="md:w-1/2 w-full flex justify-center">
                                    <img
                                        src={facility.imageUrl || facilityImg}
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
                        {idx < facilitiesWithImages.length - 1 && (
                            <Wave
                                color={facilitiesWithImages[idx + 1].bg}
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

