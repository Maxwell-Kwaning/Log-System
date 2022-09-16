import React from "react";
import { Col, Row, Typography } from "antd";
import OrganizationCard from "./OrganizationCard";
import styles from "./ChooseOrganization.module.css";
import { organizations } from "../../helpers/organizations";

const { Title } = Typography;

const OrganizationList = () => {
  return (
    <div className={styles.container}>
      <div className={styles.organizationCards}>
        <Row
          justify="center"
          gutter={{ xs: 8, sm: 8, md: 10, lg: 16 }}
          style={{ width: "100%" }}
        >
          {organizations.map((organization) => (
            <Col
              key={organization.id}
              className="gutter-row"
              xs={12}
              sm={8}
              md={6}
              lg={4}
            >
              <OrganizationCard
                label={organization.name}
                icon={organization.icon}
                href={organization.href}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default OrganizationList;
