import React from "react";
import styles from "../../styles/OrganizationCard.module.css";
import Link from "next/link";

const OrganizationCard = ({ label, icon, action, href }) => {
  return (
    <Link href={href}>
      <div className={styles.organizationCard} onClick={action}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.label}>{label}</div>
      </div>
    </Link>
  );
};

export default OrganizationCard;
