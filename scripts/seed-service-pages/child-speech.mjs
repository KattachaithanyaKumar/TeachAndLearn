import { randomUUID } from "node:crypto";

const k = () => randomUUID();

export default {
  audience: "child",
  pathSegment: "speech",
  sortOrder: 0,
  title: "Speech Therapy",
  description:
    "Comprehensive speech and language therapy to help children communicate effectively.",
  items: [
    "Articulation Disorder",
    "Voice Disorder",
    "Dysprosody",
    "Mutism",
    "Stuttering",
    "Childhood Apraxia of Speech",
    "Apraxia of Speech",
    "Dysarthria",
    "Phonological Disorder",
    "Cluttering",
  ],
  headerColor: "#E0F2FE",
  pageTitlePrefix: "Child",
  pageTitleAccent: "Speech Therapy",
  heroTagline:
    "Comprehensive speech and language therapy to help children communicate effectively.",
  showCta: true,
  pageBlocks: [
    {
      _type: "service_page_block_intro_split",
      _key: k(),
      image: { localImagePath: "src/assets/speech.png" },
      imageAlt: "teacher and student in a study session",
      heading: "Helping Communicate Effectively",
      body:
        "It is an essential intervention for children who struggle with communication. It can be used to treat various developmental disorders, such as autism, Down syndrome, and hearing impairment. Speech therapy is vital in helping children develop the necessary skills to participate fully in daily life, succeed academically, and socially. Our speech therapists provide targeted interventions to address a child’s individual needs and help them achieve their full potential.",
      maskStyle: "blobCover",
      reverseOrder: false,
    },
    {
      _type: "service_page_block_icon_card_grid",
      _key: k(),
      sectionTitle: "Why Speech Therapy Matters",
      sectionSubtitle:
        "Discover the many ways speech therapy supports communication, confidence, and quality of life.",
      sectionBg: "gray",
      gridCols: 3,
      cardBg: "white",
      items: [
        {
          iconKey: "FaComments",
          title: "Improved Communication Skills",
          description:
            "Addresses sound errors, language delays, and disorders for clearer expression of thoughts and ideas.",
        },
        {
          iconKey: "FaChalkboardTeacher",
          title: "Enhanced Language Development",
          description: "Improves both verbal and non-verbal communication abilities.",
        },
        {
          iconKey: "FaSmile",
          title: "Increased Confidence",
          description:
            "Boosts self-confidence in social, academic, and professional settings.",
        },
        {
          iconKey: "MdAccessibility",
          title: "Better Swallowing and Feeding",
          description:
            "Helps with safe, efficient swallowing to prevent aspiration and support nutrition.",
        },
        {
          iconKey: "MdRecordVoiceOver",
          title: "Management of Voice Disorders",
          description:
            "Improves vocal quality, pitch, and loudness for comfortable speech.",
        },
        {
          iconKey: "FaCommentDots",
          title: "Treatment for Fluency Disorders",
          description:
            "Supports individuals who stutter to improve fluency and confidence.",
        },
        {
          iconKey: "FaBrain",
          title: "Support for Cognitive-Communication Skills",
          description:
            "Enhances memory, attention, and problem-solving in individuals with cognitive impairments.",
        },
        {
          iconKey: "FaChild",
          title: "Early Intervention for Children",
          description:
            "Boosts early language development, aiding academic and social success.",
        },
        {
          iconKey: "FaRobot",
          title: "Assistive Technology Implementation",
          description:
            "Empowers limited speech individuals with AAC devices for effective communication.",
        },
        {
          iconKey: "FaUserShield",
          title: "Individualized Treatment Plans",
          description:
            "Tailored strategies ensure focused interventions and progress tracking.",
        },
        {
          iconKey: "FaUserFriends",
          title: "Support for Families and Caregivers",
          description:
            "Guides families and caregivers to effectively support communication and swallowing needs.",
        },
      ],
    },
    {
      _type: "service_page_block_icon_card_stack",
      _key: k(),
      sideImage: { localImagePath: "src/assets/speech-ages.png" },
      sideImageAlt: "Speech therapy by age group",
      imageLeft: true,
      columnTitle: "Client Age Groups",
      items: [
        {
          iconKey: "GiBabyBottle",
          title: "Infants and Toddlers",
          description:
            "Early speech therapy addresses infant/toddler developmental delays, feeding issues, and communication disorders, with SLPs collaborating with parents for early skill support.",
        },
        {
          iconKey: "FaCommentDots",
          title: "Preschool-Aged Children",
          description:
            "This age group gets speech therapy for sound disorders, language delays, articulation, stuttering, and early social skills for school readiness.",
        },
        {
          iconKey: "GiSchoolBag",
          title: "School-Aged Children",
          description:
            "Speech therapy for school-aged children improves language, articulation, social communication, literacy, and academic success, addressing challenges in learning and classroom participation.",
        },
      ],
    },
    {
      _type: "service_page_block_split_disorders",
      _key: k(),
      introTitle: "Names of Speech Disorders",
      introBody:
        "SLPs work with individuals who have difficulties producing speech sounds, such as articulation disorders (errors in pronunciation), phonological disorders (sound patterns affecting speech clarity), apraxia of speech (difficulty coordinating speech movements), and dysarthria (muscle weakness affecting speech). They also address fluency and voice-related conditions.",
      disorders: [
        "Articulation Disorder",
        "Phonological Disorder",
        "Apraxia of Speech",
        "Dysarthria",
        "Stuttering (Fluency Disorder)",
        "Voice Disorder",
        "Cluttering",
        "Childhood Apraxia of Speech",
        "Dysprosody",
        "Mutism",
      ],
      centerImage: { localImagePath: "src/assets/Speach-Therapy-Disorder.jpg" },
      centerImageAlt: "Various types of speech disorders",
    },
  ],
};
