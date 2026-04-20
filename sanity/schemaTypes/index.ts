import { service } from "./service";
import { stats } from "./stats";
import { whyUs, approach } from "./why_us";
import { testimonials } from "./testimonials";
import { our_philosophy } from "./our_philosophy";
import { about_us, about_us_items } from "./about_us";
import { facility } from "./facilities";
import { home } from "./home";
import { franchise, franchiseContact, franchiseSteps, franchiseReq } from "./franchise";
import { contactAddress, contactDetails, contactUs } from "./contact_details";
import { contact_submission } from "./contact_submission";
import { service_listing_item } from "./service_listing_item";
import { service_listing_landing } from "./service_listing_landing";
import { service_page_blocks } from "./service_page_blocks";
import { admin_user } from "./admin_user";

export const schemaTypes = [
    service, stats, whyUs, approach, testimonials, our_philosophy, about_us, about_us_items, facility, home, franchise, franchiseContact, franchiseReq, franchiseSteps, contactAddress, contactDetails, contactUs, contact_submission, ...service_page_blocks, service_listing_item, service_listing_landing, admin_user
]
