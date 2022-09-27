import { StatusRenderer } from "../../../Renderers/StatusRenderer";
import { Avatar, Button, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Paragraph, Text } = Typography;

export const getLogsColumnDefs = (viewLog) => [
  {
    title: "Log Sheet Name",
    dataIndex: "logSheetName",
    key: "logSheetName",
    render: (text, record) => <a onClick={() => viewLog(record)}>{text}</a>,
  },
  {
    title: "Log Link",
    dataIndex: "logLink",
    key: "logLink",
    render: (link) => <Paragraph copyable>{link}</Paragraph>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status, record) => (
      <StatusRenderer initialValue={status} record={record} />
    ),
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (timestamp) => {
      const date = timestamp.toDate();
      return (
        <Text>
          {date.toLocaleDateString()} {date.getHours()}:{date.getMinutes()}:
          {date.getSeconds()}
        </Text>
      );
    },
    sorter: (a, b) => a.createdAt - b.createdAt,
  },
];

export const getLoggedUsersColumnDefs = () => [
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
];
