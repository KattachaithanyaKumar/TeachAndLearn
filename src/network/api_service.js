import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

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

// Create image URL builder
const builder = imageUrlBuilder(client);

export function getImageUrlFromRef(asset) {
  if (!asset || !asset._ref) return null;

  try {
    // Use the image URL builder to create the image URL
    const imageUrl = builder.image(asset).url();
    
    console.log("Generated image URL:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error generating image URL:", error);
    return null;
  }
}

export async function getHome() {
  try {
    const home = await client.fetch(`
      *[_type == "home"][0]{
        _id,
        _type,
        _createdAt,
        _updatedAt,
        aboutUs[]->{
          _id,
          _type,
          _createdAt,
          _updatedAt,
          title,
          description,
          items[]->{
            _id,
            title,
            description
          }
        },
        service[]->{
          _id,
          _type,
          _createdAt,
          _updatedAt,
          name,
          description,
          icon
        },
        stats[]->{
          _id,
          _type,
          _createdAt,
          _updatedAt,
          number,
          label,
          icon,
          bgColor,
          iconColor
        },
        whyUs[]->{
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
        },
        ourPhilosophy[]->{
          _id,
          _type,
          _createdAt,
          _updatedAt,
          heading,
          description
        },
        testimonials[]->{
          _id,
          _type,
          _createdAt,
          _updatedAt,
          name,
          designation,
          testimonial,
          rating
        }
      }
    `);
    return home;
  } catch (error) {
    console.error("Error fetching home data:", error);
    throw error;
  }
}

export async function getFacilities() {
  try {
    const facilities = await client.fetch('*[_type == "facility"]');
    return facilities;
  } catch (error) {
    console.error("Error fetching facilities:", error);
    throw error;
  }
}

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

export async function getAboutUs() {
  try {
    const aboutUs = await client.fetch(`
      *[_type == "about_us"]{
        _id,
        _type,
        _createdAt,
        _updatedAt,
        title,
        description,
        items[]->{
          _id,
          title,
          description
        }
      }
    `);
    return aboutUs;
  } catch (error) {
    console.error("Error fetching about us:", error);
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
