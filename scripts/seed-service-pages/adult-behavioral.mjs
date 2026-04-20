import { randomUUID } from "node:crypto";

const k = () => randomUUID();

const sections = [
  {
    heading: "What is Behavioral Therapy?",
    body:
      "Behavioral therapy is a form of treatment that aims to help individuals change unwanted behaviors and develop more positive, adaptive behaviors. Our behavioral therapists work with adults to identify and address behaviors that may be interfering with their daily life, such as anxiety, depression, anger, addiction, and phobias.",
    image: "src/assets/room.jpg",
    alt: "Behavioral therapy room",
  },
  {
    heading: "Why Behavioral Therapy?",
    body:
      "Behavioral therapy can be highly effective for adults who are struggling with a range of issues. By working with a behavioral therapist, adults can learn how to manage their emotions, develop coping skills, and build a more positive outlook on life. Through behavioral therapy, adults can achieve a greater sense of control over their thoughts, feelings, and behaviors, leading to a better quality of life.",
    image: "src/assets/facility.jpg",
    alt: "Therapy facility",
  },
  {
    heading: "Importance of Early Intervention in Behavioral Therapy",
    body:
      "Behavioral therapy is a highly effective treatment option for adults struggling with mental health issues, improving relationships, developing coping skills, increasing self-awareness, and encouraging personal growth. By providing individuals with the tools they need to manage their emotions and behaviors, behavioral therapy can help adults lead healthier, more fulfilling lives, and reduce the risk of negative coping behaviors like substance abuse.",
    image: "src/assets/teacher-and-student.JPG",
    alt: "Therapist and patient",
  },
  {
    heading: "Advantages of Behavioral Therapy",
    body:
      "There are many advantages to working with a behavioral therapist, including personalized treatment plans tailored to individual needs, access to evidence-based therapies and techniques, ongoing support and guidance throughout the therapy process, and improved mental health and well-being.",
    image: "src/assets/facility.jpg",
    alt: "Behavioral therapy advantages",
  },
];

export default {
  audience: "adult",
  pathSegment: "behavioral-therapy",
  sortOrder: 3,
  title: "Behavioral Therapy",
  description:
    "Behavioral therapy for adults to change unwanted behaviors, manage emotions, and develop positive coping skills.",
  items: [
    "Addressing anxiety, depression, anger, addiction, phobias",
    "Coping skills development",
    "Personalized treatment plans",
    "Evidence-based therapies",
    "Support for mental health and well-being",
  ],
  iconKey: "MdOutlineToys",
  headerColor: "#EDE9FE",
  pageTitlePrefix: "Adult",
  pageTitleAccent: "Behavioral Therapy",
  heroTagline:
    "Evidence-based behavioral therapy for adults, supporting emotional well-being and positive life changes.",
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
