import { randomUUID } from "node:crypto";

const k = () => randomUUID();

export default {
  audience: "child",
  pathSegment: "occupational",
  sortOrder: 1,
  title: "Occupational Therapy",
  description:
    "Helping children develop fine motor skills, sensory processing, and daily living skills.",
  items: [
    "Developmental Milestones",
    "Sensory Processing",
    "Fine Motor Skills",
    "Gross Motor Skills",
    "Play Skills",
    "Self-Care Skills",
    "School Readiness",
  ],
  headerColor: "#E0F2FE",
  pageTitlePrefix: "Child",
  pageTitleAccent: "Occupational Therapy",
  heroTagline:
    "Helping children develop fine motor skills, sensory processing, and daily living skills.",
  showCta: true,
  pageBlocks: [
    {
      _type: "service_page_block_intro_split",
      _key: k(),
      image: { localImagePath: "src/assets/occupational.jpg" },
      imageAlt: "Occupational therapy session",
      heading: "Assessing a Child's Functional Abilities and Needs",
      body:
        "It is a form of therapy that helps children develop the skills they need to perform activities of daily living, such as self-care, play, and school-related tasks. Our occupational therapists work with children to improve their fine motor skills, gross motor skills, visual perception, sensory integration, attention, and executive functioning. By addressing a child’s unique needs, our occupational therapy program helps children build the necessary skills to function effectively and achieve greater independence.",
      maskStyle: "blobContain",
      reverseOrder: false,
    },
    {
      _type: "service_page_block_icon_card_grid",
      _key: k(),
      sectionTitle: "Key Components of Pediatric Occupational Therapy",
      sectionSubtitle:
        "Occupational therapy supports children in mastering essential skills needed for independence, learning, and healthy development.",
      sectionBg: "white",
      gridCols: 3,
      cardBg: "gray",
      items: [
        {
          iconKey: "FaChild",
          title: "Developmental Milestones",
          description:
            "Evaluating fine motor skills, hand-eye coordination, sensory processing, and self-care abilities to identify delays or challenges.",
        },
        {
          iconKey: "FaBrain",
          title: "Sensory Processing",
          description:
            "Helping children regulate emotional and behavioral responses to sensory stimuli like touch, sound, and movement.",
        },
        {
          iconKey: "FaPenFancy",
          title: "Fine Motor Skills",
          description:
            "Developing precise hand and finger movements for tasks like writing, drawing, and using tools or utensils.",
        },
        {
          iconKey: "FaWalking",
          title: "Gross Motor Skills",
          description:
            "Building coordination, strength, and balance for activities such as walking, running, jumping, and playing.",
        },
        {
          iconKey: "FaPuzzlePiece",
          title: "Play Skills",
          description:
            "Using play-based learning to boost social interaction, imagination, and cognitive problem-solving.",
        },
        {
          iconKey: "FaHandsWash",
          title: "Self-Care Skills",
          description:
            "Helping children gain independence in daily tasks like dressing, eating, grooming, and toileting.",
        },
        {
          iconKey: "FaSchool",
          title: "School Readiness",
          description:
            "Improving focus, attention, organization, and handwriting to prepare children for academic success.",
        },
      ],
    },
    {
      _type: "service_page_block_media_side_icon_list",
      _key: k(),
      sectionTitle: "Techniques and Interventions",
      sectionSubtitle:
        "Occupational therapists use evidence-based approaches to support children's sensory, motor, and functional development.",
      image: { localImagePath: "src/assets/occupational.jpg" },
      imageAlt: "Occupational therapy techniques",
      imageLeft: true,
      items: [
        {
          iconKey: "FaPuzzlePiece",
          title: "Sensory Integration Therapy",
          description:
            "Using activities to address sensory processing challenges, helping children respond appropriately to sensory stimuli.",
        },
        {
          iconKey: "FaSmileBeam",
          title: "Therapeutic Play",
          description:
            "Engaging children in purposeful and enjoyable activities to develop skills and address specific challenges.",
        },
        {
          iconKey: "FaRunning",
          title: "Fine and Gross Motor Activities",
          description:
            "Implementing exercises and games to improve coordination, strength, and balance.",
        },
        {
          iconKey: "FaTools",
          title: "Adaptive Equipment and Strategies",
          description:
            "Recommending and teaching the use of adaptive tools or techniques to aid children in completing tasks independently.",
        },
        {
          iconKey: "FaHandsHelping",
          title: "Parent and Caregiver Education",
          description:
            "Educating parents and caregivers about techniques and activities to support their child's development at home.",
        },
      ],
    },
    {
      _type: "service_page_block_goals_split",
      _key: k(),
      sectionTitle: "Goals of Pediatric Occupational Therapy",
      sectionSubtitle:
        "Pediatric occupational therapists collaborate with parents, teachers, and other healthcare professionals to create individualized treatment plans that support independence, learning, and overall well-being.",
      sectionBg: "gray",
      reverseLayout: false,
      image: { localImagePath: "src/assets/Occupational-Therapy-1-1.jpg" },
      imageAlt: "Occupational therapy goals",
      goals: [
        {
          iconKey: "FaChild",
          text: "Enhance a child's independence in daily activities.",
        },
        {
          iconKey: "FaHandsHelping",
          text: "Improve social interactions and play skills.",
        },
        {
          iconKey: "FaSchool",
          text: "Facilitate successful participation in school-related tasks.",
        },
        {
          iconKey: "FaHeart",
          text: "Support overall development and quality of life.",
        },
      ],
    },
  ],
};
