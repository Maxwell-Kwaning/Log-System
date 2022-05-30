import { Col, Row, Typography } from "antd";
import React from "react";
import styles from "../../styles/ChooseOrganization.module.css";
import OrganizationCard from "../../components/organizationCard/OrganizationCard";
import { FaSchool, FaChurch } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import { GiSchoolBag } from "react-icons/gi";
import { IoBusiness } from "react-icons/io5";

const { Title } = Typography;

export default function Organization() {
  return (
    <div className={styles.container}>
      <div>
        <Title
          level={4}
          style={{
            textAlign: "center",
            marginTop: "50px",
            marginBottom: "30px",
          }}
        >
          CHOOSE YOUR ORGANIZATION TO GET STARTED
        </Title>
      </div>
      
      <div className={styles.organizationCards}>
        <Row
          justify="center"
          gutter={{ xs: 8, sm: 8, md: 10, lg: 16 }}
          style={{ width: "100%" }}
        >
          <Col className="gutter-row" xs={12} sm={8} md={6} lg={4}>
            <OrganizationCard
              label="Tertiary"
              icon={<MdSchool color="#4b65fb" />}
            />
          </Col>
          <Col className="gutter-row" xs={12} sm={8} md={6} lg={4}>
            <OrganizationCard
              label="Pre-Tertiary"
              icon={<FaSchool color="#68bb44" />}
            />
          </Col>
          <Col className="gutter-row" xs={12} sm={8} md={6} lg={4}>
            <OrganizationCard
              label="Basic School"
              icon={<GiSchoolBag color="#ee2761" />}
            />
          </Col>
          <Col className="gutter-row" xs={12} sm={8} md={6} lg={4}>
            <OrganizationCard
              label="Church"
              icon={<FaChurch color="#6c75a7" />}
            />
          </Col>
          <Col className="gutter-row" xs={12} sm={8} md={6} lg={4}>
            <OrganizationCard
              label="Business"
              icon={<IoBusiness color="#ec7624" />}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}
