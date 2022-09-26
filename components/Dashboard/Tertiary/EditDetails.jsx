import { Button, Input, Typography, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { updateAccountDetails } from "../../../services/firebase.service";
import { AppContext } from "../../../store/context";
import { EditList } from "../../EditList";
import styles from "./EditDetails.module.css";
import { useRouter } from "next/router";

const { Paragraph } = Typography;

export const EditDetails = () => {
  const { query } = useRouter();
  const { organizationId } = query;
  const { state } = useContext(AppContext);
  const [editableName, setEditableName] = useState("");
  const [departmentsTags, setDepartmentsTags] = useState([]);
  const [editableAbout, setEditableAbout] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { organizationDetails } = state;
  const { accountDetails } = organizationDetails;

  const handleAccountDetailsUpdate = async () => {
    const updatedAccountDetails = {
      ...accountDetails,
      name: editableName,
      about: editableAbout,
      departments: departmentsTags,
      email,
      password,
    };
    await updateAccountDetails(organizationId, updatedAccountDetails);
    message.success("Account details updated successfully!");
  };

  const initializeState = (loadedAccountDetails) => {
    const { name, about, email, password, departments } = loadedAccountDetails;

    setEditableAbout(about);
    setEditableName(name);
    setDepartmentsTags(departments);
    setEmail(email);
    setPassword(password);
  };

  useEffect(() => {
    if (accountDetails != null) {
      initializeState(accountDetails);
    }
  }, [accountDetails]);

  return (
    <>
      <Typography.Title level={3} style={{ margin: 20 }} type="secondary">
        Account Details
      </Typography.Title>
      <div className={styles.formItem}>
        <Typography.Title
          editable={{ onChange: setEditableName }}
          level={1}
          style={{ margin: 0 }}
        >
          {editableName}
        </Typography.Title>
      </div>
      <div className={styles.formItem}>
        <Paragraph editable={{ onChange: setEditableAbout }}>
          {editableAbout}
        </Paragraph>
      </div>
      <EditList
        title="Add New Department"
        label="Departments"
        tags={departmentsTags}
        setTags={setDepartmentsTags}
      />
      <div>
        <h2 style={{ padding: "0 20px" }}>Login Details</h2>
        <div className={styles.formItem}>
          <label>Email</label>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.formItem}>
          <label>Password</label>
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.formItem}>
        <Button
          onClick={handleAccountDetailsUpdate}
          type="primary"
          style={{ padding: "0 2rem" }}
        >
          Update account details
        </Button>
      </div>
    </>
  );
};
