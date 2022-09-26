import { actionTypes } from "../../consts/actions";

export const tertiaryReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.tertiary.setName:
      return {
        ...state,
        selectedOrganization: {
          ...state.selectedOrganization,
          accountDetails: {
            ...state.selectedOrganization.accountDetails,
            name: action.payload,
          },
        },
      };
    case actionTypes.tertiary.setAbout:
      return {
        ...state,
        selectedOrganization: {
          ...state.selectedOrganization,
          accountDetails: {
            ...state.selectedOrganization.accountDetails,
            about: action.payload,
          },
        },
      };
    case actionTypes.tertiary.setEmail:
      return {
        ...state,
        selectedOrganization: {
          ...state.selectedOrganization,
          accountDetails: {
            ...state.selectedOrganization.accountDetails,
            email: action.payload,
          },
        },
      };
    case actionTypes.tertiary.setPassword:
      return {
        ...state,
        selectedOrganization: {
          ...state.selectedOrganization,
          accountDetails: {
            ...state.selectedOrganization.accountDetails,
            password: action.payload,
          },
        },
      };
    case actionTypes.tertiary.addDepartment:
      return {
        ...state,
        selectedOrganization: {
          ...state.selectedOrganization,
          accountDetails: {
            ...state.selectedOrganization.accountDetails,
            departments: [
              ...state.selectedOrganization.accountDetails.departments,
              action.payload,
            ],
          },
        },
      };
    case actionTypes.tertiary.removeDepartment:
      return {
        ...state,
        selectedOrganization: {
          ...state.selectedOrganization,
          accountDetails: {
            ...state.selectedOrganization.accountDetails,
            departments:
              state.selectedOrganization.accountDetails.departments.filter(
                (department) => department.id !== action.payload
              ),
          },
        },
      };
    case actionTypes.tertiary.editDepartment:
      state.selectedOrganization.accountDetails.departments[
        action.payload.index
      ].value = action.payload.value;
      return {
        ...state,
      };
    default:
      return state;
  }
};
