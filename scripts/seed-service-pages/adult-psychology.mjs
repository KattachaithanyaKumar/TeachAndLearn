import { randomUUID } from "node:crypto";

const k = () => randomUUID();

const sections = [
  {
    heading: "What is Psychiatry?",
    body:
      "Our psychiatrists specialize in diagnosing, treating, and preventing mental illnesses and disorders in adults. They are medical doctors who have undergone extensive training to understand the complexities of the human mind and behavior, and how these interact with physical health. We work with adult patients to develop personalized treatment plans that address a wide range of mental health conditions, including anxiety, depression, bipolar disorder, schizophrenia, and substance use disorders.",
    image: "src/assets/facility.jpg",
    alt: "Psychiatry consultation facility",
  },
  {
    heading: "Why Psychiatry?",
    body:
      "Mental health conditions can significantly impact an individual’s overall well-being and quality of life. Our psychiatrists are trained to provide effective treatments for mental health conditions and help individuals manage their symptoms, improve their mental health, and lead fulfilling lives. Seeking psychiatric care can also help identify and address underlying mental health conditions that may be contributing to physical health problems.",
    image: "src/assets/room.jpg",
    alt: "Therapy room",
  },
  {
    heading: "Importance of Psychiatry",
    body:
      "Psychiatric care is crucial in promoting mental health and well-being for adults. Our psychiatrists work with patients to develop individualized treatment plans that address their unique needs, including medication management, therapy, and lifestyle changes. With proper treatment, individuals can improve their mental health, better manage their symptoms, and improve their overall quality of life.",
    image: "src/assets/teacher-and-student.JPG",
    alt: "Therapist and patient",
  },
  {
    heading: "Advantages of Psychiatry",
    body:
      "Our team provides compassionate care and personalized treatment plans tailored to the unique needs of each patient. With our expertise in treating mental health conditions, patients can benefit from improved mental health, reduced symptoms, and a better quality of life. In addition, seeking psychiatric care can help individuals identify and address underlying mental health conditions that may be contributing to physical health problems.",
    image: "src/assets/facility.jpg",
    alt: "Psychiatry advantages",
  },
];

export default {
  audience: "adult",
  pathSegment: "psychology",
  sortOrder: 0,
  title: "Psychology",
  description:
    "Personalized psychiatric care for adults, addressing mental health conditions such as anxiety, depression, bipolar disorder, and more.",
  items: [
    "Diagnosis & treatment of mental illnesses",
    "Personalized treatment plans",
    "Medication management",
    "Therapy & lifestyle changes",
    "Support for anxiety, depression, bipolar disorder, schizophrenia, substance use disorders",
  ],
  iconKey: "PiTrainSimple",
  headerColor: "#EDE9FE",
  pageTitlePrefix: "Adult",
  pageTitleAccent: "Psychology",
  heroTagline:
    "Comprehensive psychiatric and psychological care for adults, focusing on mental health, well-being, and personal growth.",
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
    blobMask: "blob3",
  })),
};
