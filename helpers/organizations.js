import { FaSchool, FaChurch } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import { GiSchoolBag } from "react-icons/gi";
import { IoBusiness } from "react-icons/io5";

export const organizations = [
  {
    id: "01328569-c791-45cd-869d-f4bb22a6869d",
    name: "Tertiary",
    icon: <MdSchool color="#4b65fb" />,
    href: "#",
  },
  {
    id: "4824ad3e-c465-4ffb-aaaf-f89f877aaa4b",
    name: "Pre-Tertiary",
    icon: <FaSchool color="#68bb44" />,
    href: "#",
  },
  {
    id: "203d0205-109a-4e5d-9588-4e5ebaec4f71",
    name: "Basic School",
    icon: <GiSchoolBag color="#ee2761" />,
    href: "#",
  },
  {
    id: "bdec8dbb-6278-43e2-808a-666654bab423",
    name: "Church",
    icon: <FaChurch color="#6c75a7" />,
    href: "#",
  },
  {
    id: "88ec3197-34c5-4bcf-a786-1afe14e06355",
    name: "Business",
    icon: <IoBusiness color="#ec7624" />,
    href: "#",
  },
];
