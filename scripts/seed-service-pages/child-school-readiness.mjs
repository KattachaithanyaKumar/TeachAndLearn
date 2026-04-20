import { randomUUID } from "node:crypto";

const k = () => randomUUID();

export default {
  audience: "child",
  pathSegment: "school-readiness",
  sortOrder: 4,
  title: "School Readiness",
  description:
    "Comprehensive program to prepare children for academic success.",
  items: [
    "Mind & Body",
    "Scholastics",
    "Creative",
    "Self-Identity",
    "Thinking Skills",
    "Community & Culture",
    "Exploration",
    "Holistic approach",
  ],
  headerColor: "#E0F2FE",
  pageTitlePrefix: "School Readiness",
  pageTitleAccent: "Program",
  heroTagline:
    "A customized intervention program to help children with unique learning and behavioral challenges transition into mainstream schooling.",
  showCta: true,
  pageBlocks: [
    {
      _type: "service_page_block_intro_split",
      _key: k(),
      image: { localImagePath: "src/assets/teacher-and-student.JPG" },
      imageAlt: "teacher and student",
      heading: "What is the School Readiness Program?",
      body:
        "The School Readiness Program is a customized intervention program designed to aid children with distinctive learning and behavioral challenges in transitioning into mainstream schooling. To optimize each child’s potential, we have a team of highly motivated and qualified educators, speech therapists, and occupational therapists who conduct group sessions as part of our comprehensive program.",
      maskStyle: "blobContain",
      reverseOrder: false,
    },
    {
      _type: "service_page_block_icon_card_grid",
      _key: k(),
      sectionTitle: "Who Is It For?",
      sectionSubtitle:
        "The SRP is designed for children who need extra support to develop various skills for a smooth transition to school.",
      sectionBg: "white",
      gridCols: 3,
      cardBg: "gray",
      items: [
        {
          iconKey: "FaChild",
          title: "Group Readiness Skills",
          description: "Developing skills to participate effectively in group settings.",
        },
        {
          iconKey: "FaBook",
          title: "Early Academics",
          description: "Engaging in foundational academic concepts.",
        },
        {
          iconKey: "FaUsers",
          title: "Social Skills",
          description: "Enhancing interaction and communication with peers.",
        },
        {
          iconKey: "FaPenFancy",
          title: "Fine Motor Skills",
          description:
            "Improving hand and finger coordination for tasks like writing.",
        },
        {
          iconKey: "FaComments",
          title: "Language and Communication",
          description: "Developing verbal and non-verbal communication abilities.",
        },
      ],
    },
    {
      _type: "service_page_block_intro_split",
      _key: k(),
      image: { localImagePath: "src/assets/why-us.jpg" },
      imageAlt: "Why us",
      heading: "How Are We Different?",
      body:
        "Our SRP features a personalized and dynamic multidisciplinary approach with low student-to-teacher ratios and integrated speech therapy. We boast a highly trained staff and on-site access to a range of specialists, including speech and language therapists, occupational therapists, psychological and educational therapists, and specialist teachers.",
      maskStyle: "blobContain",
      reverseOrder: true,
    },
    {
      _type: "service_page_block_icon_card_grid",
      _key: k(),
      sectionTitle: "How Do We Do It?",
      sectionSubtitle:
        "We devise a customized individual educational plan (IEP) for each child.",
      sectionBg: "white",
      gridCols: 3,
      cardBg: "gray",
      items: [
        {
          iconKey: "FaChalkboardTeacher",
          title: "Individual Educational Plan (IEP)",
          description:
            "A customized plan is created for each child to address their unique strengths and challenges.",
        },
        {
          iconKey: "FaUserFriends",
          title: "Collaborative Approach",
          description:
            "Our team of specialists, including teachers, occupational therapists, and speech therapists, work together on the IEP.",
        },
        {
          iconKey: "FaHandsHelping",
          title: "Harnessing Strengths",
          description:
            "The personalized plan is designed to build on each child's strengths to help them achieve their goals.",
        },
      ],
    },
    {
      _type: "service_page_block_goals_split",
      _key: k(),
      sectionTitle: "What Would Be Next for Your Child?",
      sectionSubtitle:
        "The primary objective of the SRP is to provide students with the requisite skills to successfully participate in mainstream educational settings.",
      sectionBg: "gray",
      reverseLayout: false,
      image: { localImagePath: "src/assets/teacher-and-student.JPG" },
      imageAlt: "Goals",
      goals: [
        {
          iconKey: "FaUserGraduate",
          text: "Provide students with the skills to succeed in mainstream educational settings.",
        },
        {
          iconKey: "FaSchool",
          text: "Promote a seamless transition to mainstream education.",
        },
        {
          iconKey: "FaPuzzlePiece",
          text: "Offer adaptable and flexible full-time and part-time programs.",
        },
      ],
    },
  ],
};
