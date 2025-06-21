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
  {
    label: "School Readiness",
    path: "/school-readiness",
  },
  {
    label: "Adult Services",
    path: "/adult-services",
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
    icon: SlBadge,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    label: "30+ Therapists",
    number: "30+",
    icon: GoPeople,
    iconColor: "text-teal-600",
    bgColor: "bg-teal-100",
  },
  {
    label: "150+ Happy Children",
    number: "150+",
    icon: FaRegHeart,
    iconColor: "text-pink-600",
    bgColor: "bg-pink-100",
  },
  {
    label: "15 Pediatric Services",
    number: "15",
    icon: MdOutlineMedicalServices,
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
];

export const aboutUs = {
  title: "Top Choice For Children",
  description:
    "Our team of experienced and dedicated therapists is here to provide the guidance, support, and encouragement needed to overcome challenges and build skills. With our help, individuals can reach their goals and thrive.",
  items: ["Great Staff", "Safety", "Experience", "Activities"],
};
