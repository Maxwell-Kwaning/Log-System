export const actionTypes = {
  addSelectedOrganization: "ADD_SELECTED_ORGANIZATION",
  setOrganizationSetupValidity: "SET_ORGANIZATION_SETUP_VALIDITY",
  setLogSheetName: "SET_LOG_SHEET_NAME",
  setOrganizationDetails: "SET_ORGANIZATION_DETAILS",
  setLogs: "SET_LOGS",
  setUsers: "SET_USERS",

  // tertiary institution actions
  tertiary: {
    setName: "SET_TERTIARY_NAME",
    setAbout: "SET_TERTIARY_ABOUT",
    addDepartment: "ADD_DEPARTMENT",
    removeDepartment: "REMOVE_DEPARTMENT",
    editDepartment: "EDIT_DEPARTMENT",
    setEmail: "SET_TERTIARY_EMAIL",
    setPassword: "SET_TERTIARY_PASSWORD",
  },
};

export const context = {
  tertiary: "TERTIARY",
  preTertiary: "PRE_TERTIARY",
  basicSchool: "BASIC_SCHOOL",
  church: "CHURCH",
  business: "BUSINESS",
};
