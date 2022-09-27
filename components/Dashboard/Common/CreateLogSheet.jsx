import React, { Fragment, useState, useEffect } from "react";
import styles from "../../../styles/NewLog.module.css";
import { Button, Input, Result, Typography } from "antd";
import { createNewLogSheet } from "../../../services/firebase.service";
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
      const newLogSheet = {
        ...getLogSheetDetails(uid(), logSheetName),
        organizationId,
      };

      const res = await createNewLogSheet(newLogSheet);
      setDisplayName(newLogSheet.logSheetName);
      setLink(`${newLogSheet.logLink}/${res.id}`);
      setLogSheetName("");
      setIsCreated(true);
    }
  };

  useEffect(() => {
    let timer;
    if (isCreated) {
      setTimeout(() => setIsCreated(false), 20000);
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
        <Result
          status="success"
          title={`${displayName} Created Successfully`}
          subTitle={
            <>
              <Paragraph copyable>{link}</Paragraph>
            </>
          }
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => setIsCreated(false)}
            >
              Create new
            </Button>,
          ]}
        />
      )}
    </Fragment>
  );
};
