import { Radio } from "antd";
import React, { useState } from "react";

export const StatusRenderer = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue);
  const onChange = ({ target: { value } }) => {
    setValue(value);
  };

  return (
    <div>
      <Radio.Group
        onChange={onChange}
        defaultValue="inactive"
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
