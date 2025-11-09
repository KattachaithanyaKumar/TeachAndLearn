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
import * as BiIcons from "react-icons/bi";
import * as FiIcons from "react-icons/fi";
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
  ...BiIcons,
  ...FiIcons,
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

export const childServices = [
  {
    title: "Speech Therapy",
    path: "speech",
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
    path: "occupational",
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
    path: "child-behavioral-therapy",
    description:
      "Evidence-based interventions to address behavioral challenges and promote positive behaviors.",
    items: ["ADHD", "Oppositional Defiant Disorder", "Conduct Disorder"],
  },
  {
    title: "Physiotherapy",
    path: "child-physiotherapy",
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
    path: "school-readiness",
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
