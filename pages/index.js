import { Button, Image, Typography } from "antd";
import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { getAllOrganizations } from "../services/firebase.service";

const { Title } = Typography;

export default function Home() {
  // useEffect(() => {
  //   const fetchOrganizations = async () => {
  //     const organizations = await getAllOrganizations();
  //     console.log(organizations);
  //   };

  //   fetchOrganizations();
  // }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card1}>
          <Image
            src="./Fingerprint-amico.svg"
            alt=""
            height="100%"
            preview={false}
          />
        </div>

        <div className={styles.card2}>
          <p className={styles.description}>
            System that keeps track of user attendance and hours in the form of
            time logs. Get started by configuring a log system for your
            organization
          </p>
          <Link href="/getting-started">
            <Button
              type="default"
              shape="round"
              size="large"
              style={{ padding: "0 100px" }}
            >
              Get Started{" "}
            </Button>
          </Link>
          <br />
          Or <br /> <br />
          <Link href="/login">
            <Button
              type="dashed"
              shape="round"
              size="large"
              style={{ padding: "0 90px", color: "#fff", borderColor: "#fff" }}
              ghost
            >
              Log back in
            </Button>
          </Link>
        </div>
      </div>

      <div style={{ width: "90%", margin: "2rem auto", paddingBottom: "20px" }}>
        <h1>Test Pages</h1>

        <Link href="/admin/login">Admin Login</Link>
        <br />
        <Link href="/log/create">Create new log</Link>
        <br />
        <Link href="/log/123">View Logs</Link>
        <br />
        <Link href="/admin/users">View Users</Link>
        <br />
        <Link href="/user/registration">User Registration</Link>
        <br />
        <Link href="/user/login">User Login</Link>
        <br />
      </div>
    </>
  );
}
