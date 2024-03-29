import React, { useState, useContext, useEffect } from "react";
import { Button, message, Steps } from "antd";
import { useRouter } from "next/router";
import { AppContext } from "../../store/context";
import styles from "../../styles/GettingStarted.module.css";
import { getSteps } from "../../helpers/organizations";
import { enabledOrganizations } from "../../consts/consts";
import { v4 as uid } from "uuid";
import { getAccountDetails, getLogSheetDetails } from "../../helpers";
import {
  addOrganization,
  createNewLogSheet,
} from "../../services/firebase.service";
import { actionTypes } from "../../consts/actions";

const { Step } = Steps;

const GettingStarted = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(AppContext);
  const [current, setCurrent] = useState(0);

  const { selectedOrganization, isOrganizationSetupValid } = state;
  const { id, accountDetails } = selectedOrganization;
  const steps = getSteps(id);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  // feature flag
  const isNextEnabled = (currentStep) => {
    switch (currentStep.name) {
      case "select":
        return enabledOrganizations.includes(id);
      case "setup":
        return isOrganizationSetupValid;
      default:
        return false;
    }
  };

  const onFinishSetup = async () => {
    const logId = uid();

    const { logSheetName } = state;
    const newAccountDetails = getAccountDetails(accountDetails);
    const newLogSheet = getLogSheetDetails(logId, logSheetName);
    const newOrganization = {
      accountDetails: newAccountDetails,
    };

    addOrganization(newOrganization)
      .then((res) => {
        router.push(`/dashboard/${res.id}`);
        message.success("Organization created successfully!");
        dispatch({ type: actionTypes.resetSelectedOrganization });
        createLog(res.id, logSheetName, newLogSheet);
      })
      .catch(() =>
        message.error(
          "Something went wrong! Could not create organization. Try again later"
        )
      );
  };

  const createLog = async (organizationId, logSheetName, newLogSheet) => {
    if (logSheetName.trim() !== "") {
      await createNewLogSheet({ ...newLogSheet, organizationId });
      dispatch({ type: actionTypes.setLogSheetName, payload: "" });
    }
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
          <Button
            type="primary"
            onClick={() => next()}
            disabled={!isNextEnabled(steps[current])}
          >
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={onFinishSetup}>
            Finish
          </Button>
        )}
      </div>
    </div>
  );
};

export default GettingStarted;
