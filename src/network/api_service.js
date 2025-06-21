import { createClient } from '@sanity/client';
import { projectId } from "../CONSTANTS";

export function getNowDate() {
    const now = new Date();
    return now.toISOString().split('T')[0];
}

const client = createClient({
    projectId: projectId, // Replace with your Sanity project ID
    dataset: 'production', // Replace with your Sanity dataset name
    useCdn: false, // `false` if you want to ensure fresh data
    apiVersion: getNowDate(), // Use the current date as the API version
});

export async function getServices() {
    try {
        const services = await client.fetch('*[_type == "service"]');
        return services;
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
}