import { Space, Table, Tag } from "antd";
import React from "react";
const columns = [
  {
    title: "Profile photo",
    dataIndex: "photo",
    key: "photo",
    // render: (text) => <a>{text}</a>,
  },
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
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
];
const data = [
  {
    key: "1",
    photo: "P",
    name: "John Brown",
    gender: "Male",
    email: "test@example.comg",
    phone: "+23345678986",
  },
  {
    key: "2",
    photo: "P",
    name: "Eva Green",
    gender: "Female",
    email: "test@example.comg",
    phone: "+23345678986",
  },
  {
    key: "3",
    photo: "P",
    name: "Joe Black",
    gender: "Male",
    email: "test@example.comg",
    phone: "+23345678986",
  },
  {
    key: "4",
    photo: "P",
    name: "Joyce Mervn",
    gender: "Female",
    email: "test@example.comg",
    phone: "+23345678986",
  },
  {
    key: "5",
    photo: "P",
    name: "John Brown",
    gender: "Male",
    email: "test@example.comg",
    phone: "+23345678986",
  },
  {
    key: "6",
    photo: "P",
    name: "Eva Green",
    gender: "Female",
    email: "test@example.comg",
    phone: "+23345678986",
  },
  {
    key: "7",
    photo: "P",
    name: "Joe Black",
    gender: "Male",
    email: "test@example.comg",
    phone: "+23345678986",
  },
];

export const Users = () => (
  <div style={{ margin: "1rem" }}>
    <div style={{ margin: "2rem 0" }}>
      <div>
        Total Users: <span style={{ fontWeight: "bold" }}>{data.length}</span>
      </div>
    </div>
    <Table columns={columns} dataSource={data} />;
  </div>
);
