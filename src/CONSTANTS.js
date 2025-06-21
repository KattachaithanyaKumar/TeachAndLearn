import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as GiIcons from 'react-icons/gi';
import * as BsIcons from 'react-icons/bs';
import * as SlIcons from 'react-icons/sl';
import * as GoIcons from 'react-icons/go';
import * as IoIcons from 'react-icons/io5';
import * as TbIcons from 'react-icons/tb';
import * as PiIcons from 'react-icons/pi';
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
  items: ["Great Staff", "Safety", "Experience", "Activities"],
};