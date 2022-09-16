import React from "react";
import Tertiary from "./Tertiary";

const OrganizationSetup = ({ organization }) => {
  switch (organization) {
    case "tertiary":
      return <Tertiary />;
    default:
      return <></>;
  }
};

export default OrganizationSetup;
