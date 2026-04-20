import { randomUUID } from "node:crypto";

const k = () => randomUUID();

export default {
  audience: "child",
  pathSegment: "child-physiotherapy",
  sortOrder: 3,
  title: "Physiotherapy",
  description:
    "Physical therapy to improve movement, strength, and motor development.",
  items: [
    "Balance and coordination",
    "Muscle strength training",
    "Posture improvement",
    "Mobility training",
    "Exercise programs",
  ],
  headerColor: "#E0F2FE",
  pageTitlePrefix: "Child",
  pageTitleAccent: "Physiotherapy",
  heroTagline: "Helping children improve their physical function and mobility.",
  showCta: true,
  pageBlocks: [
    {
      _type: "service_page_block_intro_split",
      _key: k(),
      image: { localImagePath: "src/assets/occupational.jpg" },
      imageAlt: "Physiotherapy Session",
      heading: "What is Physical Therapy?",
      body:
        "It is a type of therapy that focuses on helping children improve their physical function and mobility. It involves the use of exercise, manual therapy, and other techniques to help children develop strength, flexibility, balance, and coordination. Our physical therapists work with children to identify physical limitations and develop individualized treatment plans to improve their function and overall well-being.",
      maskStyle: "blobCover",
      reverseOrder: false,
    },
    {
      _type: "service_page_block_icon_card_grid",
      _key: k(),
      sectionTitle: "Advantages of Physical Therapy",
      sectionSubtitle:
        "Helping Children Build Confidence and Independence Through Physical Therapy.",
      sectionBg: "gray",
      gridCols: 3,
      cardBg: "white",
      items: [
        {
          iconKey: "FaCheckCircle",
          title: "Recover from Injuries or Illnesses",
          description:
            "Helps children regain their physical abilities after an injury or illness.",
        },
        {
          iconKey: "FaUsers",
          title: "Improve Range of Motion and Flexibility",
          description:
            "Increases flexibility and the ability to move joints through their full range.",
        },
        {
          iconKey: "FaChild",
          title: "Build Strength and Endurance",
          description:
            "Develops muscle strength and stamina for daily activities.",
        },
        {
          iconKey: "FaSmile",
          title: "Reach Full Potential",
          description:
            "Assists children with developmental delays or disabilities to achieve their best.",
        },
        {
          iconKey: "FaShieldAlt",
          title: "Improve Quality of Life",
          description:
            "Enhances overall well-being and the ability to participate in life's activities.",
        },
        {
          iconKey: "FaHeart",
          title: "Gain Confidence and Independence",
          description:
            "Boosts self-esteem and independence through physical achievements.",
        },
      ],
    },
    {
      _type: "service_page_block_two_column_plain",
      _key: k(),
      image: { localImagePath: "src/assets/why-us.jpg" },
      imageAlt: "Early intervention",
      heading: "Why Early Intervention in Physical Therapy Matters?",
      body:
        "Early intervention in physical therapy is critical in helping children achieve their physical goals. Our physical therapists work with children as early as possible to identify physical limitations and develop treatment plans to address them. By intervening early, we can help children develop the skills they need to reach their full physical potential and improve their overall health and well-being.",
      reverseOrder: false,
      sectionBg: "white",
      mobileImageBelow: false,
      leadWithText: false,
    },
    {
      _type: "service_page_block_two_column_plain",
      _key: k(),
      image: { localImagePath: "src/assets/facility.jpg" },
      imageAlt: "Physical therapy importance",
      heading: "Importance of Physical Therapy",
      body:
        "It is important for children for a variety of reasons. It can help them recover from injuries or illnesses, improve their range of motion and flexibility, and build strength and endurance. It can also help children with developmental delays or disabilities to reach their full potential and improve their quality of life.",
      reverseOrder: false,
      sectionBg: "gray",
      mobileImageBelow: false,
      leadWithText: true,
    },
  ],
};
