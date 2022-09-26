import { actionTypes, context } from "../../consts/actions";
import { tertiaryReducer } from "./tertiary";

export const appReducer = (state, action) => {
  if (action.context != null) {
    switch (action.context) {
      case context.tertiary:
        return tertiaryReducer(state, action);
      default:
        return state;
    }
  }

  switch (action.type) {
    case actionTypes.addSelectedOrganization:
      return { ...state, selectedOrganization: action.payload };
    case actionTypes.setOrganizationSetupValidity:
      return { ...state, isOrganizationSetupValid: action.payload };
    case actionTypes.setLogSheetName:
      return { ...state, logSheetName: action.payload };
    case actionTypes.setOrganizationDetails:
      return { ...state, organizationDetails: action.payload };
    default:
      return state;
  }
};
