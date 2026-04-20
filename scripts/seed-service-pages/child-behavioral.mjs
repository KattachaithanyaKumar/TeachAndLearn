import { randomUUID } from "node:crypto";

const k = () => randomUUID();

export default {
  audience: "child",
  pathSegment: "child-behavioral-therapy",
  sortOrder: 2,
  title: "Behavioral Therapy",
  description:
    "Evidence-based interventions to address behavioral challenges and promote positive behaviors.",
  items: ["ADHD", "Oppositional Defiant Disorder", "Conduct Disorder"],
  headerColor: "#E0F2FE",
  pageTitlePrefix: "Child",
  pageTitleAccent: "Behavioral Therapy",
  heroTagline:
    "Evidence-based interventions to address behavioral challenges and promote positive behaviors.",
  showCta: true,
  pageBlocks: [
    {
      _type: "service_page_block_intro_split",
      _key: k(),
      image: { localImagePath: "src/assets/teacher-and-student.JPG" },
      imageAlt: "Behavioral Therapy Session",
      heading: "What is Behavioral Therapy?",
      body:
        "Behavioral therapy is a form of psychotherapy that focuses on modifying problematic behaviors and thoughts to improve a child’s functioning and quality of life. It is often used to treat behavioral disorders such as ADHD, oppositional defiant disorder, and conduct disorder. Our behavioral therapists work with children and their families to develop personalized treatment plans that address the child’s specific needs and goals.",
      maskStyle: "blobCover",
      reverseOrder: false,
    },
    {
      _type: "service_page_block_icon_card_grid",
      _key: k(),
      sectionTitle: "Advantages of Behavioral Therapy",
      sectionSubtitle:
        "The positive effects of behavioral therapy on children's emotional and behavioral well-being are numerous.",
      sectionBg: "gray",
      gridCols: 3,
      cardBg: "white",
      items: [
        {
          iconKey: "FaCheckCircle",
          title: "Develop Healthy Coping Mechanisms",
          description:
            "Helps children learn to manage stress and emotions in a healthy way.",
        },
        {
          iconKey: "FaUsers",
          title: "Improve Social and Communication Skills",
          description:
            "Enhances the ability to interact effectively with others and build relationships.",
        },
        {
          iconKey: "FaBrain",
          title: "Develop Positive Thought Patterns",
          description: "Encourages optimistic thinking and a positive outlook on life.",
        },
        {
          iconKey: "FaSmile",
          title: "Address a Wide Range of Behavioral Concerns",
          description:
            "Effective for anxiety, depression, anger management, and disruptive behavior.",
        },
        {
          iconKey: "FaShieldAlt",
          title: "Safe and Supportive Environment",
          description:
            "A secure space for children to explore emotions and develop new skills.",
        },
        {
          iconKey: "FaHeart",
          title: "Develop Healthy Habits and Behaviors",
          description:
            "Lays the foundation for a lifetime of positive habits and well-being.",
        },
      ],
    },
    {
      _type: "service_page_block_two_column_plain",
      _key: k(),
      image: { localImagePath: "src/assets/why-us.jpg" },
      imageAlt: "Early intervention",
      heading: "Importance of Early Intervention",
      body:
        "Early intervention in behavioral therapy is essential in preventing more serious behavioral issues from developing later in life. Our behavioral therapists work with children as early as possible to address any behavioral concerns and provide targeted interventions. By identifying and addressing problematic behaviors early on, we can help children develop healthy coping mechanisms, social skills, and emotional regulation techniques to prevent more significant issues in the future.",
      reverseOrder: false,
      sectionBg: "white",
      mobileImageBelow: false,
      leadWithText: false,
    },
    {
      _type: "service_page_block_two_column_plain",
      _key: k(),
      image: { localImagePath: "src/assets/facility.jpg" },
      imageAlt: "Behavioral assessment",
      heading: "Why Behavioral Therapy?",
      body:
        "At our child development center, we understand the importance of conducting a thorough behavioral assessment to identify the child’s unique needs and challenges. Our behavioral therapists use a variety of tools and techniques, such as interviews, observations, and standardized assessments, to gain a comprehensive understanding of the child’s behavior and functioning. This assessment is used to develop an individualized treatment plan that addresses the child’s specific needs and goals.",
      reverseOrder: false,
      sectionBg: "gray",
      mobileImageBelow: false,
      leadWithText: true,
    },
  ],
};
