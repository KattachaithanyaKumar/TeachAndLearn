import { SlBadge } from "react-icons/sl";
import { GoPeople } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineMedicalServices } from "react-icons/md";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { TbChartBubble } from "react-icons/tb";
import { MdOutlineToys } from "react-icons/md";
import { PiLego } from "react-icons/pi";
import { TbHorse } from "react-icons/tb";
import { PiTrainSimple } from "react-icons/pi";
import { BiTargetLock } from "react-icons/bi";
import { TbMicroscope } from "react-icons/tb";
import { MdFamilyRestroom } from "react-icons/md";
import { FiThumbsUp } from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";
import * as BsIcons from "react-icons/bs";
import * as SlIcons from "react-icons/sl";
import * as GoIcons from "react-icons/go";
import * as IoIcons from "react-icons/io5";
import * as TbIcons from "react-icons/tb";
import * as PiIcons from "react-icons/pi";
// add more as needed

export const allIcons = {
  ...FaIcons,
  ...MdIcons,
  ...GiIcons,
  ...BsIcons,
  ...SlIcons,
  ...GoIcons,
  ...IoIcons,
  ...TbIcons,
  ...PiIcons,
};

export const projectId = "fsko8ofn";
export const navItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about-us",
  },
  {
    label: "Child Services",
    path: "/child-services",
  },
  // {
  //   label: "School Readiness",
  //   path: "/school-readiness",
  // },
  {
    label: "Adult Services",
    path: "/adult-services",
  },
  {
    label: "Facilities",
    path: "/facilities"
  },
  {
    label: "Franchises",
    path: "/franchises",
  },
  {
    label: "Contact",
    path: "/contact-us",
  },
];

