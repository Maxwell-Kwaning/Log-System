import React from "react";
import { Typography } from "antd";
import Link from "next/link";

const { Title } = Typography;

const Header = () => {
  return (
    <div className="page-header-container">
      <Link href="/" passHref>
        <Title level={2} className="app-title">
          Log System
        </Title>
      </Link>
    </div>
  );
};

export default Header;
