import { randomUUID } from "node:crypto";

const k = () => randomUUID();

export default {
  audience: "child",
  pathSegment: "speech-rhetoric",
  sortOrder: 1,
  title: "Speech & Rhetoric Programs",
  description:
    "Specialized programs to develop children's public speaking, presentation skills, and rhetorical abilities.",
  items: [
    "Public Speaking Skills",
    "Presentation Techniques",
    "Debate and Argumentation",
    "Storytelling and Narration",
    "Speech Clarity and Articulation",
    "Confidence Building",
    "Communication Strategy",
    "Persuasive Speaking",
  ],
  headerColor: "#E0F2FE",
  pageTitlePrefix: "Child",
  pageTitleAccent: "Speech & Rhetoric Programs",
  heroTagline:
    "Specialized programs to develop children's public speaking, presentation skills, and rhetorical abilities.",
  showCta: true,
  pageBlocks: [
    {
      _type: "service_page_block_intro_split",
      _key: k(),
      image: { localImagePath: "src/assets/speech.png" },
      imageAlt: "student presenting in front of an audience",
      heading: "Building Confident Public Speakers",
      body:
        "Our Speech & Rhetoric Programs are designed to help children develop essential communication and presentation skills. Through structured lessons and practice, children learn to speak confidently, express their ideas clearly, and engage audiences effectively. Whether preparing for school presentations, debates, or public speaking events, our programs provide the foundation for success in academics and beyond.",
      maskStyle: "blobCover",
      reverseOrder: false,
    },
    {
      _type: "service_page_block_icon_card_grid",
      _key: k(),
      sectionTitle: "Why Speech & Rhetoric Programs Matter",
      sectionSubtitle:
        "Discover how developing rhetorical skills enhances communication, confidence, and academic success.",
      sectionBg: "gray",
      gridCols: 3,
      cardBg: "white",
      items: [
        {
          iconKey: "FaMicrophone",
          title: "Public Speaking Confidence",
          description:
            "Builds confidence through structured practice and positive reinforcement in safe learning environments.",
        },
        {
          iconKey: "FaComments",
          title: "Clear Communication",
          description:
            "Develops ability to articulate ideas clearly and persuasively to different audiences.",
        },
        {
          iconKey: "FaBrain",
          title: "Critical Thinking",
          description:
            "Enhances analytical skills through debate, argumentation, and structured reasoning.",
        },
        {
          iconKey: "FaPresent",
          title: "Presentation Skills",
          description:
            "Teaches effective use of visuals, body language, and vocal techniques for engaging presentations.",
        },
        {
          iconKey: "FaBook",
          title: "Storytelling Mastery",
          description:
            "Develops narrative skills and ability to captivate audiences through compelling storytelling.",
        },
        {
          iconKey: "FaAward",
          title: "Academic Success",
          description:
            "Improves performance in class discussions, presentations, and competitive speaking events.",
        },
      ],
    },
    {
      _type: "service_page_block_split_disorders",
      _key: k(),
      sectionTitle: "Program Components",
      sectionSubtitle:
        "Our comprehensive approach covers all aspects of effective communication.",
      sectionBg: "white",
      items: [
        {
          title: "Public Speaking Fundamentals",
          description:
            "Introduction to public speaking techniques, stage presence, and audience engagement strategies.",
        },
        {
          title: "Presentation Skills",
          description:
            "Development of skills to create and deliver effective presentations with visual aids and multimedia.",
        },
        {
          title: "Debate and Argumentation",
          description:
            "Training in constructing logical arguments, counter-arguments, and persuasive techniques.",
        },
        {
          title: "Storytelling and Narration",
          description:
            "Techniques for crafting compelling narratives and delivering them with expression and emotion.",
        },
        {
          title: "Confidence Building",
          description:
            "Structured exercises to overcome speech anxiety and build self-confidence in communication.",
        },
        {
          title: "Advanced Rhetoric",
          description:
            "Study of rhetorical devices, persuasive strategies, and effective communication patterns.",
        },
      ],
    },
  ],
};
