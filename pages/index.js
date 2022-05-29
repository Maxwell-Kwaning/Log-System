import { Typography } from "antd";
import React from "react";
import OrganizationCard from "../components/organizationCard/OrganizationCard";
import styles from "../styles/Home.module.css";
import { FaSchool, FaChurch } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import { GiSchoolBag } from "react-icons/gi";
import { IoBusiness } from "react-icons/io5";

const { Title } = Typography;

export default function Home() {
  return (
    <div className={styles.container}>
      <div>
        <Title level={3}>Choose organization to get started</Title>
      </div>
      <div className={styles.organizationCards}>
        <OrganizationCard label="Tertiary" icon={<MdSchool />} />
        <OrganizationCard label="Pre-Tertiary" icon={<FaSchool />} />
        <OrganizationCard label="Basic School" icon={<GiSchoolBag />} />
        <OrganizationCard label="Church" icon={<FaChurch />} />
        <OrganizationCard label="Businness" icon={<IoBusiness />} />
      </div>
    </div>
  );
}
