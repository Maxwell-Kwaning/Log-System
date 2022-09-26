import React, { useContext } from "react";
import { actionTypes } from "../../consts/actions";
import { organizationsDefaultState } from "../../helpers/organizations";
import { AppContext } from "../../store/context";
import styles from "./OrganizationCard.module.css";

const OrganizationCard = ({ organization }) => {
  const { dispatch, state } = useContext(AppContext);
  const { id, icon, name } = organization;
  const { selectedOrganization } = state;

  const handleSelectOrganization = () => {
    dispatch({
      type: actionTypes.addSelectedOrganization,
      payload: {
        ...organization,
        accountDetails: { type: id, ...organizationsDefaultState[id] },
      },
    });
  };

  return (
    <div
      onClick={handleSelectOrganization}
      className={`${styles.organizationCard} ${
        selectedOrganization.id === organization.id ? styles.selected : ""
      }`}
    >
      <div className={styles.icon}>{icon}</div>
      <div className={styles.label}>{name}</div>
    </div>
  );
};

export default OrganizationCard;
