import createClient from '@sanity/client';
import { token, projectId } from "../CONSTANTS";

const client = createClient({
    projectId: projectId, // Replace with your Sanity project ID
    dataset: 'production', // Replace with your Sanity dataset name
    useCdn: true, // `false` if you want to ensure fresh data
    apiVersion: '2023-10-01', // Use a specific API version   
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