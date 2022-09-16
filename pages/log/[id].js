import { Space, Table, Tag } from "antd";
import React from "react";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    gender: "Male",
    time: new Date().toISOString(),
  },
  {
    key: "2",
    name: "Eva Green",
    gender: "Female",
    time: new Date().toISOString(),
  },
  {
    key: "3",
    name: "Joe Black",
    gender: "Male",
    time: new Date().toISOString(),
  },
  {
    key: "4",
    name: "Joyce Mervn",
    gender: "Female",
    time: new Date().toISOString(),
  },
];

const Log = () => (
  <div style={{ margin: "1rem" }}>
    <div style={{ margin: "2rem 0" }}>
      <h2>Geography Department Meeting Attendance</h2>
      <div>
        Total Attendance:{" "}
        <span style={{ fontWeight: "bold" }}>{data.length}</span>
      </div>
    </div>
    <Table columns={columns} dataSource={data} />;
  </div>
);

export default Log;