export const statistics = [
  {
    label: "5+ Years Experience",
    number: "5+",
    icon: SlIcons.SlBadge,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    label: "30+ Therapists",
    number: "30+",
    icon: GoIcons.GoPeople,
    iconColor: "text-teal-600",
    bgColor: "bg-teal-100",
  },
  {
    label: "150+ Happy Children",
    number: "150+",
    icon: FaIcons.FaRegHeart,
    iconColor: "text-pink-600",
    bgColor: "bg-pink-100",
  },
  {
    label: "15 Pediatric Services",
    number: "15",
    icon: MdIcons.MdOutlineMedicalServices,
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
];

export const aboutUs = {
  title: "Top Choice For Children",
  description:
    "Our team of experienced and dedicated therapists is here to provide the guidance, support, and encouragement needed to overcome challenges and build skills. With our help, individuals can reach their goals and thrive.",
  items: [
    {
      title: "Great Staff",
      description: " Our carers respond every time with a big warm smile.",
    },
    {
      title: "Safety",
      description:
        "We keep your child safe and happy with careful supervision and child-friendly surroundings.",
    },
    {
      title: "Experience",
      description:
        "We provide enriching experiences that help children learn and thrive.",
    },
    {
      title: "Activities",
      description:
        "At our Teach And Learn, kids have fun while learning through various enjoyable activities.",
    },
  ],
};

export const services = [
  {
    name: "Speech Therapy",
    description:
      "It is an essential intervention for children who struggle with communication.",
    icon: IoExtensionPuzzleOutline,
  },
  {
    name: "Occupational Therapy",
    description:
      "It is a form of therapy that helps children develop the skills they need to perform activities.",
    icon: TbChartBubble,
  },
  {
    name: "Behavioral Therapy",
    description:
      "Behavioral therapy is a form of psychotherapy that focuses on modifying problematic behaviors.",
    icon: MdOutlineToys,
  },
  {
    name: "Physiotherapy",
    description:
      "It is a type of therapy that focuses on helping children improve their physical function and mobility.",
    icon: PiLego,
  },
  {
    name: "School Readiness",
    description:
      "Our unwavering dedication to providing top-notch support and guidance is at the forefront of everything we do.",
    icon: TbHorse,
  },
  {
    name: "Psychology",
    description:
      "It focuses on helping individuals communicate effectively and promote healthier relationships and personal growth.",
    icon: PiTrainSimple,
  },
];

export const whyUs = {
  heading: "Experience, Expertise & Personalized Approach",
  description:
    "Our center offers expert therapy in areas like behavior, speech, and occupational development. We personalize every treatment plan to meet each individual’s needs, ensuring care is compassionate, supportive, and effective.",

  approaches: [
    { label: "Holistic Approach", icon: BiTargetLock },
    { label: "Science Based Research", icon: TbMicroscope },
    { label: "Parent Report Support", icon: MdFamilyRestroom },
    { label: "Best Quality Service", icon: FiThumbsUp },
  ],
};

export const ourPhilosophy = {
  heading: "Fostering Growth and Success Through Collaboration and Partnership",
  description:
    "At our center, we believe that success comes from collaboration and partnership. We work closely with families, caregivers, and other professionals to ensure that every individual receives the support they need to achieve their goals. We also believe in the importance of ongoing communication and collaboration, as we work together to monitor progress and make adjustments to treatment plans as needed.",
};

export const testimonials = [
  {
    review:
      "Good therapy given to child, finding improvement in my child, training staff OT, BT are friendly and giving good guidance...... overall teach and learn development center... The ambiance is good and also the supporting staff too...",
    author: "V Sai Reddy",
    rating: 5,
  },
  {
    review: "Good and safe environment for kids to learn and play.",
    author: "Ancha Venkateswararao",
    rating: 5,
  },
  {
    review:
      "Everyone there is good-natured and sympathetic. My son's therapy sessions are his favorite part of the week because of the fantastic job they've done with him.",
    author: "Vennam Rama Krishna Reddy",
    rating: 5,
  },
  {
    review:
      "we had a great experience with Sharmila and Likitha Madam. My son improved a lot in 3 months. He got a a very good difference in the speech and OT. Over all good center for the children development.",
    author: "naveen lakshmi",
    rating: 5,
  },
];

export const childServices = [
  {
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
  },
  {
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
  },
  {
    title: "Behavioral Therapy",
    description:
      "Evidence-based interventions to address behavioral challenges and promote positive behaviors.",
    items: ["ADHD", "Oppositional Defiant Disorder", "Conduct Disorder"],
  },
  {
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
  },
  {
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
  },
  // {
  //   title: "Psychology",
  //   description:
  //     "focuses on helping individuals communicate effectively and promote healthier relationships and personal growth.",
  //   items: [
  //     "express their thoughts",
  //     "communication challenges",
  //     "interpersonal relationships",
  //   ],
  // },
];

export const adultServices = [
  {
    title: "Psychology",
    description:
      "Personalized psychiatric care for adults, addressing mental health conditions such as anxiety, depression, bipolar disorder, and more.",
    items: [
      "Diagnosis & treatment of mental illnesses",
      "Personalized treatment plans",
      "Medication management",
      "Therapy & lifestyle changes",
      "Support for anxiety, depression, bipolar disorder, schizophrenia, substance use disorders"
    ],
    icon: PiTrainSimple,
  },
  {
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
      "Support for confidence and self-esteem"
    ],
    icon: IoExtensionPuzzleOutline,
  },
  {
    title: "Physical Therapy",
    description:
      "Physical therapy for adults to restore function, reduce pain, and prevent disability through exercise and manual therapy.",
    items: [
      "Restoration of physical function",
      "Pain reduction",
      "Prevention of disability",
      "Personalized exercise plans",
      "Rehabilitation for injuries, arthritis, stroke, neurological disorders",
      "Chronic condition management"
    ],
    icon: PiLego,
  },
  {
    title: "Behavioral Therapy",
    description:
      "Behavioral therapy for adults to change unwanted behaviors, manage emotions, and develop positive coping skills.",
    items: [
      "Addressing anxiety, depression, anger, addiction, phobias",
      "Coping skills development",
      "Personalized treatment plans",
      "Evidence-based therapies",
      "Support for mental health and well-being"
    ],
    icon: MdOutlineToys,
  },
];
