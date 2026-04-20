import { randomUUID } from "node:crypto";

const k = () => randomUUID();

const sections = [
  {
    heading: "What is Speech Therapy?",
    body:
      "Speech therapy is a form of treatment that aims to improve a person’s ability to communicate effectively. Our speech therapists work with adults to identify and treat any issues that may be affecting their ability to communicate, including articulation disorders, fluency disorders, voice disorders, and language disorders.",
    image: "src/assets/speech.png",
    alt: "Speech therapy session",
  },
  {
    heading: "Why Speech Therapy?",
    body:
      "By working with a speech therapist, adults can improve their communication skills and feel more confident in their ability to express themselves effectively. The ability to communicate effectively is crucial for personal and professional success. Poor communication skills can lead to misunderstandings, social isolation, and even mental health issues like anxiety and depression. Speech therapy can help adults overcome these challenges and improve their quality of life by enhancing communication skills, improving confidence and self-esteem, strengthening interpersonal relationships, facilitating better educational and employment opportunities, and promoting overall well-being.",
    image: "src/assets/Speach-Therapy-Disorder.jpg",
    alt: "Speech therapy disorders",
  },
  {
    heading: "Importance of Speech Therapy",
    body:
      "The ability to communicate effectively is crucial for personal and professional success. Poor communication skills can lead to misunderstandings, social isolation, and even mental health issues like anxiety and depression. Speech therapy can help adults overcome these challenges and improve their quality of life.",
    image: "src/assets/teacher-and-student.JPG",
    alt: "Speech therapist and adult",
  },
  {
    heading: "Advantages of Speech Therapy",
    body:
      "There are many advantages to working with a speech therapist, including personalized treatment plans tailored to individual needs, access to evidence-based therapies and techniques, ongoing support and guidance throughout the therapy process, and improved communication skills and quality of life.",
    image: "src/assets/speech.png",
    alt: "Speech therapy advantages",
  },
];

export default {
  audience: "adult",
  pathSegment: "speech-therapy",
  sortOrder: 1,
  title: "Speech Therapy",
  description:
    "Speech therapy for adults to improve communication skills, confidence, and quality of life, addressing speech, language, and voice disorders.",
  items: [
    "Articulation disorders",
    "Fluency disorders",
    "Voice disorders",
    "Language disorders",
    "Personalized treatment plans",
    "Evidence-based therapies",
    "Support for confidence and self-esteem",
  ],
  iconKey: "IoExtensionPuzzleOutline",
  headerColor: "#EDE9FE",
  pageTitlePrefix: "Adult",
  pageTitleAccent: "Speech Therapy",
  heroTagline:
    "Speech therapy for adults to improve communication skills, confidence, and quality of life, addressing speech, language, and voice disorders.",
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
