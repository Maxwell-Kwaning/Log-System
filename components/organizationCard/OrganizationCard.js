import React from "react";
import styles from "./organizationCard.module.css";

// tertiary
// pre-tertiary
// basic
// church
// business

const OrganizationCard = ({ label, icon, action }) => {
  return (
    <div className={styles.organizationCard} onClick={action}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default OrganizationCard;
