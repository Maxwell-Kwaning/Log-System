import { FaSchool, FaChurch } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import { GiSchoolBag } from "react-icons/gi";
import { IoBusiness } from "react-icons/io5";
import CreateLog from "../components/CreateLog";
import OrganizationList from "../components/Organization/OrganizationList";
import OrganizationSetup from "../components/Organization/Setup/OrganizationSetup";
import { v4 as uid } from "uuid";
import { isEmail } from "./validate-email";

export const organizations = [
  {
    id: "tertiary",
    name: "Tertiary",
    icon: <MdSchool color="#4b65fb" />,
  },
  {
    id: "pre-tertiary",
    name: "Pre-Tertiary",
    icon: <FaSchool color="#68bb44" />,
  },
  {
    id: "basic-school",
    name: "Basic School",
    icon: <GiSchoolBag color="#ee2761" />,
  },
  {
    id: "church",
    name: "Church",
    icon: <FaChurch color="#6c75a7" />,
  },
  {
    id: "business",
    name: "Business",
    icon: <IoBusiness color="#ec7624" />,
  },
];

export const getSteps = (selectedOrganizationId) => [
  {
    name: "select",
    title: "Choose Organization Type",
    content: <OrganizationList />,
  },
  {
    name: "setup",
    title: "Setup Organization",
    content: <OrganizationSetup organization={selectedOrganizationId} />,
  },
  {
    name: "create",
    title: "Create First log sheet",
    content: <CreateLog />,
  },
];

export const organizationsDefaultState = {
  tertiary: {
    id: uid(),
    name: "",
    about: "",
    departments: [],
    email: "",
    password: "",
  },
};

export const validateTertiaryDetails = (tertiaryDetails) => {
  const email = tertiaryDetails.email.trim();
  return (
    tertiaryDetails.name.trim() !== "" &&
    tertiaryDetails.about.trim() !== "" &&
    email !== "" &&
    isEmail(email) &&
    tertiaryDetails.password.trim() !== ""
  );
};
