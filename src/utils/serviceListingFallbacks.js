import { adultServices, childServices } from "../CONSTANTS";

function adultPathFromTitle(title) {
  switch (title) {
    case "Psychology":
      return "psychology";
    case "Speech Therapy":
      return "speech-therapy";
    case "Physical Therapy":
      return "physical-therapy";
    case "Behavioral Therapy":
      return "behavioral-therapy";
    default:
      return title.toLowerCase().replace(/\s+/g, "-");
  }
}

const ADULT_ICON_KEYS = [
  "PiTrainSimple",
  "IoExtensionPuzzleOutline",
  "PiLego",
  "MdOutlineToys",
];

export function fallbackChildServiceItems() {
  return childServices.map((c, i) => ({
    _id: `fallback-child-${i}`,
    title: c.title,
    pathSegment: c.path,
    description: c.description,
    items: c.items,
    audience: "child",
    sortOrder: i,
    iconKey: undefined,
  }));
}

export function fallbackAdultServiceItems() {
  return adultServices.map((c, i) => ({
    _id: `fallback-adult-${i}`,
    title: c.title,
    pathSegment: adultPathFromTitle(c.title),
    description: c.description,
    items: c.items,
    audience: "adult",
    sortOrder: i,
    iconKey: ADULT_ICON_KEYS[i],
  }));
}

export function fallbackChildLanding() {
  return {
    heroIntro:
      "Comprehensive therapy services designed to help children reach their developmental milestones and achieve their full potential in a fun, supportive environment.",
    sectionTitle: "Our Child Services",
    sectionSubtitle: "Specialized therapies tailored for children's unique needs",
  };
}

export function fallbackAdultLanding() {
  return {
    heroIntro:
      "Specialized therapy services for adults, focusing on mental, physical, and emotional well-being to help individuals lead fulfilling lives.",
    sectionTitle: "Our Adult Services",
    sectionSubtitle: "Comprehensive therapies tailored for adults' unique needs",
  };
}
