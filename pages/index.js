import { Col, Row, Typography } from "antd";
import React from "react";
import styles from "../styles/Home.module.css";

const { Title } = Typography;

export default function Home() {
  return (
    <div className={styles.container}>
      <div>
        <Title>Home Page</Title>
      </div>
    </div>
  );
}
