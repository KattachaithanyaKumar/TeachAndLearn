import { createClient } from '@sanity/client'

/** @returns {import('@sanity/client').SanityClient} */
export function getSanityClient() {
  const projectId = process.env.SANITY_PROJECT_ID
  const dataset = process.env.SANITY_DATASET
  const token = process.env.SANITY_API_WRITE_TOKEN
  const apiVersion = process.env.SANITY_API_VERSION || '2024-01-01'

  if (!projectId || !dataset) {
    throw new Error('SANITY_PROJECT_ID and SANITY_DATASET are required')
  }
  if (!token) {
    throw new Error('SANITY_API_WRITE_TOKEN is required for mutations')
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  })
}

/**
 * Client for reading `admin_user` documents (defaults to SANITY_DATASET; set SANITY_AUTH_DATASET for a private dataset).
 * @returns {import('@sanity/client').SanityClient}
 */
export function getSanityAuthClient() {
  const projectId = process.env.SANITY_PROJECT_ID
  const dataset = process.env.SANITY_AUTH_DATASET || process.env.SANITY_DATASET
  const token = process.env.SANITY_API_WRITE_TOKEN
  const apiVersion = process.env.SANITY_API_VERSION || '2024-01-01'

  if (!projectId || !dataset) {
    throw new Error('SANITY_PROJECT_ID and SANITY_DATASET are required')
  }
  if (!token) {
    throw new Error('SANITY_API_WRITE_TOKEN is required')
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  })
}
