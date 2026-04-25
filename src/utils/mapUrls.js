/**
 * Google Maps directions deep links for contact branches (no API key).
 * Optional latitude/longitude improve precision when both are set.
 */

function parseBranchCoords(branch) {
  const lat = Number(branch?.latitude);
  const lng = Number(branch?.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
  return { lat, lng };
}

/**
 * @param {{ address?: string; latitude?: number | null; longitude?: number | null }} branch
 * @returns {string | null}
 */
export function directionsUrlForBranch(branch) {
  const c = parseBranchCoords(branch);
  if (c) {
    return `https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}`;
  }
  const a = typeof branch?.address === "string" ? branch.address.trim() : "";
  if (a) return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(a)}`;
  return null;
}
