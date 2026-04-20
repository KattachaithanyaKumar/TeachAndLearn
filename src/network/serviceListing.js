import {
  getServiceListingItems,
  getServiceListingLanding,
} from "./api_service";
import {
  fallbackAdultLanding,
  fallbackAdultServiceItems,
  fallbackChildLanding,
  fallbackChildServiceItems,
} from "../utils/serviceListingFallbacks";

/**
 * @param {'child'|'adult'} audience
 */
export async function getServiceLandingWithFallback(audience) {
  const doc = await getServiceListingLanding(audience);
  const fb =
    audience === "child" ? fallbackChildLanding() : fallbackAdultLanding();
  if (!doc) {
    return { _id: null, ...fb };
  }
  return {
    _id: doc._id,
    audience: doc.audience,
    heroIntro: doc.heroIntro?.trim() || fb.heroIntro,
    sectionTitle: doc.sectionTitle?.trim() || fb.sectionTitle,
    sectionSubtitle: doc.sectionSubtitle?.trim() || fb.sectionSubtitle,
  };
}

/**
 * @param {'child'|'adult'} audience
 */
export async function getServiceItemsWithFallback(audience) {
  const rows = await getServiceListingItems(audience);
  if (rows?.length) {
    return rows;
  }
  return audience === "child"
    ? fallbackChildServiceItems()
    : fallbackAdultServiceItems();
}
