import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const getUsersColumnDefs = () => [
  {
    title: "Profile photo",
    dataIndex: "photo",
    key: "photo",
    render: () => <Avatar size="small" icon={<UserOutlined />} />,
  },
  {
    title: "Name",
    dataIndex: "fullname",
    key: "fullname",
    filters: [],
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
