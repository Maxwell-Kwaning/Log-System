import React, { Fragment, useState, useEffect } from "react";
import styles from "../../../styles/NewLog.module.css";
import { Button, Input, Typography } from "antd";
import { addNewLogSheet } from "../../../services/firebase.service";
import { useRouter } from "next/router";
import { getLogSheetDetails } from "../../../helpers";
import { v4 as uid } from "uuid";

const { Paragraph } = Typography;

export const NewLogSheet = () => {
  const { query } = useRouter();
  const { organizationId } = query;
  const [logSheetName, setLogSheetName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [link, setLink] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  const handleCreateNewLogSheet = async () => {
    if (logSheetName.trim() !== "") {
      const newLogSheet = getLogSheetDetails(uid(), logSheetName);

      await addNewLogSheet(organizationId, newLogSheet);
      setDisplayName(newLogSheet.logSheetName);
      setLink(newLogSheet.logLink);
      setLogSheetName("");
      setIsCreated(true);
    }
  };

  useEffect(() => {
    let timer;
    if (isCreated) {
      setTimeout(() => setIsCreated(false), 10000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isCreated]);

  return (
    <Fragment>
      {!isCreated && (
        <div className={styles.container}>
          <h1 className={styles.title}>Create a new log</h1>
          <label>Log sheet name</label>
          <Input
            placeholder="e.g staff meeting, math 101 lecture"
            value={logSheetName}
            onChange={(e) => setLogSheetName(e.target.value)}
          />
          <Button
            type="primary"
            size="large"
            style={{ marginTop: "20px", padding: "0 100px" }}
            onClick={handleCreateNewLogSheet}
          >
            Create
          </Button>
        </div>
      )}

      {isCreated && (
        <div className={styles.container}>
          <h3 className={styles.title} style={{ color: "green" }}>
            Log Created Successfully
          </h3>

          <div>
            <div>Log sheet name: </div>
            <h2>{displayName}</h2>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <div>Login link: </div>
            <Paragraph copyable>{link}</Paragraph>
          </div>
        </div>
      )}
    </Fragment>
  );
};
