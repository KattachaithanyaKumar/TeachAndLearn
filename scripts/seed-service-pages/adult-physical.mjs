import { randomUUID } from "node:crypto";

const k = () => randomUUID();

const sections = [
  {
    heading: "What is Physical Therapy?",
    body:
      "Physical therapy is a specialized branch of healthcare that focuses on the restoration of physical function, reduction of pain, and prevention of disability through the utilization of various techniques such as exercise and manual therapy. Our skilled physical therapists work closely with adult patients to develop personalized treatment plans that effectively address a diverse range of conditions, such as sports injuries, back pain, arthritis, stroke, and neurological disorders.",
    image: "src/assets/Occupational-Therapy-1-1.jpg",
    alt: "Physical therapy session",
  },
  {
    heading: "Why Physical Therapy?",
    body:
      "Physical therapy has been demonstrated to effectively enhance mobility, strength, and flexibility while reducing pain and minimizing the need for medication or surgical intervention. Physical therapists also aid individuals in preventing future injuries or disabilities, as well as managing chronic conditions such as diabetes or heart disease. By designing tailored treatment plans, physical therapy can assist adults in attaining their objectives and sustaining an active and healthy lifestyle.",
    image: "src/assets/room.jpg",
    alt: "Physical therapy room",
  },
  {
    heading: "Importance of Individualized Physical Therapy",
    body:
      "Physical therapy helps adults maintain and improve their physical function, independence, and quality of life. By providing individualized treatment plans, physical therapists can help adults recover from injuries, manage chronic conditions, and prevent future health problems. Physical therapy can also help individuals reduce their risk of falls, improve balance and coordination, and manage pain without relying on medications or surgery.",
    image: "src/assets/facility.jpg",
    alt: "Physical therapy facility",
  },
  {
    heading: "Advantages of Physical Therapy",
    body:
      "Physical therapy can help individuals recover from injuries or surgeries more quickly, reducing the need for hospitalization or ongoing medical care. It can also help adults manage chronic conditions like arthritis or diabetes, reducing the risk of complications and improving overall health. Through physical therapy, individuals can also learn how to prevent injuries and maintain a healthy lifestyle, improving their overall quality of life.",
    image: "src/assets/Occupational-Therapy-1-1.jpg",
    alt: "Physical therapy advantages",
  },
];

export default {
  audience: "adult",
  pathSegment: "physical-therapy",
  sortOrder: 2,
  title: "Physical Therapy",
  description:
    "Physical therapy for adults to restore function, reduce pain, and prevent disability through exercise and manual therapy.",
  items: [
    "Restoration of physical function",
    "Pain reduction",
    "Prevention of disability",
    "Personalized exercise plans",
    "Rehabilitation for injuries, arthritis, stroke, neurological disorders",
    "Chronic condition management",
  ],
  iconKey: "PiLego",
  headerColor: "#EDE9FE",
  pageTitlePrefix: "Adult",
  pageTitleAccent: "Physical Therapy",
  heroTagline:
    "Restore function, reduce pain, and improve quality of life with expert physical therapy for adults.",
  showCta: false,
  pageBlocks: sections.map((s, idx) => ({
    _type: "service_page_block_alternating_media",
    _key: k(),
    heading: s.heading,
    body: s.body,
    image: { localImagePath: s.image },
    imageAlt: s.alt,
    reverseLayout: idx % 2 === 1,
    sectionBg: idx % 2 === 1 ? "gray" : "white",
    useBlobMask: true,
    headingStyle: "orange",
    blobMask: "blob2",
  })),
};
