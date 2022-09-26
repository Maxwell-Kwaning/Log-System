import React from "react";
import PreTertiary from "./Pre-Tertiary";
import Tertiary from "./Tertiary";

const OrganizationSetup = ({ organization }) => {
  switch (organization) {
    case "tertiary":
      return <Tertiary />;
    case "pre-tertiary":
      return <PreTertiary />;
    default:
      return <></>;
  }
};

export default OrganizationSetup;
