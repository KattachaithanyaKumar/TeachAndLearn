import { createClient } from "@sanity/client";
// import { projectId } from "../CONSTANTS";

export function getNowDate() {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: false,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
});

export async function getServices() {
  try {
    const services = await client.fetch('*[_type == "service"]');
    return services;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}

export async function getStatistics() {
  try {
    const statistics = await client.fetch('*[_type == "stats"]');
    return statistics;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
}

export async function getWhyUs() {
    try{
      const whyUs = await client.fetch(`
        *[_type == "whyUs"]{
          _id,
          _type,
          _createdAt,
          _updatedAt,
          heading,
          description,
          approaches[]->{
            _id,
            label,
            icon
          }
        }
      `);
      return whyUs;
    }catch (error) {
      console.error("Error fetching why us:", error);
      throw error;
    }
}

export async function getTestimonials() {
  try {
    const testimonials = await client.fetch('*[_type == "testimonials"]');
    return testimonials;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }
}

export async function getPhilosophy() {
  try {
    const philosophy = await client.fetch('*[_type == "our_philosophy"]');
    return philosophy;
  } catch (error) {
    console.error("Error fetching philosophy:", error);
    throw error;
  }
}
