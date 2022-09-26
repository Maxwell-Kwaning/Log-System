import { Timestamp } from "firebase/firestore";

export const getLogSheetDetails = (id, logSheetName) => {
  const { origin } = window.location;
  const logLink = `${origin}/log/${id}`;
  return {
    id,
    logSheetName,
    logLink,
    status: "inactive",
    createdAt: Timestamp.now(),
  };
};

export const getAccountDetails = (organizationDetails) => {
  return {
    ...organizationDetails,
    createdAt: Timestamp.now(),
  };
};
