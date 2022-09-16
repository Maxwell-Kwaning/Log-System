import { Button, message, Steps } from "antd";
import React, { useState } from "react";
import CreateLog from "../../components/CreateLog";
import OrganizationList from "../../components/Organization/OrganizationList";
import OrganizationSetup from "../../components/Organization/Setup/OrganizationSetup";
import styles from "../../styles/GettingStarted.module.css";

const { Step } = Steps;

const steps = [
  {
    title: "Choose Organization",
    content: <OrganizationList />,
  },
  {
    title: "Setup Organization",
    content: <OrganizationSetup organization="tertiary" />,
  },
  {
    title: "Create log",
    content: <CreateLog />,
  },
];

const GettingStarted = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div className={styles.container}>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <div className="getting-started-steps-content">
        <h1 style={{ textTransform: "uppercase", textAlign: "center" }}>
          {steps[current].title}
        </h1>
        {steps[current].content}
      </div>

      <div className="getting-started-steps-action">
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}

        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Create
          </Button>
        )}
      </div>
    </div>
  );
};

export default GettingStarted;
