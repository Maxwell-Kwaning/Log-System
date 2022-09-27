import { Radio } from "antd";
import React, { useState } from "react";
import { updateLogStatus } from "../../services/firebase.service";

export const StatusRenderer = ({ initialValue, record }) => {
  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = async ({ target: { value } }) => {
    setIsLoading(true);
    await updateLogStatus(record.documentId, value);
    setValue(value);
    setIsLoading(false);
  };

  return (
    <div>
      <Radio.Group
        onChange={onChange}
        defaultValue={initialValue}
        size="small"
        buttonStyle="solid"
      >
        <Radio.Button value="active">Active</Radio.Button>
        <Radio.Button
          value="inactive"
          className={value === "inactive" ? "btn-status-inactive" : ""}
        >
          Inactive
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};
