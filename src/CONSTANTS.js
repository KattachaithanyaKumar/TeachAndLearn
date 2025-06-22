import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as GiIcons from 'react-icons/gi';
import * as BsIcons from 'react-icons/bs';
import * as SlIcons from 'react-icons/sl';
import * as GoIcons from 'react-icons/go';
import * as IoIcons from 'react-icons/io5';
import * as TbIcons from 'react-icons/tb';
import * as PiIcons from 'react-icons/pi';

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

export const aboutUs = {
  title: "Top Choice For Children",
  description:
    "Our team of experienced and dedicated therapists is here to provide the guidance, support, and encouragement needed to overcome challenges and build skills. With our help, individuals can reach their goals and thrive.",
  items: ["Great Staff", "Safety", "Experience", "Activities"],
};