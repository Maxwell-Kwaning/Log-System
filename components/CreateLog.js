import React from "react";
import { Input } from "antd";

const CreateLog = () => {
  return (
    <div>
      <div style={{ marginBottom: "10px" }}>Log Name</div>
      <Input defaultValue="Lecture attendance" placeholder="enter log name" />
    </div>
  );
};

export default CreateLog;
