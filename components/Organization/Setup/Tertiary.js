import { Input } from "antd";
import React from "react";
import { AddList } from "../../AddList";
import styles from "./OrganizationSetup.module.css";

const { TextArea } = Input;

const Tertiary = () => {
  return (
    <div>
      <div className={styles.formItem}>
        <label>Organization name</label>
        <Input placeholder="Organization name" />
      </div>
      <div className={styles.formItem}>
        <label>Description</label>
        <TextArea
          rows={4}
          placeholder="tell us a bit more about your organization"
          maxLength={200}
        />
      </div>

      <AddList />

      <div>
        <h2 style={{ padding: "0 20px" }}>Login Details</h2>
        <div className={styles.formItem}>
          <label>Email</label>
          <Input type="email" placeholder="Email" />
        </div>
        <div className={styles.formItem}>
          <label>Password</label>
          <Input.Password placeholder="Password" />
        </div>
        <div className={styles.formItem}>
          <label>Confirm Password</label>
          <Input.Password placeholder="Confirm Password" />
        </div>
      </div>
    </div>
  );
};

export default Tertiary;
