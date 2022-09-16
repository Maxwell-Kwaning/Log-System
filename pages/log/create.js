import React, { Fragment, useState } from "react";
import styles from "../../styles/NewLog.module.css";
import { Button, Input, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import CreateLog from "../../components/CreateLog";

const NewLog = () => {
  const [isCreated, setIsCreated] = useState(false);

  return (
    <Fragment>
      {!isCreated && (
        <div className={styles.container}>
          <h1 className={styles.title}>Create a new log</h1>
          <CreateLog />
          <Button
            type="primary"
            size="large"
            style={{ marginTop: "20px", padding: "0 100px" }}
            onClick={() => setIsCreated(true)}
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
            <div>Log Name: </div>
            <h2>Lecture attendance</h2>
          </div>

          <div>
            <div>ID: </div>
            <h2>28be2daf-9af7-4768-8222-2d815f59e101</h2>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <div>Viewer Link: </div>
            <Input.Group compact>
              <Input
                style={{ width: "calc(100% - 50px)" }}
                defaultValue="https://log-system/log/28be2daf-9af7-4768-8222-2d815f59e101"
              />
              <Tooltip title="copy viewer link">
                <Button icon={<CopyOutlined />} />
              </Tooltip>
            </Input.Group>
            <a href="#">
              https://log-system/log/28be2daf-9af7-4768-8222-2d815f59e101
            </a>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <div>User login link: </div>
            <Input.Group compact>
              <Input
                style={{ width: "calc(100% - 50px)" }}
                defaultValue="https://log-system/user/login/28be2daf-9af7-4768-8222-2d815f59e101"
              />
              <Tooltip title="copy login link">
                <Button icon={<CopyOutlined />} />
              </Tooltip>
            </Input.Group>
            <a href="#">
              https://log-system/user/login/28be2daf-9af7-4768-8222-2d815f59e101
            </a>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default NewLog;
